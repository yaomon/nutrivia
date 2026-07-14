// Item registry. To add an item: add an entry here — the engine and UI
// pick it up automatically (item bar, level-up reward pool, buff chips).
//
// Two kinds:
//   kind: "instant" — fires immediately on the current question via use(game)
//   kind: "buff"    — sets a flag on run.buffs consumed later by the engine
//
// canUse(game) gates the button; omit it for always-usable.
const ITEMS = {
    fifty_fifty: {
        icon: "➗",
        name: "50/50",
        desc: "Squish the question down to two choices.",
        kind: "instant",
        canUse: (game) => game.visibleWrongOptions().length >= 2,
        use: (game) => {
            // Eliminate wrong answers until only one remains
            const wrong = game.shuffled(game.visibleWrongOptions());
            game.eliminateOptions(wrong.slice(0, wrong.length - 1));
        },
    },
    single_elim: {
        icon: "🫳",
        name: "Pinch Off",
        desc: "Flick one wrong answer off the board.",
        kind: "instant",
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
        kind: "buff",
        buff: "streak_protector",
        canUse: (game) => !game.run.buffs.streak_protector,
    },
    second_chance: {
        icon: "🔁",
        name: "Second Chance",
        desc: "Your next miss just removes that answer — pick again.",
        kind: "buff",
        buff: "second_chance",
        canUse: (game) => !game.run.buffs.second_chance,
    },
};
