import {ColorResolvable} from "discord.js";

interface ColorsDict {
	[key:string]: ColorResolvable;
}
const colors: ColorsDict = {
	red: "#DE1222",
	orange: "#F69321",
	yellow: "#DED012",
	green: "#00F514",
	purple: "#861FFF",
};

export {colors};
