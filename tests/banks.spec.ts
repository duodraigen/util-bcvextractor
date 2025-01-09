import { getBanksTable, getBankFromTable, Banks } from "@";

describe("Testing specific bank values", () => {
	test("Expecting a valid buy value (number) from BBVA", async () => {
		const val = await getBankFromTable(Banks.bbva);
		expect(val[Banks.bbva].buy).not.toBeNaN();
	});

	test("Expecting a valid sell value (non zero number) from BNC", async () => {
		const val = await getBankFromTable(Banks.bnc);
		expect(val[Banks.bnc].sell).toBeGreaterThan(0.0);
	});

	test("Check if buy value is a floating point one from mercantil", async () => {
		const val = await getBankFromTable(Banks.merca);
		expect(Number.isInteger(val)).toBeFalsy();
	});

	test("Check the date from table when querying from a bank value", async () => {
		const val = await getBankFromTable(Banks.bbva);
		expect(val[Banks.bbva].published).not.toBeNull();
	});
});

describe("Testing Bank table values", () => {
	test("Expecting a valid buy value (number) from the <mercantil> key", async () => {
		const table = await getBanksTable();
		expect(table[Banks.merca].buy).not.toBeNaN();
	});

	test("Expecting a valid sell value (number) from the <other banks> key", async () => {
		const table = await getBanksTable();
		expect(table[Banks.other].sell).not.toBeNaN();
	});

	test("Expecting a floating point buy value from <banesco>", async () => {
		const table = await getBanksTable();
		expect(Number.isInteger(table[Banks.banes].buy)).toBeFalsy();
	});

	test("Expecting a real sell value value from <banesco>", async () => {
		const table = await getBanksTable();
		expect(table[Banks.banes].sell).toBeGreaterThan(0.0);
	});
});
