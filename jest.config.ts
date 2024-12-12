import type { Config } from "jest";

const testConf: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@$": "<rootDir>",
		"^@lib/(.*)$": "<rootDir>/lib/$1",
	},
};

export default testConf;
