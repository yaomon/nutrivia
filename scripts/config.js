// All game tuning lives here. Change numbers, not engine code.
const CONFIG = {
    // Run / health
    maxHp: 20,
    hpLossOnMiss: 5,

    // XP & leveling
    xpBase: 10, // xp per correct answer
    xpStreakBonusCap: 5, // +1 xp per streak point, capped
    xpLossOnMiss: 3,
    xpForLevel: (level) => 30 + (level - 1) * 15,

    // speed bonus: answer fast, earn extra XP
    speedBonus: (seconds) => {
        if (seconds <= 5) return { xp: 4, label: "⚡ FAST!" };
        if (seconds <= 10) return { xp: 2, label: "⚡ quick" };
        return null;
    },

    // Gold
    goldBase: 5, // gold per correct answer
    goldStreakBonusCap: 10, // +1 gold per streak point, capped

    // Events
    eventEvery: 8, // answered questions between event rolls
    eventDuration: 5, // questions an event lasts

    // Rewards
    levelUpChoices: 3, // cards offered on level up
    healAmount: 10,
    goldRewardAmount: 25,

    // Spaced repetition (intervals are counted in questions answered,
    // not days — a run-based game has no fixed daily cadence)
    srFirstInterval: 4, // first correct: see it again after ~4 questions
    srEase: 2.2, // each later correct multiplies the interval
    srWrongInterval: 3, // a miss comes back quickly
    reviewChance: 0.35, // chance a due review is served over fresh material

    // Run setup
    startingItems: { fifty_fifty: 1 },
};
