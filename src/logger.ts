import pino from "pino";
const fileName = "./logs/" + new Date().toISOString() + ".log";
const env = process.env.NODE_ENV || "prod";

const transport = pino.transport({
	targets: [
		{
			level: env === "dev" ? "trace" : "info",
			target: "pino-pretty",
			options: {colorize: true},
		},
		{
			level: env === "dev" ? "trace" : "debug",
			target: "pino/file",
			options: {destination: fileName},
		},
	],
});

const logger = pino({
	level: "trace",
}, transport);

export default logger;
