import { Currencies, getFromCurrency, getCurrencyTable } from "@";

describe("Testing currency table data scrapping", () => {
	test("Expecting a number", async () => {
		const val = await getFromCurrency(Currencies.usd);
		expect(val).not.toBe(Number.NaN);
	});

	test("Expecting a real value, not zero", async () => {
		const val = await getFromCurrency(Currencies.eur);
		expect(val).toBeGreaterThan(0.0);
	});

	test("Check if number is a floating point one", async () => {
		const val = await getFromCurrency(Currencies.yen);
		expect(Number.isInteger(val)).not.toBe(true);
	});
});

describe("Testing getCurrencyTable data scrapping", () => {
	test("Expecting a CurrencyTable", async () => {
		const result = await getCurrencyTable();
		for (const currency of Object.values(Currencies)) {
			expect(result).toHaveProperty(currency);
		}
	});

	test("Expecting numbers", async () => {
		const result = await getCurrencyTable();
		for (const currency of Object.values(result)) {
			expect(currency).not.toBe(Number.NaN);
		}
	});

	test("Expecting real values, not zeros", async () => {
		const result = await getCurrencyTable();
		for (const currency of Object.values(result)) {
			expect(currency).toBeGreaterThan(0.0);
		}
	});
});
