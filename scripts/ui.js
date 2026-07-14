// UI layer: DOM rendering + juice. No game rules in here — it renders
// whatever state the engine hands it, so mechanics can change freely.
const UI = (() => {
    "use strict";

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    const RARITIES = [
        "Inedible",
        "Unappetizing",
        "Tasty",
        "Savory",
        "Delicious",
        "Gourmet",
        "Decadent",
        "Divine",
    ];

    const CHEERS = [
        "Woo!",
        "Sweet!",
        "Nice!",
        "Awesome!",
        "Wow!",
        "Spectacular!",
        "Wonderful!",
    ];

    const HOME_TIPS = [
        "The 🔥 streak makes every right answer worth more — protect it!",
        "Missed a question? It comes back later. Beat it to clear it.",
        "Level up during a run to win items, gold, and new foods.",
        "Items help when you're stuck — tap one before answering.",
        "Your 💰 gold is safe forever, even when a run ends.",
        "Wrong answers cost 5 ❤️ — the run ends when HP hits zero.",
        "Answer within a few seconds for bonus ⚡ XP!",
        "Questions you've mastered come back less often — new ones mix in.",
    ];

    /* ---------- helpers ---------- */

    // Hand-form a clay piece: every element gets its own slightly
    // uneven corners and a tiny off-true tilt, like it was pinched
    // into shape rather than machined.
    function knead(el) {
        if (
            el.classList.contains("chip") ||
            el.classList.contains("buff-chip") ||
            el.classList.contains("bar") ||
            el.classList.contains("level-badge")
        )
            return; // pills stay pills

        const isBlob =
            el.classList.contains("avatar") ||
            el.classList.contains("choice-let") ||
            el.classList.contains("food-pedestal");

        if (isBlob) {
            const r = () => 42 + Math.random() * 16;
            const a = r(),
                b = r(),
                c = r(),
                d = r();
            el.style.borderRadius =
                a + "% " + (100 - a) + "% " + b + "% " + (100 - b) + "% / " +
                c + "% " + d + "% " + (100 - d) + "% " + (100 - c) + "%";
        } else {
            const r = () => (20 + Math.random() * 12).toFixed(1) + "px";
            el.style.borderRadius =
                r() + " " + r() + " " + r() + " " + r() + " / " +
                r() + " " + r() + " " + r() + " " + r();
        }
        el.style.rotate = ((Math.random() * 2 - 1) * 0.5).toFixed(2) + "deg";
    }

    function kneadAll(root) {
        (root || document)
            .querySelectorAll(".clay, .clay-inset")
            .forEach(knead);
    }

    // split a heading into letters, each placed a little crooked
    function splitTitle(el) {
        const text = el.textContent;
        el.textContent = "";
        for (const ch of text) {
            if (ch === " ") {
                el.append(" ");
                continue;
            }
            const span = document.createElement("span");
            span.className = "tilt";
            span.textContent = ch;
            span.style.setProperty(
                "--tilt",
                ((Math.random() * 2 - 1) * 2.5).toFixed(1) + "deg"
            );
            span.style.setProperty(
                "--tilt-y",
                ((Math.random() * 2 - 1) * 2).toFixed(1) + "px"
            );
            el.appendChild(span);
        }
    }

    /* ---------- coach toast (one hint at a time, tap to dismiss) ---------- */

    let coachEl = null;

    function toast(text) {
        if (coachEl) coachEl.remove();
        const el = document.createElement("div");
        el.className = "coach clay squish-in";
        el.textContent = text;
        document.body.appendChild(el);
        knead(el);
        coachEl = el;
        const dismiss = () => {
            if (el !== coachEl) return;
            coachEl = null;
            el.classList.remove("squish-in");
            el.classList.add("squish-out");
            setTimeout(() => el.remove(), 320);
        };
        el.addEventListener("click", dismiss);
        setTimeout(dismiss, 6500);
    }

    /* ---------- avatar expressions ---------- */

    let faceTimer = null;
    let baseFace = "👨‍🍳";

    function setBaseFace(face) {
        baseFace = face;
        if (!faceTimer) $(".avatar-face").textContent = face;
    }

    function reactFace(face, ms) {
        $(".avatar-face").textContent = face;
        replayAnim($(".avatar"), "squish-pop");
        clearTimeout(faceTimer);
        faceTimer = setTimeout(() => {
            faceTimer = null;
            $(".avatar-face").textContent = baseFace;
        }, ms || 1200);
    }

    function showScreen(id) {
        $$(".screen").forEach((s) => s.classList.toggle("hidden", s.id !== id));
        window.scrollTo(0, 0);
    }

    function replayAnim(el, cls) {
        el.classList.remove(cls);
        void el.offsetWidth; // reflow to restart the animation
        el.classList.add(cls);
    }

    function floatDelta(anchor, text, color) {
        const rect = anchor.getBoundingClientRect();
        const el = document.createElement("div");
        el.className = "float-delta";
        el.textContent = text;
        el.style.color = color;
        el.style.left = rect.left + rect.width * (0.3 + Math.random() * 0.4) + "px";
        el.style.top = rect.top - 6 + "px";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }

    // clay-crumb burst at a point
    function fireworks(x, y, colors) {
        const div = document.createElement("div");
        div.className = "firework";
        div.style.left = x + "px";
        div.style.top = y + "px";
        document.body.appendChild(div);

        const count = 14;
        for (let i = 0; i < count; i++) {
            const span = document.createElement("span");
            span.className = "fire-span";
            const deg = i * (360 / count) + Math.floor(Math.random() * 20);
            span.style.height = 12 + Math.floor(Math.random() * 20) + "px";
            span.style.width = 6 + Math.floor(Math.random() * 12) + "px";
            span.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
            span.style.transform = "rotate(" + deg + "deg)";
            div.appendChild(span);
        }

        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                div.querySelectorAll("span").forEach((s) => {
                    const dist = -40 - Math.floor(Math.random() * 80);
                    s.style.transform +=
                        " scaleY(0.5) translateY(" + dist + "px)";
                    s.style.opacity = "0";
                    s.style.transition = "transform 0.45s, opacity 0.45s";
                });
                setTimeout(() => div.remove(), 460);
            })
        );
    }

    /* ---------- home ---------- */

    function renderHome(meta, foodTotal) {
        $("#home-gold").textContent = meta.gold;
        $("#home-foods").textContent = meta.foods.length + "/" + foodTotal;
        $("#home-best").textContent = meta.best.level
            ? "Lv " + meta.best.level + " · " + meta.best.correct + "✓"
            : "—";
        $("#home-tip").textContent =
            "💡 " + HOME_TIPS[Math.floor(Math.random() * HOME_TIPS.length)];
    }

    /* ---------- HUD ---------- */

    function renderHUD(run, xpNeeded) {
        $("#hud-level").textContent = "Lv " + run.level;
        $("#hp-fill").style.width =
            Math.max(0, (run.hp / CONFIG.maxHp) * 100) + "%";
        $("#hp-label").textContent =
            "HP " + Math.max(0, run.hp) + "/" + CONFIG.maxHp;
        $("#hp-fill").parentElement.classList.toggle(
            "low",
            run.hp > 0 && run.hp <= CONFIG.hpLossOnMiss
        );
        setBaseFace(
            run.hp <= 0 ? "😵" : run.hp <= CONFIG.hpLossOnMiss ? "😰" : "👨‍🍳"
        );
        $("#xp-fill").style.width =
            Math.min(100, (run.xp / xpNeeded) * 100) + "%";
        $("#xp-label").textContent = "XP " + run.xp + "/" + xpNeeded;
        $("#hud-streak").textContent = "🔥 " + run.streak;
        $("#hud-gold").textContent = "💰 " + run.gold;
    }

    function popChip(sel) {
        replayAnim($(sel), "squish-pop");
    }

    /* ---------- question & choices ---------- */

    function formatTime(ms) {
        const s = Math.max(0, Math.floor(ms / 1000));
        return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    }

    function setTimer(ms) {
        $("#q-timer").textContent = "⏱️ " + formatTime(ms);
    }

    function renderQuestion(run) {
        const q = run.q;
        $("#question-card").classList.remove("event-mode");
        $("#q-num").textContent = "Question " + (run.answered + 1);
        $("#q-text").textContent = q.text;

        $$(".choice").forEach((btn, i) => {
            const choice = q.choices[i];
            btn.classList.remove(
                "correct",
                "incorrect",
                "eliminated",
                "answered",
                "squish-in"
            );
            if (!choice) {
                btn.classList.add("hidden");
                return;
            }
            btn.classList.remove("hidden");
            btn.querySelector(".choice-let").textContent = choice.option;
            btn.querySelector(".choice-val").textContent = choice.text;
            if (q.eliminated.includes(choice.option)) {
                btn.classList.add("eliminated");
            }
            btn.style.animationDelay = 0.05 * i + "s";
            // re-mold the clay for every fresh question
            knead(btn);
            knead(btn.querySelector(".choice-let"));
            replayAnim(btn, "squish-in");
        });

        knead($("#question-card"));
        replayAnim($("#question-card"), "squish-in");
        $("#btn-next").classList.add("hidden");
    }

    /* ---------- event cards ---------- */

    // an event pauses the run on a story card whose choices ARE the answers
    function renderEventCard(run, def) {
        $("#question-card").classList.add("event-mode");
        $("#q-num").textContent = def.icon + " Event: " + def.name;
        $("#q-text").textContent = def.intro;

        $$(".choice").forEach((btn, i) => {
            const choice = def.choices[i];
            btn.classList.remove(
                "correct",
                "incorrect",
                "eliminated",
                "answered",
                "squish-in"
            );
            if (!choice) {
                btn.classList.add("hidden");
                return;
            }
            btn.classList.remove("hidden");
            btn.querySelector(".choice-let").textContent = "abcd"[i];
            btn.querySelector(".choice-val").textContent = choice.text;
            btn.style.animationDelay = 0.05 * i + "s";
            knead(btn);
            knead(btn.querySelector(".choice-let"));
            replayAnim(btn, "squish-in");
        });

        knead($("#question-card"));
        replayAnim($("#question-card"), "squish-in");
        $("#btn-next").classList.add("hidden");
    }

    // show what the chosen path did: chosen card glows, others flatten,
    // the story text becomes the outcome
    function resolveEventCard(slotIndex, resultText) {
        $$(".choice").forEach((btn, i) => {
            btn.classList.add("answered");
            if (i === slotIndex) {
                btn.classList.add("correct");
                replayAnim(btn, "squish-pop");
            } else if (!btn.classList.contains("hidden")) {
                btn.classList.add("eliminated");
            }
        });
        $("#q-text").textContent = resultText;
        replayAnim($("#q-text"), "squish-in");
        $("#btn-next").classList.remove("hidden");
        replayAnim($("#btn-next"), "squish-in");
    }

    function slotFor(run, option) {
        const idx = run.q.choices.findIndex((c) => c.option === option);
        return $$(".choice")[idx];
    }

    function markEliminated(run, options) {
        options.forEach((opt) => {
            const btn = slotFor(run, opt);
            if (btn) btn.classList.add("eliminated");
        });
    }

    function revealAnswer(run, pickedOption) {
        $$(".choice").forEach((btn) => btn.classList.add("answered"));
        const correctBtn = slotFor(run, run.q.correct);
        if (correctBtn) {
            correctBtn.classList.add("correct");
            replayAnim(correctBtn, "squish-pop");
        }
        if (pickedOption !== run.q.correct) {
            const pickedBtn = slotFor(run, pickedOption);
            if (pickedBtn) {
                pickedBtn.classList.add("incorrect");
                replayAnim(pickedBtn, "shake");
            }
        }
        $("#btn-next").classList.remove("hidden");
        replayAnim($("#btn-next"), "squish-in");
    }

    /* ---------- items & buffs ---------- */

    function renderItems(run, canUseFn, onUse, armedId) {
        const bar = $("#item-bar");
        bar.innerHTML = "";
        let shown = 0;
        Object.entries(run.items).forEach(([id, count]) => {
            if (count <= 0) return;
            const item = ITEMS[id];
            if (!item) return;
            const btn = document.createElement("button");
            btn.className = "item-btn clay clay-btn";
            if (id === armedId) btn.classList.add("armed");
            btn.title = item.name + " — " + item.desc;
            btn.innerHTML =
                "<span>" +
                item.icon +
                '</span><span class="item-count">' +
                count +
                "</span>";
            btn.disabled = !canUseFn(id);
            btn.addEventListener("click", () => onUse(id, btn));
            bar.appendChild(btn);
            knead(btn);
            shown++;
        });
        $("#item-tray-label").classList.toggle("hidden", shown === 0);
    }

    // first tap on an item: explain it right above the item bar
    function showItemHint(item) {
        const el = $("#item-hint");
        el.innerHTML = "";
        el.append(item.icon + " " + item.name + " — " + item.desc);
        const use = document.createElement("span");
        use.className = "item-hint-use";
        use.textContent = "tap it again to use it!";
        el.appendChild(use);
        el.classList.remove("hidden");
        knead(el);
        replayAnim(el, "squish-in");
    }

    function hideItemHint() {
        $("#item-hint").classList.add("hidden");
    }

    function renderBuffs(run) {
        const wrap = $("#buff-chips");
        wrap.innerHTML = "";
        Object.keys(run.buffs).forEach((buff) => {
            const item = Object.values(ITEMS).find((i) => i.buff === buff);
            const chip = document.createElement("div");
            chip.className = "buff-chip clay";
            chip.title = item ? item.name : buff;
            chip.textContent = item ? item.icon : "✨";
            wrap.appendChild(chip);
        });
    }

    /* ---------- event banner ---------- */

    function renderEventBanner(run) {
        const banner = $("#event-banner");
        if (!run.event) {
            banner.classList.add("hidden");
            return;
        }
        const ev = EVENTS[run.event.id];
        banner.textContent =
            ev.icon +
            " " +
            ev.name.toUpperCase() +
            " — " +
            ev.desc +
            " (" +
            run.event.remaining +
            " left)";
        if (banner.classList.contains("hidden")) {
            banner.classList.remove("hidden");
            replayAnim(banner, "squish-in");
        }
    }

    /* ---------- modals ---------- */

    function openModal(modal) {
        modal.classList.remove("hidden");
        replayAnim(modal.querySelector(".modal-card"), "squish-in");
    }

    // squish the card away instead of snapping shut
    function closeModal(modal, after) {
        const card = modal.querySelector(".modal-card");
        if (card.classList.contains("squish-out")) return; // already closing
        card.classList.remove("squish-in");
        card.classList.add("squish-out");
        setTimeout(() => {
            modal.classList.add("hidden");
            card.classList.remove("squish-out");
            if (after) after();
        }, 290);
    }

    function showLevelUp(level, cards, onPick) {
        $("#levelup-level").textContent = level;
        const wrap = $("#reward-choices");
        wrap.innerHTML = "";
        cards.forEach((card, i) => {
            const btn = document.createElement("button");
            btn.className = "reward-card clay clay-btn";
            btn.innerHTML =
                '<span class="reward-card-icon">' +
                card.icon +
                '</span><span class="reward-card-name">' +
                card.name +
                '</span><span class="reward-card-desc">' +
                card.desc +
                "</span>";
            btn.style.animationDelay = 0.08 * i + "s";
            btn.classList.add("squish-in");
            btn.addEventListener("click", () => {
                closeModal($("#modal-levelup"), () => onPick(i));
            });
            wrap.appendChild(btn);
            knead(btn);
        });
        openModal($("#modal-levelup"));
    }

    // crumb-burst colors per rarity tier (0 dull → 7 rainbow-ish)
    const RARITY_COLORS = [
        ["#b7a891"], // inedible
        ["#b7a891", "#c9b89c"], // unappetizing
        ["#8fac72", "#a7c07f"], // tasty
        ["#6f8fba", "#8aa8d0"], // savory
        ["#a37bb8", "#c194d6"], // delicious
        ["#e5a83e", "#f2c96b"], // gourmet
        ["#d95c4c", "#f0836f"], // decadent
        ["#d95c4c", "#e5a83e", "#8fac72", "#6f8fba", "#a37bb8"], // divine
    ];

    // Two-phase reveal: a wrapped mystery you tap to unwrap, then a
    // rarity-scaled burst. Rarer foods shake longer and erupt bigger.
    function showFood(food, onOk) {
        const rarity = food.rarity || 0;
        const colors = RARITY_COLORS[rarity] || RARITY_COLORS[0];

        // preload the result content (kept hidden until the reveal)
        $("#food-img").src = "images/food/" + food.name;
        $("#food-name").textContent = food.displayName;
        const rarityEl = $("#food-rarity");
        rarityEl.textContent = RARITIES[rarity] || "?";
        rarityEl.className = "food-rarity rarity-" + rarity;
        $("#food-desc").textContent = food.description;
        const ok = $("#btn-food-ok");
        ok.textContent = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        ok.onclick = () => closeModal($("#modal-food"), onOk);

        // reset to phase 1 (mystery)
        const wrap = $("#food-wrap");
        const result = $("#food-result");
        const mystery = $("#food-mystery");
        wrap.classList.remove("hidden");
        result.classList.add("hidden");
        mystery.classList.remove("opening");
        mystery.disabled = false;

        let opened = false;
        mystery.onclick = () => {
            if (opened) return;
            opened = true;
            mystery.disabled = true;
            // rarer = longer anticipatory shake before it pops
            const buildup = 350 + rarity * 130;
            mystery.classList.add("opening");
            mystery.style.animationDuration = Math.max(0.12, 0.34 - rarity * 0.03) + "s";

            setTimeout(() => {
                // erupt from where the mystery box sits
                const r = mystery.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const bursts = 1 + Math.ceil(rarity / 2); // 1..4 bursts
                for (let b = 0; b < bursts; b++) {
                    setTimeout(
                        () =>
                            fireworks(
                                cx + (Math.random() * 60 - 30),
                                cy + (Math.random() * 60 - 30),
                                colors
                            ),
                        b * 90
                    );
                }
                // high rarity: a colored flash washes the card
                if (rarity >= 5) {
                    const card = $("#modal-food .modal-card");
                    card.style.setProperty("--flash", colors[0]);
                    replayAnim(card, "rarity-flash");
                }
                wrap.classList.add("hidden");
                result.classList.remove("hidden");
                replayAnim(result, "squish-in");
                replayAnim($("#food-rarity"), "squish-pop");
            }, buildup);
        };

        openModal($("#modal-food"));
    }

    // saved from death — dramatic once-per-run rescue
    function showSaved(text, onOk) {
        $("#saved-desc").textContent = text;
        $("#btn-saved-ok").onclick = () => {
            closeModal($("#modal-saved"), onOk);
        };
        openModal($("#modal-saved"));
    }

    /* ---------- summary ---------- */

    function renderSummary(run, fled) {
        $("#summary-title").textContent = fled ? "Run Ended" : "Run Over";
        splitTitle($("#summary-title"));
        $("#summary-sub").textContent = fled
            ? "you tapped out — the clay remembers"
            : "your health crumbled away";
        $("#sum-level").textContent = run.level;
        $("#sum-correct").textContent = run.correct;
        $("#sum-missed").textContent = run.missed;
        $("#sum-streak").textContent = "🔥 " + (run.bestStreak || 0);
        $("#sum-time").textContent = formatTime(run.duration || 0);
        $("#sum-gold").textContent = run.gold;
    }

    /* ---------- pick-your-menu (question sets) ---------- */

    function renderSets(selectedIds, onToggle) {
        const list = $("#set-list");
        list.innerHTML = "";
        let total = 0;
        QUESTION_SETS.forEach((set) => {
            const selected = selectedIds.includes(set.id);
            const count = setQuestionCount(set);
            if (selected) total += count;
            const btn = document.createElement("button");
            btn.className =
                "set-card clay clay-btn " +
                (selected ? "selected" : "unselected");
            btn.innerHTML =
                '<span class="set-icon">' +
                set.icon +
                '</span><div class="set-info"><div class="set-name">' +
                set.name +
                '</div><div class="set-desc">' +
                set.desc +
                " · " +
                count +
                ' questions</div></div><span class="set-check">' +
                (selected ? "✔" : "") +
                "</span>";
            btn.addEventListener("click", () => onToggle(set.id));
            list.appendChild(btn);
            knead(btn);
        });
        $("#set-total").textContent =
            total > 0
                ? total + " questions in the pot"
                : "the pot is empty — pick at least one!";
    }

    /* ---------- pantry shop ---------- */

    function renderShop(meta, onBuy) {
        $("#shop-gold").textContent = meta.gold;

        // what's already queued for the next run
        const stocked = Object.entries(meta.stock || {}).filter(
            ([, n]) => n > 0
        );
        const stockEl = $("#shop-stocked");
        if (stocked.length) {
            stockEl.classList.remove("hidden");
            stockEl.textContent =
                "🎒 stocked for next run: " +
                stocked
                    .map(([id, n]) => ITEMS[id].icon + "×" + n)
                    .join("  ");
        } else {
            stockEl.classList.add("hidden");
        }

        const list = $("#shop-list");
        list.innerHTML = "";
        Object.keys(ITEMS)
            .filter((id) => !ITEMS[id].noShop)
            .forEach((id) => {
                const item = ITEMS[id];
                const owned = (meta.stock && meta.stock[id]) || 0;
                const afford = meta.gold >= item.cost;
                const btn = document.createElement("button");
                btn.className =
                    "shop-card clay clay-btn" + (afford ? "" : " cant-afford");
                btn.innerHTML =
                    '<span class="shop-icon">' +
                    item.icon +
                    '</span><div class="shop-info"><div class="shop-name">' +
                    item.name +
                    (owned ? ' <span class="shop-owned">×' + owned + "</span>" : "") +
                    '</div><div class="shop-desc">' +
                    item.desc +
                    '</div></div><span class="shop-cost clay ' +
                    (afford ? "mustard" : "") +
                    '">💰 ' +
                    item.cost +
                    "</span>";
                btn.addEventListener("click", () => onBuy(id, btn));
                list.appendChild(btn);
                knead(btn);
            });
    }

    // little celebration when a purchase lands
    function onItemBought(btnEl, item) {
        replayAnim(btnEl, "squish-pop");
        const r = btnEl.getBoundingClientRect();
        fireworks(r.left + r.width / 2, r.top + r.height / 2, [
            "#e5a83e",
            "#8fac72",
        ]);
        floatDelta(btnEl, "-💰" + item.cost, "#a87e2f");
    }

    return {
        $,
        $$,
        showScreen,
        replayAnim,
        floatDelta,
        fireworks,
        knead,
        kneadAll,
        splitTitle,
        toast,
        reactFace,
        setBaseFace,
        renderHome,
        renderHUD,
        popChip,
        setTimer,
        renderQuestion,
        renderEventCard,
        resolveEventCard,
        markEliminated,
        revealAnswer,
        renderItems,
        showItemHint,
        hideItemHint,
        renderBuffs,
        renderEventBanner,
        openModal,
        closeModal,
        showLevelUp,
        showFood,
        showSaved,
        renderSummary,
        renderSets,
        renderShop,
        onItemBought,
    };
})();
