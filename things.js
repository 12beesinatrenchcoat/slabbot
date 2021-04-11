// misc. things that would be used in more than one thing.

// see also: https://www.desmos.com/calculator/kcrt4evjgg
exports.expNeededForLevel = level => 1024 * (level ** 1.3) + (256 *((level-1) / 8) ** 1.8) || 0;

// creating an exp bar. (takes in a number >1 as percentage!)
exports.createExpBar = function createExpBar(percentage, maxLength) {
    let output = "";
    const fillCount = Math.floor(percentage / 100 * maxLength);

    for(let char = 0; char < maxLength; char++){

        if (char === 0) {
            output += "[";
        } else if (char < fillCount) {
            output += "|";
        } else if (char === maxLength - 1) {
            output += "]";
        } else {
            output += " ";
        }
    }

    return output;
};

// formatting numbers. here to make code just a bit more concise.
exports.fNum = function fNum(number, decimalPlaces){
    return number.toLocaleString("en-US", { minimumFractionDigits: decimalPlaces || 0, maximumFractionDigits: decimalPlaces || 0});
};