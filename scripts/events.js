// Event registry. When an event triggers, the run pauses and deals an
// EVENT CARD — a little story with choices. Each choice has its own
// outcome: start the event's modifier, trade for gold/XP/HP/items, or
// gamble. Outcomes return the text shown after choosing.
//
// Card fields:
//   icon, name    — shown on the card and the banner
//   desc          — short banner text while the modifier is active
//   intro         — the story shown on the event card
//   choices: [{ text, outcome(game) -> result text }]
//
// Modifier hooks (all optional, used while the event is active):
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
        intro: "The questions you've missed rise out of the clay, hungry for a rematch. They're chanting your name.",
        eligible: (game) => game.missedPool().length >= 3,
        pickQuestion: (game) => game.pickFrom(game.missedPool()),
        choices: [
            {
                text: "Face them — the next 5 questions are ones you've missed",
                outcome: (game) => {
                    game.startEvent("redemption");
                    return "🔥 The rematch begins. Show them who's boss!";
                },
            },
            {
                text: "Hit the books instead — gain 8 XP and move on",
                outcome: (game) => {
                    game.gainXp(8);
                    return "📚 A quiet study session. The grudges can wait.";
                },
            },
        ],
    },
    deja_vu: {
        icon: "👀",
        name: "Déjà Vu",
        desc: "questions you've seen before",
        intro: "The pot stirs itself and familiar questions float to the surface. Haven't you been here before?",
        eligible: (game) => game.seenPool().length >= 5,
        pickQuestion: (game) => game.pickFrom(game.seenPool()),
        choices: [
            {
                text: "Lean in — the next 5 questions are ones you've seen",
                outcome: (game) => {
                    game.startEvent("deja_vu");
                    return "👀 Everything feels strangely familiar...";
                },
            },
            {
                text: "Shake it off — take 10 gold and move on",
                outcome: (game) => {
                    game.gainGold(10);
                    return "💰 You blink, and the feeling passes. Profitably.";
                },
            },
        ],
    },
    coin_flip: {
        icon: "💰",
        name: "Coin Flip",
        desc: "every question has only two choices",
        intro: "A clay merchant flips a golden coin. \"Care to simplify your life? Or shall we let the coin decide your pay?\"",
        eligible: () => true,
        modifyChoices: (game, q, choices) => {
            const correct = choices.find((c) => c.option === q.correct_answer);
            const wrong = game.shuffled(
                choices.filter((c) => c.option !== q.correct_answer)
            )[0];
            return choices.filter((c) => c === correct || c === wrong);
        },
        choices: [
            {
                text: "Take the deal — only 2 choices per question for 5 questions",
                outcome: (game) => {
                    game.startEvent("coin_flip");
                    return "💰 The merchant smiles. Life is simpler now.";
                },
            },
            {
                text: "Flip for gold — heads +25, tails nothing",
                outcome: (game) => {
                    if (Math.random() < 0.5) {
                        game.gainGold(25);
                        return "🪄 HEADS! The merchant grumbles and pays up.";
                    }
                    return "😬 Tails. The merchant pockets the coin and winks.";
                },
            },
            {
                text: "Walk away",
                outcome: () => "🚶 You keep walking. The coin clinks behind you.",
            },
        ],
    },
    gold_rush: {
        icon: "🤑",
        name: "Gold Rush",
        desc: "gold rewards are doubled",
        intro: "Your shovel strikes something hard — a vein of gold glitters deep in the clay!",
        eligible: () => true,
        modifyRewards: (game, r) => ({ xp: r.xp, gold: r.gold * 2 }),
        choices: [
            {
                text: "Mine it carefully — gold rewards ×2 for 5 questions",
                outcome: (game) => {
                    game.startEvent("gold_rush");
                    return "🤑 Every answer sparkles with gold dust!";
                },
            },
            {
                text: "Grab a nugget and run — +15 gold right now",
                outcome: (game) => {
                    game.gainGold(15);
                    return "💰 A bird in the hand. The vein sinks away.";
                },
            },
        ],
    },
    brain_wave: {
        icon: "🧠",
        name: "Brain Wave",
        desc: "XP rewards are doubled",
        intro: "A surge of perfect clarity washes over you. For a moment, you understand everything.",
        eligible: () => true,
        modifyRewards: (game, r) => ({ xp: r.xp * 2, gold: r.gold }),
        choices: [
            {
                text: "Ride the wave — XP rewards ×2 for 5 questions",
                outcome: (game) => {
                    game.startEvent("brain_wave");
                    return "🧠 Your thoughts crackle with lightning!";
                },
            },
            {
                text: "Bottle it for later — gain a 🍯 Honey Jar",
                outcome: (game) => {
                    game.gainItem("honey_jar");
                    return "🍯 Clarity, preserved. Sip it when you need it.";
                },
            },
        ],
    },
    lucky_day: {
        icon: "🍀",
        name: "Lucky Day",
        desc: "one wrong answer is already gone",
        intro: "A four-leaf clover grows right out of the question pot. It hums with good fortune.",
        eligible: () => true,
        modifyChoices: (game, q, choices) => {
            const wrong = game.shuffled(
                choices.filter((c) => c.option !== q.correct_answer)
            )[0];
            return choices.filter((c) => c !== wrong);
        },
        choices: [
            {
                text: "Wear it — one wrong answer removed for 5 questions",
                outcome: (game) => {
                    game.startEvent("lucky_day");
                    return "🍀 Luck settles on your shoulders like pollen.";
                },
            },
            {
                text: "Sell it to a collector — +20 gold",
                outcome: (game) => {
                    game.gainGold(20);
                    return "💰 The collector cradles it like a jewel. Cha-ching.";
                },
            },
        ],
    },
    tea_break: {
        icon: "🍵",
        name: "Tea Break",
        desc: "correct answers also restore HP",
        intro: "A kettle whistles somewhere warm. A steaming cup of clay-pot tea slides across the table toward you. Rest a moment?",
        eligible: (game) => game.run.hp < game.run.maxHp, // only if hurt
        onCorrect: (game) => game.heal(2), // fires per correct while active
        choices: [
            {
                text: "Sip slowly — restore 2 HP per correct answer for 5 questions",
                outcome: (game) => {
                    game.startEvent("tea_break");
                    return "🍵 Warmth spreads through you. Steady now.";
                },
            },
            {
                text: "Gulp it down — restore 8 HP right now",
                outcome: (game) => {
                    game.heal(8);
                    return "🍵 Ahh — that hit the spot. Back to it!";
                },
            },
        ],
    },
    harvest: {
        icon: "🌾",
        name: "Harvest",
        desc: "XP and gold rewards ×1.5",
        intro: "The question fields are heavy with grain, swaying gold in the wind. Harvest time.",
        eligible: () => true,
        modifyRewards: (game, r) => ({
            xp: Math.round(r.xp * 1.5),
            gold: Math.round(r.gold * 1.5),
        }),
        choices: [
            {
                text: "Harvest steadily — rewards ×1.5 for 5 questions",
                outcome: (game) => {
                    game.startEvent("harvest");
                    return "🌾 Swish, swish. The bounty piles up.";
                },
            },
            {
                text: "Sell the whole crop now — +20 gold",
                outcome: (game) => {
                    game.gainGold(20);
                    return "💰 Sold at the gate. No blisters, no bounty.";
                },
            },
        ],
    },
    sudden_death: {
        icon: "💀",
        name: "Sudden Death",
        desc: "misses cost DOUBLE HP, but gold is doubled too",
        intro: "The room goes cold. Death himself sits across the table and proposes a wager, grinning.",
        eligible: (game) => game.run.hp >= 15, // only when you can take it
        modifyPenalty: (game, p) => ({ hp: p.hp * 2, xp: p.xp }),
        modifyRewards: (game, r) => ({ xp: r.xp, gold: r.gold * 2 }),
        choices: [
            {
                text: "Accept the wager — double HP loss AND double gold for 5 questions",
                outcome: (game) => {
                    game.startEvent("sudden_death");
                    return "💀 Death shuffles the questions personally. Good luck.";
                },
            },
            {
                text: "Refuse politely — pay 5 gold as tribute",
                outcome: (game) => {
                    game.loseGold(5);
                    return "🙏 Death sighs, takes the coins, and dissolves into mist.";
                },
            },
            {
                text: "Flip his hourglass — gamble: 50% +30 gold, 50% −4 HP",
                outcome: (game) => {
                    if (Math.random() < 0.5) {
                        game.gainGold(30);
                        return "⏳ Death laughs so hard he tips you. +30 gold!";
                    }
                    game.damage(4);
                    return "⏳ Time snaps back and bites. −4 HP. Rude.";
                },
            },
        ],
    },

    // ---------- gold-spending events (mid-run gold sinks) ----------
    traveling_merchant: {
        icon: "🧺",
        name: "Traveling Merchant",
        intro: "A merchant unrolls a woven blanket, laying out oddments that smell faintly of spice. \"Coin for wares, friend?\"",
        eligible: (game) => game.run.gold >= 15,
        choices: [
            {
                text: "Buy a surprise item (15 gold)",
                outcome: (game) => {
                    if (!game.spendGold(15))
                        return "🪙 You count your coins… not quite enough.";
                    const pool = Object.keys(ITEMS).filter(
                        (id) => !ITEMS[id].noShop
                    );
                    const id = game.pickFrom(pool);
                    game.gainItem(id);
                    return (
                        "🧺 The merchant wraps up a " +
                        ITEMS[id].icon +
                        " " +
                        ITEMS[id].name +
                        " for you!"
                    );
                },
            },
            {
                text: "Buy a hot meal — restore 10 HP (20 gold)",
                outcome: (game) => {
                    if (!game.spendGold(20))
                        return "🪙 You count your coins… not quite enough.";
                    game.heal(10);
                    return "🍲 Piping hot and restorative. +10 HP.";
                },
            },
            {
                text: "Browse and move on",
                outcome: () =>
                    "🚶 \"Suit yourself,\" the merchant shrugs, rolling up the blanket.",
            },
        ],
    },
    wishing_well: {
        icon: "🪙",
        name: "Wishing Well",
        intro: "A little clay well burbles in the corner, its water winking with tossed coins and half-forgotten wishes.",
        eligible: (game) => game.run.gold >= 20,
        choices: [
            {
                text: "Toss 20 gold and wish (50% chance: 45 gold back)",
                outcome: (game) => {
                    if (!game.spendGold(20))
                        return "🪙 Your pockets come up empty.";
                    if (Math.random() < 0.5) {
                        game.gainGold(45);
                        return "✨ Coins bubble back up — 45 gold! The well is generous today.";
                    }
                    return "💧 Ripples, then silence. The well keeps your coins.";
                },
            },
            {
                text: "Toss 10 gold for a flash of insight (+15 XP)",
                outcome: (game) => {
                    if (!game.spendGold(10))
                        return "🪙 Your pockets come up empty.";
                    game.gainXp(15);
                    return "🔮 Clarity ripples outward through you. +15 XP.";
                },
            },
            {
                text: "Save your coins",
                outcome: () =>
                    "🪙 You pocket your gold and make a silent wish instead.",
            },
        ],
    },
    dice_game: {
        icon: "🎲",
        name: "Back-Alley Dice",
        intro: "A hooded figure rattles a cup of clay dice in a shadowed doorway. \"One roll, friend. Double your bet… or lose the lot.\"",
        eligible: (game) => game.run.gold >= 15,
        choices: [
            {
                text: "Bet 15 gold (55% chance: win 30 back)",
                outcome: (game) => {
                    if (!game.spendGold(15))
                        return "🎲 The figure eyes your empty purse and turns away.";
                    if (Math.random() < 0.55) {
                        game.gainGold(30);
                        return "🎲 Lucky sevens! You rake in 30 gold.";
                    }
                    return "🎲 Snake eyes. The figure pockets your bet with a chuckle.";
                },
            },
            {
                text: "High roll — bet 30 gold (50% chance: win 60 back)",
                outcome: (game) => {
                    if (!game.spendGold(30))
                        return "🎲 Not enough on you for the high table.";
                    if (Math.random() < 0.5) {
                        game.gainGold(60);
                        return "🎲 A perfect roll — 60 gold clatters your way!";
                    }
                    return "🎲 The dice betray you. Gone in an instant.";
                },
            },
            {
                text: "Walk away clean",
                outcome: () =>
                    "🚶 Wise. The alley isn't kind to the greedy.",
            },
        ],
    },
};
