// Event registry. Events are temporary run modifiers lasting CONFIG.eventDuration
// questions. To add one, add an entry — the engine rolls among eligible events.
//
// Hooks (all optional):
//   eligible(game)              -> bool, can this event trigger right now
//   pickQuestion(game)          -> question object, overrides normal selection
//   modifyChoices(game, q, cs)  -> choices array, reshape the displayed answers
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
        icon: "🪙",
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
};
