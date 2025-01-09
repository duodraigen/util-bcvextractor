import type { Currencies, Banks } from "@lib/enums";

/**
 * Value obtained from bank list usd table
 * it only supports the current usd prices
 * @property {number} buy - usd buy value in bolivars price of the bank (float)
 * @property {number} sell - usd sell value in bolivars price of the bank (float)
 * @property {string} published - date of publish update
 */
export type USDInfo = {
	published: string;
	sell: number;
	buy: number;
};

export type CurrencyTable = Record<Currencies, number>;
export type BankTable = Record<string, USDInfo>;
export type BankInfo = Record<Banks, USDInfo>;
