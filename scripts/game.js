// Game engine: run lifecycle, question flow, scoring, leveling, persistence.
// Items and events plug in via the ITEMS / EVENTS registries.
const Game = (() => {
    "use strict";

    const STORAGE_KEY = "nutrivia_rogue_v1";

    const qByNumber = {};
    domain1_questions.forEach((q) => (qByNumber[q.number] = q));

    /* ---------------- state ---------------- */

    // meta persists across runs (the "lite" in roguelite)
    let meta = {
        gold: 0,
        foods: [], // collected food image names
        seen: [], // question numbers ever answered
        missed: [], // question numbers currently owed a redemption
        runs: 0,
        best: { level: 0, correct: 0 },
        hintsSeen: {}, // one-time coach hints already shown
    };

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
            level: 1,
            xp: 0,
            streak: 0,
            gold: 0,
            answered: 0,
            correct: 0,
            missed: 0,
            asked: [], // question numbers asked this run
            items: Object.assign({}, CONFIG.startingItems),
            buffs: {},
            event: null,
            sinceEvent: 0,
            q: null, // current question snapshot
            answeredCurrent: false,
            lowHpWarned: false,
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
            if (data.meta) meta = Object.assign(meta, data.meta);
            run = data.run || null;
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

    function notCurrent(q) {
        return !run.q || q.number !== run.q.number;
    }

    function missedPool() {
        return meta.missed.map((n) => qByNumber[n]).filter(Boolean).filter(notCurrent);
    }

    function seenPool() {
        return meta.seen.map((n) => qByNumber[n]).filter(Boolean).filter(notCurrent);
    }

    function defaultPool() {
        const seen = new Set(meta.seen);
        const asked = new Set(run.asked);
        let pool = domain1_questions.filter(
            (q) => !seen.has(q.number) && !asked.has(q.number)
        );
        if (!pool.length) {
            pool = domain1_questions.filter((q) => !asked.has(q.number));
        }
        if (!pool.length) {
            run.asked = []; // full sweep — start over
            pool = domain1_questions.slice();
        }
        return pool;
    }

    /* ---------------- events ---------------- */

    function rollEvent() {
        const eligible = Object.keys(EVENTS).filter((id) =>
            EVENTS[id].eligible(gameApi)
        );
        if (!eligible.length) return;
        run.event = {
            id: eligible[randInt(0, eligible.length - 1)],
            remaining: CONFIG.eventDuration,
        };
        hint(
            "events",
            "⚡ An event! These twist the next few questions — the banner tells you how."
        );
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
        if (!run.event) {
            run.sinceEvent++;
            if (run.sinceEvent >= CONFIG.eventEvery) {
                run.sinceEvent = 0;
                rollEvent();
            }
        }

        const ev = run.event ? EVENTS[run.event.id] : null;
        let source = null;
        if (ev && ev.pickQuestion) source = ev.pickQuestion(gameApi);
        if (!source) source = pickFrom(defaultPool());

        let choices = source.answers.map((a) => ({
            option: a.option,
            text: a.text,
        }));
        if (ev && ev.modifyChoices) {
            choices = ev.modifyChoices(gameApi, source, choices);
        }

        run.q = {
            number: source.number,
            text: source.question,
            choices: choices,
            correct: source.correct_answer,
            eliminated: [],
        };
        run.answeredCurrent = false;
        if (!run.asked.includes(source.number)) run.asked.push(source.number);
        if (run.event) run.event.remaining--;

        save();
        UI.renderQuestion(run);
        UI.renderEventBanner(run);
        renderItemBar();
        UI.renderBuffs(run);

        if (Object.values(run.items).some((n) => n > 0)) {
            hint(
                "items",
                "🎒 See the button below? That's an item — tap it before answering for a boost."
            );
        }
    }

    /* ---------------- answering ---------------- */

    function markSeen(number) {
        if (!meta.seen.includes(number)) meta.seen.push(number);
    }

    function answer(slotIndex, clickEvent) {
        if (!run || !run.active || run.answeredCurrent) return;
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
        const xpGain =
            CONFIG.xpBase + Math.min(run.streak - 1, CONFIG.xpStreakBonusCap);
        const goldGain =
            CONFIG.goldBase + Math.min(run.streak - 1, CONFIG.goldStreakBonusCap);
        run.xp += xpGain;
        run.gold += goldGain;
        run.correct++;
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
        if (!meta.missed.includes(run.q.number)) meta.missed.push(run.q.number);

        if (run.buffs.streak_protector) {
            delete run.buffs.streak_protector;
            UI.renderBuffs(run);
            UI.floatDelta(UI.$("#question-card"), "🛡️ protected!", "#6f8fba");
            UI.reactFace("😅");
        } else {
            run.streak = 0;
            run.hp -= CONFIG.hpLossOnMiss;
            run.xp = Math.max(0, run.xp - CONFIG.xpLossOnMiss);
            UI.floatDelta(
                UI.$("#hp-fill").parentElement,
                "-" + CONFIG.hpLossOnMiss + " HP",
                "#c04a3b"
            );
            UI.floatDelta(
                UI.$("#xp-fill").parentElement,
                "-" + CONFIG.xpLossOnMiss + " XP",
                "#c04a3b"
            );
            UI.replayAnim(UI.$("#question-card"), "shake");
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
            // dead — no next question, just a beat to see the reveal
            UI.$("#btn-next").classList.add("hidden");
            setTimeout(() => endRun(false), 1100);
        }
    }

    function finishQuestion(pickedOption) {
        run.answeredCurrent = true;
        run.answered++;
        markSeen(run.q.number);
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
        save();

        const cards = rollRewardCards();
        UI.showLevelUp(run.level, cards, (i) => {
            cards[i].apply();
            refreshHUD();
            renderItemBar();
            save();
            checkLevelUp(); // banked enough xp for another level?
        });
    }

    function rollRewardCards() {
        const itemId = pickFrom(Object.keys(ITEMS));
        const item = ITEMS[itemId];
        const kinds = [
            {
                icon: item.icon,
                name: item.name,
                desc: item.desc,
                apply: () => {
                    run.items[itemId] = (run.items[itemId] || 0) + 1;
                },
            },
            {
                icon: "❤️",
                name: "Patch Up",
                desc: "Smooth " + CONFIG.healAmount + " HP back on",
                apply: () => {
                    run.hp = Math.min(CONFIG.maxHp, run.hp + CONFIG.healAmount);
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
            {
                icon: "🍱",
                name: "Mystery Food",
                desc: "Discover a food for your collection",
                apply: grantFood,
            },
        ];
        return shuffled(kinds).slice(0, CONFIG.levelUpChoices);
    }

    function grantFood() {
        let pool = foods.filter((f) => !meta.foods.includes(f.name));
        if (!pool.length) pool = foods;
        const food = pool[randInt(0, pool.length - 1)];
        if (!meta.foods.includes(food.name)) meta.foods.push(food.name);
        save();
        UI.showFood(food);
    }

    /* ---------------- items ---------------- */

    function canUseItem(id) {
        if (run.answeredCurrent) return false;
        const item = ITEMS[id];
        if (!item) return false;
        return item.canUse ? item.canUse(gameApi) : true;
    }

    function useItem(id, btnEl) {
        if (!canUseItem(id)) {
            UI.replayAnim(btnEl, "shake");
            return;
        }
        const item = ITEMS[id];
        run.items[id]--;
        if (item.kind === "instant") {
            item.use(gameApi);
        } else if (item.kind === "buff") {
            run.buffs[item.buff] = true;
        }
        UI.renderBuffs(run);
        renderItemBar();
        save();
    }

    function renderItemBar() {
        UI.renderItems(run, canUseItem, useItem);
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

    function startRun() {
        run = newRun();
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
        UI.renderSummary(run, fled);
        save();
        UI.showScreen("screen-summary");
    }

    function goHome() {
        UI.renderHome(meta, foods.length);
        UI.showScreen("screen-home");
    }

    function resetProgress() {
        if (
            !confirm(
                "Reset ALL progress? Gold, collection, best run, and question history will be wiped."
            )
        )
            return;
        localStorage.removeItem(STORAGE_KEY);
        meta = {
            gold: 0,
            foods: [],
            seen: [],
            missed: [],
            runs: 0,
            best: { level: 0, correct: 0 },
        };
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
    };

    /* ---------------- boot ---------------- */

    function init() {
        load();

        // hand-form every clay piece and hand-place the title letters
        UI.kneadAll();
        UI.splitTitle(UI.$("#screen-home .game-title"));

        const howto = UI.$("#modal-howto");
        UI.$("#btn-howto").addEventListener("click", () => {
            howto.classList.remove("hidden");
            UI.replayAnim(howto.querySelector(".modal-card"), "squish-in");
        });
        UI.$("#btn-howto-run").addEventListener("click", () => {
            howto.classList.remove("hidden");
            UI.replayAnim(howto.querySelector(".modal-card"), "squish-in");
        });
        UI.$("#btn-howto-ok").addEventListener("click", () =>
            howto.classList.add("hidden")
        );

        UI.$("#btn-start").addEventListener("click", startRun);
        UI.$("#btn-again").addEventListener("click", startRun);
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

        if (run && run.active && run.q) {
            // resume mid-run after a refresh
            UI.showScreen("screen-run");
            refreshHUD();
            UI.renderQuestion(run);
            UI.renderEventBanner(run);
            renderItemBar();
            UI.renderBuffs(run);
            if (run.answeredCurrent) {
                // was between questions — just serve the next one
                nextQuestion();
            }
        } else {
            goHome();
        }
    }

    document.addEventListener("DOMContentLoaded", init);

    return { gameApi };
})();
