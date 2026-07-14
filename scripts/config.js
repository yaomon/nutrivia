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

    // Run setup
    startingItems: { fifty_fifty: 1 },
};
