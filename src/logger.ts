import pino from "pino";

const transport = pino.transport({
	targets: [
		{
			target: "pino/file",
			options: { destination: "./logs/" + new Date().toISOString() + ".log" },
			level: "trace"
		},
		{
			target: "pino/file",
			options: {},
			level: "trace",
		}
	]
})

const logger = pino(transport);

export default logger;
