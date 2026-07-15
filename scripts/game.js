// Game engine: run lifecycle, question flow, scoring, leveling, persistence.
// Items and events plug in via the ITEMS / EVENTS registries.
const Game = (() => {
    "use strict";

    const STORAGE_KEY = "nutrivia_rogue_v1";

    const qByNumber = {};
    QUESTION_BANK.forEach((q) => (qByNumber[q.number] = q));

    /* ---------------- state ---------------- */

    function freshMeta() {
        return {
            gold: 0,
            foods: [], // collected food image names
            seen: [], // question numbers ever answered
            missed: [], // question numbers currently owed a redemption
            runs: 0,
            best: { level: 0, correct: 0 },
            hintsSeen: {}, // one-time coach hints already shown
            sr: {}, // spaced repetition: number -> {itv, due}
            totalAnswered: 0, // global clock the sr intervals count against
            selectedSets: QUESTION_SETS.map((s) => s.id), // pool choices
            stock: {}, // items bought in the shop, added to the next run
        };
    }

    // meta persists across runs (the "lite" in roguelite)
    let meta = freshMeta();

    // show a coach hint exactly once, ever
    function hint(id, text) {
        if (meta.hintsSeen[id]) return;
        meta.hintsSeen[id] = true;
        save();
        UI.toast(text);
    }

    let run = null;

    function newRun() {
        return {
            active: true,
            hp: CONFIG.maxHp,
            maxHp: CONFIG.maxHp, // can grow mid-run via the Bigger Appetite reward
            level: 1,
            xp: 0,
            streak: 0,
            gold: 0,
            answered: 0,
            correct: 0,
            missed: 0,
            asked: [], // question numbers asked this run
            // start with the freebies plus anything bought in the shop
            items: Object.assign({}, CONFIG.startingItems, meta.stock),
            buffs: {},
            event: null, // active modifier {id, remaining}
            eventCard: null, // pending event card awaiting a choice
            sinceEvent: 0,
            startedAt: Date.now(), // run stopwatch
            q: null, // current question snapshot
            qStart: 0, // when the current question was served (speed bonus)
            answeredCurrent: false,
            lowHpWarned: false,
            deathSaveUsed: false,
            bestStreak: 0,
            setIds: [], // question sets locked in for this run
        };
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ meta, run }));
    }

    function load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            if (data.meta) meta = Object.assign(freshMeta(), data.meta);
            run = data.run || null;
            if (run && run.maxHp == null) run.maxHp = CONFIG.maxHp; // older saves
        } catch (e) {
            console.warn("Bad save, starting fresh", e);
        }
    }

    /* ---------------- utils ---------------- */

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffled(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = randInt(0, i);
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function pickFrom(pool) {
        if (!pool.length) return null;
        return pool[randInt(0, pool.length - 1)];
    }

    /* ---------------- question pools ---------------- */

    // the bank restricted to the sets picked for this run
    let activePool = QUESTION_BANK;

    function rebuildActivePool() {
        const ids = run && run.setIds && run.setIds.length ? run.setIds : null;
        if (!ids) {
            activePool = QUESTION_BANK;
            return;
        }
        const sel = QUESTION_SETS.filter((s) => ids.includes(s.id));
        activePool = sel.length
            ? QUESTION_BANK.filter((q) =>
                  sel.some((s) => s.match(+q.number))
              )
            : QUESTION_BANK;
    }

    function notCurrent(q) {
        return !run.q || q.number !== run.q.number;
    }

    function missedPool() {
        const active = new Set(activePool.map((q) => q.number));
        return meta.missed
            .map((n) => qByNumber[n])
            .filter(Boolean)
            .filter((q) => active.has(q.number))
            .filter(notCurrent);
    }

    function seenPool() {
        const active = new Set(activePool.map((q) => q.number));
        return meta.seen
            .map((n) => qByNumber[n])
            .filter(Boolean)
            .filter((q) => active.has(q.number))
            .filter(notCurrent);
    }

    /* ---------------- spaced repetition ----------------
       Every question carries {itv, due} counted in total questions
       answered (the global clock). Correct answers push it further
       out each time (itv * ease); a miss pulls it back close. The
       picker serves due reviews sometimes, fresh questions otherwise,
       so mastered material fades and shaky material keeps returning. */

    function updateSR(number, correct) {
        meta.totalAnswered++;
        const e = meta.sr[number] || { itv: 0, due: 0 };
        e.itv = correct
            ? e.itv
                ? Math.round(e.itv * CONFIG.srEase)
                : CONFIG.srFirstInterval
            : CONFIG.srWrongInterval;
        e.due = meta.totalAnswered + e.itv;
        meta.sr[number] = e;
    }

    function duePool() {
        // reviews may repeat within a run — that's the point — but not
        // so soon that the answer is still in short-term memory
        const recent = new Set(run.asked.slice(-8));
        return activePool
            .filter((q) => {
                const e = meta.sr[q.number];
                return (
                    e && e.due <= meta.totalAnswered && !recent.has(q.number)
                );
            })
            .sort((a, b) => meta.sr[a.number].due - meta.sr[b.number].due);
    }

    function pickNextQuestion() {
        const asked = new Set(run.asked);
        const seen = new Set(meta.seen);
        const due = duePool();
        const fresh = activePool.filter(
            (q) => !seen.has(q.number) && !asked.has(q.number)
        );

        // serve a due review sometimes — always if nothing fresh is left
        if (due.length && (!fresh.length || Math.random() < CONFIG.reviewChance)) {
            return due[randInt(0, Math.min(due.length, 5) - 1)]; // most overdue few
        }
        if (fresh.length) return pickFrom(fresh);

        // everything seen, nothing due: whatever comes due soonest
        const rest = activePool.filter((q) => !asked.has(q.number));
        if (rest.length) {
            return rest.sort(
                (a, b) =>
                    (meta.sr[a.number] ? meta.sr[a.number].due : 0) -
                    (meta.sr[b.number] ? meta.sr[b.number].due : 0)
            )[0];
        }

        run.asked = []; // full sweep of the pool — start over
        return pickFrom(activePool);
    }

    /* ---------------- events ---------------- */

    // rolling an event now deals an EVENT CARD: the run pauses on a
    // story card whose choices decide what actually happens
    function rollEventCard() {
        const eligible = Object.keys(EVENTS).filter((id) =>
            EVENTS[id].eligible(gameApi)
        );
        if (!eligible.length) return;
        run.eventCard = eligible[randInt(0, eligible.length - 1)];
        hint(
            "events",
            "⚡ An event! Read the card and pick — different choices, different rewards."
        );
    }

    function serveEventCard() {
        run.q = null;
        run.answeredCurrent = false;
        disarmItem();
        save();
        UI.renderEventCard(run, EVENTS[run.eventCard]);
        UI.renderEventBanner(run);
        renderItemBar();
        UI.renderBuffs(run);
    }

    function handleEventChoice(slotIndex) {
        const def = EVENTS[run.eventCard];
        const choice = def.choices[slotIndex];
        if (!choice) return;
        run.eventCard = null;
        run.answeredCurrent = true;
        const result = choice.outcome(gameApi);
        UI.resolveEventCard(slotIndex, result);
        UI.renderEventBanner(run);
        refreshHUD();
        renderItemBar();
        save();
        checkLevelUp(); // an XP outcome can level you up
    }

    /* ---------------- question flow ---------------- */

    function nextQuestion() {
        if (run.hp <= 0) {
            endRun(false);
            return;
        }
        if (run.event && run.event.remaining <= 0) {
            run.event = null;
        }
        if (!run.event && !run.eventCard) {
            run.sinceEvent++;
            const guaranteed = run.sinceEvent >= CONFIG.eventEvery;
            const surprise =
                run.sinceEvent >= CONFIG.eventMinGap &&
                Math.random() < CONFIG.eventRandomChance;
            if (guaranteed || surprise) {
                run.sinceEvent = 0;
                rollEventCard();
            }
        }
        if (run.eventCard) {
            serveEventCard();
            return;
        }

        const ev = run.event ? EVENTS[run.event.id] : null;
        let source = null;
        if (ev && ev.pickQuestion) source = ev.pickQuestion(gameApi);
        if (!source) source = pickNextQuestion();

        let choices = source.answers.map((a) => ({
            option: a.option,
            text: a.text,
            isCorrect: a.option === source.correct_answer,
        }));
        // shuffle the answer order every time so the correct choice lands in a
        // different slot on repeats — no memorising "it was C"
        choices = shuffled(choices);
        if (ev && ev.modifyChoices) {
            choices = ev.modifyChoices(gameApi, source, choices);
        }

        // Assign the displayed letter by final position so answers always
        // read a, b, c, d top-to-bottom — and track which letter now holds
        // the correct text. This is what lets a shuffle actually move the
        // answer, and keeps Coin Flip / Lucky Day from showing gaps like a, c.
        const LETTERS = ["a", "b", "c", "d"];
        let correct = source.correct_answer;
        choices.forEach((c, i) => {
            c.option = LETTERS[i];
            if (c.isCorrect) correct = c.option;
        });

        run.q = {
            number: source.number,
            text: source.question,
            choices: choices,
            correct: correct,
            eliminated: [],
        };
        run.answeredCurrent = false;
        run.qStart = Date.now();
        disarmItem();
        run.asked.push(source.number); // chronological — tail = most recent
        if (run.event) run.event.remaining--;

        save();
        UI.renderQuestion(run);
        UI.renderEventBanner(run);
        renderItemBar();
        UI.renderBuffs(run);

        // wait until question 2 so this doesn't collide with the
        // run-basics hint shown at the start of the first run
        if (
            run.answered >= 1 &&
            Object.values(run.items).some((n) => n > 0)
        ) {
            hint(
                "items",
                "🎒 You have an item, bottom left! Tap it once to see what it does, tap again to use it."
            );
        }
    }

    /* ---------------- answering ---------------- */

    function markSeen(number) {
        if (!meta.seen.includes(number)) meta.seen.push(number);
    }

    function answer(slotIndex, clickEvent) {
        if (!run || !run.active || run.answeredCurrent) return;
        if (run.eventCard) {
            handleEventChoice(slotIndex);
            return;
        }
        if (!run.q) return;
        const choice = run.q.choices[slotIndex];
        if (!choice || run.q.eliminated.includes(choice.option)) return;

        if (choice.option === run.q.correct) {
            onCorrect(clickEvent);
        } else {
            onWrong(choice.option, clickEvent);
        }
    }

    function onCorrect(clickEvent) {
        run.streak++;
        // Chili Pepper: this correct answer builds double streak
        const chili = !!run.buffs.double_streak;
        if (chili) {
            delete run.buffs.double_streak;
            run.streak++;
        }
        run.bestStreak = Math.max(run.bestStreak || 0, run.streak);
        let xpGain =
            CONFIG.xpBase + Math.min(run.streak - 1, CONFIG.xpStreakBonusCap);
        let goldGain =
            CONFIG.goldBase + Math.min(run.streak - 1, CONFIG.goldStreakBonusCap);

        // answered fast? bonus XP (a Snowflake freezes the clock at 0s)
        const seconds = (Date.now() - run.qStart) / 1000;
        let speed = CONFIG.speedBonus(seconds);
        if (run.buffs.auto_fast) {
            delete run.buffs.auto_fast;
            speed = Object.assign({}, CONFIG.speedBonus(0), {
                label: "❄️ FROZEN FAST!",
            });
        }
        if (speed) xpGain += speed.xp;

        // Star Bite: next correct answer is worth double XP
        const doubled = !!run.buffs.double_xp;
        if (doubled) {
            delete run.buffs.double_xp;
            xpGain *= 2;
        }

        // event reward hook (Gold Rush, Brain Wave, ...)
        const ev = run.event ? EVENTS[run.event.id] : null;
        if (ev && ev.modifyRewards) {
            const r = ev.modifyRewards(gameApi, { xp: xpGain, gold: goldGain });
            xpGain = r.xp;
            goldGain = r.gold;
        }
        // event per-correct hook (Tea Break heals, ...)
        if (ev && ev.onCorrect) ev.onCorrect(gameApi);

        run.xp += xpGain;
        run.gold += goldGain;
        run.correct++;
        updateSR(run.q.number, true);
        finishQuestion(run.q.correct);

        // a correct answer clears the redemption debt
        meta.missed = meta.missed.filter((n) => n !== run.q.number);

        UI.fireworks(clickEvent.pageX, clickEvent.pageY, [
            "#8fac72",
            "#e5a83e",
            "#6f8fba",
        ]);
        UI.floatDelta(UI.$("#xp-fill").parentElement, "+" + xpGain + " XP", "#6f8fba");
        UI.floatDelta(UI.$("#hud-gold"), "+" + goldGain, "#a87e2f");
        if (speed) {
            setTimeout(
                () =>
                    UI.floatDelta(
                        UI.$("#question-card"),
                        speed.label + " +" + speed.xp + " XP",
                        "#a37bb8"
                    ),
                180
            );
        }
        if (doubled) {
            setTimeout(
                () =>
                    UI.floatDelta(
                        UI.$("#xp-fill").parentElement,
                        "⭐ DOUBLE XP!",
                        "#e5a83e"
                    ),
                360
            );
        }
        if (chili) {
            setTimeout(
                () =>
                    UI.floatDelta(
                        UI.$("#hud-streak"),
                        "🌶️ +2 STREAK!",
                        "#d95c4c"
                    ),
                270
            );
        }
        UI.renderBuffs(run);
        UI.popChip("#hud-streak");
        UI.popChip("#hud-gold");
        UI.reactFace(run.streak >= 5 ? "🤩" : "😋");

        // streak milestones get extra fanfare
        if (run.streak === 5 || run.streak === 10) {
            UI.floatDelta(
                UI.$("#hud-streak"),
                run.streak === 5 ? "🔥 ON FIRE!" : "🔥🔥 UNSTOPPABLE!",
                "#d95c4c"
            );
            const rect = UI.$("#hud-streak").getBoundingClientRect();
            UI.fireworks(
                rect.left + rect.width / 2 + window.scrollX,
                rect.top + rect.height / 2 + window.scrollY,
                ["#d95c4c", "#e5a83e"]
            );
        }

        refreshHUD();
        save();
        checkLevelUp();
    }

    function onWrong(pickedOption, clickEvent) {
        // Second Chance: the miss only removes that answer — pick again
        if (run.buffs.second_chance) {
            delete run.buffs.second_chance;
            run.q.eliminated.push(pickedOption);
            UI.markEliminated(run, [pickedOption]);
            UI.renderBuffs(run);
            UI.floatDelta(UI.$("#question-card"), "🔁 second chance!", "#a37bb8");
            save();
            return;
        }

        finishQuestion(pickedOption);
        run.missed++;
        updateSR(run.q.number, false);
        if (!meta.missed.includes(run.q.number)) meta.missed.push(run.q.number);

        if (run.buffs.streak_protector) {
            delete run.buffs.streak_protector;
            UI.renderBuffs(run);
            UI.floatDelta(UI.$("#question-card"), "🛡️ protected!", "#6f8fba");
            UI.reactFace("😅");
        } else {
            run.streak = 0;
            let hpLoss = CONFIG.hpLossOnMiss;
            let xpLoss = CONFIG.xpLossOnMiss;
            // event penalty hook (Sudden Death, ...)
            const ev = run.event ? EVENTS[run.event.id] : null;
            if (ev && ev.modifyPenalty) {
                const p = ev.modifyPenalty(gameApi, { hp: hpLoss, xp: xpLoss });
                hpLoss = p.hp;
                xpLoss = p.xp;
            }
            run.hp -= hpLoss;
            run.xp = Math.max(0, run.xp - xpLoss);
            UI.floatDelta(
                UI.$("#hp-fill").parentElement,
                "-" + hpLoss + " HP",
                "#c04a3b"
            );
            UI.floatDelta(
                UI.$("#xp-fill").parentElement,
                "-" + xpLoss + " XP",
                "#c04a3b"
            );
            UI.replayAnim(UI.$("#question-card"), "shake");
            UI.flash("dmg");
            UI.reactFace("😖");
            hint(
                "first_miss",
                "Ouch, −5 ❤️! Missed questions come back around later — get them right to clear them."
            );
        }

        refreshHUD();
        save();

        if (run.hp > 0 && run.hp <= CONFIG.hpLossOnMiss && !run.lowHpWarned) {
            run.lowHpWarned = true;
            UI.toast("😰 Careful — one more miss ends the run!");
        }

        if (run.hp <= 0) {
            if (!run.deathSaveUsed) {
                // once per run, the clay refuses to crumble: come back
                // with a little HP and a surprise powerup
                run.deathSaveUsed = true;
                run.hp = CONFIG.deathSaveHp;
                const giftId = pickFrom(Object.keys(ITEMS));
                run.items[giftId] = (run.items[giftId] || 0) + 1;
                save();
                setTimeout(() => {
                    const gift = ITEMS[giftId];
                    UI.showSaved(
                        "You're re-kneaded back to " +
                            CONFIG.deathSaveHp +
                            " HP — and you found a " +
                            gift.icon +
                            " " +
                            gift.name +
                            " in the wreckage! (" +
                            gift.desc +
                            ")",
                        () => {
                            refreshHUD();
                            renderItemBar();
                        }
                    );
                    UI.reactFace("😇", 2500);
                    refreshHUD();
                }, 800);
            } else {
                // dead for real — no next question, a beat to see the reveal
                UI.showNext(false);
                setTimeout(() => endRun(false), 1100);
            }
        }
    }

    function finishQuestion(pickedOption) {
        run.answeredCurrent = true;
        run.answered++;
        markSeen(run.q.number);
        disarmItem();
        UI.revealAnswer(run, pickedOption);
        renderItemBar();
    }

    function refreshHUD() {
        UI.renderHUD(run, CONFIG.xpForLevel(run.level));
    }

    /* ---------------- leveling & rewards ---------------- */

    function checkLevelUp() {
        const needed = CONFIG.xpForLevel(run.level);
        if (run.xp < needed) return;
        run.xp -= needed;
        run.level++;
        refreshHUD();
        UI.flash("level");
        UI.reactFace("🥳");
        save();

        const cards = rollRewardCards();
        UI.showLevelUp(run.level, cards, (i) => {
            cards[i].apply();
            refreshHUD();
            renderItemBar();
            save();
            // every level up also discovers a food for the collection
            grantFood(() => checkLevelUp()); // then: banked another level?
        });
    }

    function rollRewardCards() {
        const itemCard = (id) => ({
            icon: ITEMS[id].icon,
            name: ITEMS[id].name,
            desc: ITEMS[id].desc,
            kind: "item", // flagged so the level-up UI can badge it
            apply: () => {
                run.items[id] = (run.items[id] || 0) + 1;
            },
        });
        // one random support reward — each is distinct from the others
        const support = [
            {
                icon: "❤️",
                name: "Patch Up",
                desc: "Smooth " + CONFIG.healAmount + " HP back on",
                apply: () => {
                    run.hp = Math.min(run.maxHp, run.hp + CONFIG.healAmount);
                },
            },
            {
                icon: "🍽️",
                name: "Bigger Appetite",
                desc: "+" + CONFIG.maxHpUp + " max HP, healed to full",
                apply: () => {
                    run.maxHp += CONFIG.maxHpUp;
                    run.hp = run.maxHp;
                },
            },
            {
                icon: "💰",
                name: "Gold Chunk",
                desc: "+" + CONFIG.goldRewardAmount + " gold, right now",
                apply: () => {
                    run.gold += CONFIG.goldRewardAmount;
                },
            },
        ];
        // two distinct item choices + one random support card, so every level
        // up shows item options plus something else useful
        const itemIds = shuffled(Object.keys(ITEMS));
        return shuffled([
            itemCard(itemIds[0]),
            itemCard(itemIds[1]),
            shuffled(support)[0],
        ]);
    }

    function grantFood(after) {
        const uncollected = foods.filter((f) => !meta.foods.includes(f.name));
        const isNew = uncollected.length > 0; // false only once every food is owned
        const pool = isNew ? uncollected : foods;
        const food = pool[randInt(0, pool.length - 1)];
        if (isNew) meta.foods.push(food.name);
        save();
        UI.showFood(food, after, isNew);
    }

    /* ---------------- items ---------------- */

    function canUseItem(id) {
        if (run.answeredCurrent || run.eventCard || !run.q) return false;
        const item = ITEMS[id];
        if (!item) return false;
        return item.canUse ? item.canUse(gameApi) : true;
    }

    // Items take two taps: the first explains what the item does,
    // the second (on the same item) actually uses it.
    let armedItem = null;

    function disarmItem() {
        if (!armedItem) return;
        armedItem = null;
        UI.hideItemHint();
    }

    function useItem(id, btnEl) {
        if (!canUseItem(id)) {
            UI.replayAnim(btnEl, "shake");
            return;
        }
        const item = ITEMS[id];

        if (armedItem !== id) {
            armedItem = id;
            UI.showItemHint(item);
            renderItemBar();
            return;
        }

        disarmItem();
        run.items[id]--;
        if (item.kind === "instant") {
            item.use(gameApi);
        } else if (item.kind === "buff") {
            run.buffs[item.buff] = true;
            if (item.activeText) UI.toast(item.activeText);
        }
        UI.renderBuffs(run);
        renderItemBar();
        save();
        checkLevelUp(); // a Honey Jar can push you over the line
    }

    function renderItemBar() {
        UI.renderItems(run, canUseItem, useItem, armedItem);
    }

    // helpers exposed to item/event registries
    function visibleWrongOptions() {
        return run.q.choices
            .filter(
                (c) =>
                    c.option !== run.q.correct &&
                    !run.q.eliminated.includes(c.option)
            )
            .map((c) => c.option);
    }

    function eliminateOptions(options) {
        run.q.eliminated.push(...options);
        UI.markEliminated(run, options);
        renderItemBar();
        save();
    }

    /* ---------------- run lifecycle ---------------- */

    function showSetsScreen() {
        if (!meta.selectedSets) meta.selectedSets = QUESTION_SETS.map((s) => s.id);
        UI.renderSets(meta.selectedSets, toggleSet);
        UI.showScreen("screen-sets");
    }

    function toggleSet(id) {
        const i = meta.selectedSets.indexOf(id);
        if (i >= 0) meta.selectedSets.splice(i, 1);
        else meta.selectedSets.push(id);
        save();
        UI.renderSets(meta.selectedSets, toggleSet);
    }

    function beginRun() {
        if (!meta.selectedSets || !meta.selectedSets.length) {
            UI.replayAnim(UI.$("#btn-run-go"), "shake");
            UI.toast("🍲 The pot is empty — pick at least one set first!");
            return;
        }
        run = newRun();
        meta.stock = {}; // purchased items are now in the run
        run.setIds = meta.selectedSets.slice();
        rebuildActivePool();
        UI.showScreen("screen-run");
        refreshHUD();
        nextQuestion();
        hint(
            "run_basics",
            "🧠 Answer to earn 💙 XP and 💰 gold. Wrong answers cost 5 ❤️ — at zero, the run ends!"
        );
    }

    function endRun(fled) {
        if (!run || !run.active) return;
        run.active = false;
        meta.gold += run.gold;
        meta.runs++;
        if (
            run.level > meta.best.level ||
            (run.level === meta.best.level && run.correct > meta.best.correct)
        ) {
            meta.best = { level: run.level, correct: run.correct };
        }
        run.duration = Date.now() - (run.startedAt || Date.now());
        UI.renderSummary(run, fled);
        save();
        UI.showScreen("screen-summary");
    }

    function goHome() {
        UI.renderHome(meta, foods.length);
        UI.showScreen("screen-home");
    }

    /* ---------------- shop ---------------- */

    function openShop() {
        UI.renderShop(meta, buyItem);
        UI.showScreen("screen-shop");
    }

    function buyItem(id, btnEl) {
        const item = ITEMS[id];
        if (!item || item.noShop) return;
        if (meta.gold < item.cost) {
            UI.replayAnim(btnEl, "shake");
            UI.toast("💰 Not enough gold for that yet — go win a run!");
            return;
        }
        meta.gold -= item.cost;
        meta.stock[id] = (meta.stock[id] || 0) + 1;
        save();
        UI.onItemBought(btnEl, item);
        UI.renderShop(meta, buyItem);
    }

    function resetProgress() {
        if (
            !confirm(
                "Reset ALL progress? Gold, collection, best run, and question history will be wiped."
            )
        )
            return;
        localStorage.removeItem(STORAGE_KEY);
        meta = freshMeta();
        run = null;
        goHome();
    }

    // surface passed into ITEMS / EVENTS hooks
    const gameApi = {
        get run() {
            return run;
        },
        get meta() {
            return meta;
        },
        shuffled,
        pickFrom,
        missedPool,
        seenPool,
        visibleWrongOptions,
        eliminateOptions,
        heal(n) {
            const before = run.hp;
            run.hp = Math.min(run.maxHp, run.hp + n);
            UI.floatDelta(
                UI.$("#hp-fill").parentElement,
                "+" + (run.hp - before) + " HP",
                "#7a9660"
            );
            refreshHUD();
        },
        gainGold(n) {
            run.gold += n;
            UI.floatDelta(UI.$("#hud-gold"), "+" + n, "#a87e2f");
            UI.popChip("#hud-gold");
            refreshHUD();
        },
        gainXp(n) {
            run.xp += n;
            UI.floatDelta(
                UI.$("#xp-fill").parentElement,
                "+" + n + " XP",
                "#6f8fba"
            );
            refreshHUD();
        },
        loseXp(n) {
            run.xp = Math.max(0, run.xp - n);
            UI.floatDelta(
                UI.$("#xp-fill").parentElement,
                "-" + n + " XP",
                "#c04a3b"
            );
            refreshHUD();
        },
        loseGold(n) {
            run.gold = Math.max(0, run.gold - n);
            UI.floatDelta(UI.$("#hud-gold"), "-" + n, "#c04a3b");
            refreshHUD();
        },
        // deduct only if affordable; returns whether the purchase went through
        spendGold(n) {
            if (run.gold < n) return false;
            run.gold -= n;
            UI.floatDelta(UI.$("#hud-gold"), "-" + n, "#c04a3b");
            refreshHUD();
            return true;
        },
        // event damage never kills — the clay only crumbles to a miss
        damage(n) {
            run.hp = Math.max(1, run.hp - n);
            UI.floatDelta(
                UI.$("#hp-fill").parentElement,
                "-" + n + " HP",
                "#c04a3b"
            );
            UI.reactFace("😖");
            refreshHUD();
        },
        gainItem(id) {
            run.items[id] = (run.items[id] || 0) + 1;
            renderItemBar();
        },
        startEvent(id) {
            run.event = { id: id, remaining: CONFIG.eventDuration };
        },
    };

    /* ---------------- boot ---------------- */

    function init() {
        load();

        // hand-form every clay piece and hand-place the title letters
        UI.kneadAll();
        UI.splitTitle(UI.$("#screen-home .game-title"));

        const howto = UI.$("#modal-howto");
        UI.$("#btn-howto").addEventListener("click", () => UI.openModal(howto));
        UI.$("#btn-howto-run").addEventListener("click", () =>
            UI.openModal(howto)
        );
        UI.$("#btn-howto-ok").addEventListener("click", () =>
            UI.closeModal(howto)
        );

        UI.$("#btn-start").addEventListener("click", showSetsScreen);
        UI.$("#btn-run-go").addEventListener("click", beginRun);
        UI.$("#btn-sets-back").addEventListener("click", goHome);
        UI.$("#btn-shop").addEventListener("click", openShop);
        UI.$("#btn-shop-back").addEventListener("click", goHome);
        UI.$("#btn-again").addEventListener("click", beginRun);
        UI.$("#btn-home").addEventListener("click", goHome);
        UI.$("#btn-reset").addEventListener("click", resetProgress);
        UI.$("#btn-next").addEventListener("click", nextQuestion);
        UI.$("#btn-flee").addEventListener("click", () => {
            if (confirm("End this run? Your gold gets banked.")) endRun(true);
        });

        UI.$$(".choice").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                answer(parseInt(btn.dataset.slot, 10), e);
            });
        });

        // keyboard: 1-4 / a-d to answer (or pick an event choice), and
        // Enter / Space / → for Next. Only during a run with no modal open.
        const SLOT = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
        document.addEventListener("keydown", (e) => {
            if (UI.$("#screen-run").classList.contains("hidden")) return;
            if (UI.$$(".modal").some((m) => !m.classList.contains("hidden")))
                return;
            const k = e.key.toLowerCase();
            const nextVisible = UI.$("#btn-next").classList.contains("showing");
            if (nextVisible && (k === "enter" || k === " " || k === "arrowright")) {
                e.preventDefault();
                nextQuestion();
                return;
            }
            if (k in SLOT) {
                const btn = UI.$$(".choice")[SLOT[k]];
                if (btn && !btn.classList.contains("hidden")) {
                    e.preventDefault();
                    // dispatch a click at the button's centre so the firework
                    // and answer handler get sensible coordinates
                    const r = btn.getBoundingClientRect();
                    btn.dispatchEvent(
                        new MouseEvent("click", {
                            bubbles: true,
                            clientX: r.left + r.width / 2,
                            clientY: r.top + r.height / 2,
                        })
                    );
                }
            }
        });

        // run stopwatch — ticks whenever a run is on screen
        setInterval(() => {
            if (
                run &&
                run.active &&
                !UI.$("#screen-run").classList.contains("hidden")
            ) {
                UI.setTimer(Date.now() - (run.startedAt || Date.now()));
            }
        }, 1000);

        if (run && run.active && (run.q || run.eventCard)) {
            // resume mid-run after a refresh
            rebuildActivePool();
            UI.showScreen("screen-run");
            refreshHUD();
            if (run.eventCard) {
                serveEventCard();
            } else {
                UI.renderQuestion(run);
                UI.renderEventBanner(run);
                renderItemBar();
                UI.renderBuffs(run);
                if (run.answeredCurrent) {
                    // was between questions — just serve the next one
                    nextQuestion();
                }
            }
        } else {
            goHome();
        }
    }

    document.addEventListener("DOMContentLoaded", init);

    return { gameApi };
})();
