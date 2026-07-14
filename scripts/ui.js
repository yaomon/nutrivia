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

    /* ---------- helpers ---------- */

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
    }

    /* ---------- HUD ---------- */

    function renderHUD(run, xpNeeded) {
        $("#hud-level").textContent = run.level;
        $("#hp-fill").style.width =
            Math.max(0, (run.hp / CONFIG.maxHp) * 100) + "%";
        $("#hp-label").textContent =
            "HP " + Math.max(0, run.hp) + "/" + CONFIG.maxHp;
        $("#xp-fill").style.width =
            Math.min(100, (run.xp / xpNeeded) * 100) + "%";
        $("#xp-label").textContent = "XP " + run.xp + "/" + xpNeeded;
        $("#hud-streak").textContent = "🔥 " + run.streak;
        $("#hud-gold").textContent = "🪙 " + run.gold;
    }

    function popChip(sel) {
        replayAnim($(sel), "squish-pop");
    }

    /* ---------- question & choices ---------- */

    function renderQuestion(run) {
        const q = run.q;
        $("#q-num").textContent = "#" + q.number;
        $("#q-count").textContent = "Q" + (run.answered + 1);
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
            replayAnim(btn, "squish-in");
        });

        replayAnim($("#question-card"), "squish-in");
        $("#btn-next").classList.add("hidden");
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

    function renderItems(run, canUseFn, onUse) {
        const bar = $("#item-bar");
        bar.innerHTML = "";
        Object.entries(run.items).forEach(([id, count]) => {
            if (count <= 0) return;
            const item = ITEMS[id];
            if (!item) return;
            const btn = document.createElement("button");
            btn.className = "item-btn clay clay-btn";
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
        });
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
                $("#modal-levelup").classList.add("hidden");
                onPick(i);
            });
            wrap.appendChild(btn);
        });
        $("#modal-levelup").classList.remove("hidden");
        replayAnim($("#modal-levelup .modal-card"), "squish-in");
    }

    function showFood(food, onOk) {
        $("#food-img").src = "images/food/" + food.name;
        $("#food-name").textContent = food.displayName;
        const rarityEl = $("#food-rarity");
        rarityEl.textContent = RARITIES[food.rarity] || "?";
        rarityEl.className = "food-rarity rarity-" + food.rarity;
        $("#food-desc").textContent = food.description;
        const ok = $("#btn-food-ok");
        ok.textContent = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        ok.onclick = () => {
            $("#modal-food").classList.add("hidden");
            if (onOk) onOk();
        };
        $("#modal-food").classList.remove("hidden");
        replayAnim($("#modal-food .modal-card"), "squish-in");
    }

    /* ---------- summary ---------- */

    function renderSummary(run, fled) {
        $("#summary-title").textContent = fled ? "Run Ended" : "Run Over";
        $("#summary-sub").textContent = fled
            ? "you tapped out — the clay remembers"
            : "your health crumbled away";
        $("#sum-level").textContent = run.level;
        $("#sum-correct").textContent = run.correct;
        $("#sum-missed").textContent = run.missed;
        $("#sum-gold").textContent = run.gold;
    }

    return {
        $,
        $$,
        showScreen,
        replayAnim,
        floatDelta,
        fireworks,
        renderHome,
        renderHUD,
        popChip,
        renderQuestion,
        markEliminated,
        revealAnswer,
        renderItems,
        renderBuffs,
        renderEventBanner,
        showLevelUp,
        showFood,
        renderSummary,
    };
})();
