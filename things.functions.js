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

// formatting durations - seconds to a string. elegant answer mostly stolen from https://stackoverflow.com/a/52387803/10873246.
exports.sToDhms = function sToDhms(seconds){

    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = (seconds % 60).toFixed(2);

    const dStr = d > 0 ? d + "d " : "";
    const hStr = h > 0 | d > 0 ? h + "h " : "";
    const mStr = m > 0 | d > 0 | h > 0 ? m + "m " : "";
    const sStr = s > 0 | d > 0 | h > 0 | m > 0 ? s + "s" : "";

    return dStr + hStr + mStr + sStr;
};