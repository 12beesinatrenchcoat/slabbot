// misc. things that would be used in more than one thing.

// see also: https://www.desmos.com/calculator/kcrt4evjgg
exports.expNeededForLevel = level => 1024 * (level ** 1.3) + (256 *((level-1) / 8) ** 1.8) || 0;