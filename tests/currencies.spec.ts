import { Currencies, getFromCurrency } from "@";

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
})