// Item registry. To add an item: add an entry here — the engine and UI
// pick it up automatically (item bar, level-up reward pool, buff chips,
// and the shop).
//
// Two kinds:
//   kind: "instant" — fires immediately on the current question via use(game)
//   kind: "buff"    — sets a flag on run.buffs consumed later by the engine
//
// canUse(game) gates the button; omit it for always-usable.
// cost      — gold price in the shop.
// noShop    — omit from the shop (e.g. an item that just gives gold back).
const ITEMS = {
    fifty_fifty: {
        icon: "➗",
        name: "50/50",
        desc: "Squish the question down to two choices.",
        kind: "instant",
        cost: 20,
        canUse: (game) => game.visibleWrongOptions().length >= 2,
        use: (game) => {
            // Eliminate wrong answers until only one remains
            const wrong = game.shuffled(game.visibleWrongOptions());
            game.eliminateOptions(wrong.slice(0, wrong.length - 1));
        },
    },
    single_elim: {
        icon: "🤏",
        name: "Pinch Off",
        desc: "Flick one wrong answer off the board.",
        kind: "instant",
        cost: 12,
        canUse: (game) => game.visibleWrongOptions().length >= 2,
        use: (game) => {
            const wrong = game.shuffled(game.visibleWrongOptions());
            game.eliminateOptions(wrong.slice(0, 1));
        },
    },
    streak_protector: {
        icon: "🛡️",
        name: "Streak Shield",
        desc: "Your next miss costs no HP, XP, or streak.",
        activeText:
            "🛡️ Streak Shield is on — your next miss won't cost you anything.",
        kind: "buff",
        buff: "streak_protector",
        cost: 25,
        canUse: (game) => !game.run.buffs.streak_protector,
    },
    second_chance: {
        icon: "🔁",
        name: "Second Chance",
        desc: "Your next miss just removes that answer — pick again.",
        activeText:
            "🔁 Second Chance is ready — if you miss, that answer disappears and you pick again.",
        kind: "buff",
        buff: "second_chance",
        cost: 30,
        canUse: (game) => !game.run.buffs.second_chance,
    },
    warm_broth: {
        icon: "🍵",
        name: "Warm Broth",
        desc: "Sip it to smooth 5 HP back on.",
        kind: "instant",
        cost: 15,
        canUse: (game) => game.run.hp < CONFIG.maxHp,
        use: (game) => game.heal(5),
    },
    star_bite: {
        icon: "⭐",
        name: "Star Bite",
        desc: "Your next correct answer earns double XP.",
        activeText: "⭐ Star Bite eaten — your next correct answer is worth double XP!",
        kind: "buff",
        buff: "double_xp",
        cost: 30,
        canUse: (game) => !game.run.buffs.double_xp,
    },
    golden_spoon: {
        icon: "🥄",
        name: "Golden Spoon",
        desc: "Scoop up 25 gold, right now.",
        kind: "instant",
        noShop: true, // buying gold with gold makes no sense
        use: (game) => game.gainGold(25),
    },
    feast: {
        icon: "🍗",
        name: "Hearty Feast",
        desc: "A proper meal — restore 10 HP.",
        kind: "instant",
        cost: 25,
        canUse: (game) => game.run.hp < CONFIG.maxHp,
        use: (game) => game.heal(10),
    },
    honey_jar: {
        icon: "🍯",
        name: "Honey Jar",
        desc: "Sweet! Gain 15 XP, right now.",
        kind: "instant",
        cost: 18,
        use: (game) => game.gainXp(15),
    },
    chili_pepper: {
        icon: "🌶️",
        name: "Chili Pepper",
        desc: "Spicy! Your next correct answer builds +2 streak.",
        activeText:
            "🌶️ Chili eaten — your next correct answer builds double streak!",
        kind: "buff",
        buff: "double_streak",
        cost: 22,
        canUse: (game) => !game.run.buffs.double_streak,
    },
    snowflake: {
        icon: "❄️",
        name: "Snowflake",
        desc: "Freeze the clock — your next correct answer counts as lightning-fast.",
        activeText:
            "❄️ Clock frozen — your next correct answer gets the full speed bonus!",
        kind: "buff",
        buff: "auto_fast",
        cost: 22,
        canUse: (game) => !game.run.buffs.auto_fast,
    },
};
