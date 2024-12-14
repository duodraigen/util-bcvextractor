import type { Currencies } from "@lib/enums";

/**
 * Value obtained from bank list usd table
 * it only supports the actual usd prices
 *
 * @property {number} buy - usd buy value in bolivars price of the bank (float)
 * @property {number} sell - usd sell value in bolivars price of the bank (float)
 * @property {string} bankName - bank name
 */
export type USDBankInfo = {
	bankName: string;
	sell: number;
	buy: number;
};

export type CurrencyTable = Record<Currencies, number>;
