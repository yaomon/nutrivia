// Event registry. Events are temporary run modifiers lasting CONFIG.eventDuration
// questions. To add one, add an entry — the engine rolls among eligible events.
//
// Hooks (all optional):
//   eligible(game)              -> bool, can this event trigger right now
//   pickQuestion(game)          -> question object, overrides normal selection
//   modifyChoices(game, q, cs)  -> choices array, reshape the displayed answers
//   modifyRewards(game, r)      -> {xp, gold}, reshape correct-answer rewards
//   modifyPenalty(game, p)      -> {hp, xp}, reshape the cost of a miss
const EVENTS = {
    redemption: {
        icon: "🔥",
        name: "Redemption Round",
        desc: "questions you've missed before",
        eligible: (game) => game.missedPool().length >= 3,
        pickQuestion: (game) => game.pickFrom(game.missedPool()),
    },
    deja_vu: {
        icon: "👀",
        name: "Déjà Vu",
        desc: "questions you've seen before",
        eligible: (game) => game.seenPool().length >= 5,
        pickQuestion: (game) => game.pickFrom(game.seenPool()),
    },
    coin_flip: {
        icon: "💰",
        name: "Coin Flip",
        desc: "every question has only two choices",
        eligible: () => true,
        modifyChoices: (game, q, choices) => {
            const correct = choices.find((c) => c.option === q.correct_answer);
            const wrong = game.shuffled(
                choices.filter((c) => c.option !== q.correct_answer)
            )[0];
            return choices.filter((c) => c === correct || c === wrong);
        },
    },
    gold_rush: {
        icon: "🤑",
        name: "Gold Rush",
        desc: "gold rewards are doubled",
        eligible: () => true,
        modifyRewards: (game, r) => ({ xp: r.xp, gold: r.gold * 2 }),
    },
    brain_wave: {
        icon: "🧠",
        name: "Brain Wave",
        desc: "XP rewards are doubled",
        eligible: () => true,
        modifyRewards: (game, r) => ({ xp: r.xp * 2, gold: r.gold }),
    },
    lucky_day: {
        icon: "🍀",
        name: "Lucky Day",
        desc: "one wrong answer is already gone",
        eligible: () => true,
        modifyChoices: (game, q, choices) => {
            const wrong = game.shuffled(
                choices.filter((c) => c.option !== q.correct_answer)
            )[0];
            return choices.filter((c) => c !== wrong);
        },
    },
    mix_up: {
        icon: "🌪️",
        name: "Mix-Up",
        desc: "the answers are shuffled out of order",
        eligible: () => true,
        modifyChoices: (game, q, choices) => game.shuffled(choices),
    },
    harvest: {
        icon: "🌾",
        name: "Harvest",
        desc: "XP and gold rewards ×1.5",
        eligible: () => true,
        modifyRewards: (game, r) => ({
            xp: Math.round(r.xp * 1.5),
            gold: Math.round(r.gold * 1.5),
        }),
    },
    sudden_death: {
        icon: "💀",
        name: "Sudden Death",
        desc: "misses cost DOUBLE HP — stay sharp!",
        eligible: (game) => game.run.hp >= 15, // only when you can take it
        modifyPenalty: (game, p) => ({ hp: p.hp * 2, xp: p.xp }),
    },
};
