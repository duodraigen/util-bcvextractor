import { Agent } from "node:https";

/**
 * Internal issue solution - CANNOT_VERIFY_LEAF_SIGNATURE
 * use HTTPS::Agent to allow unauthorized requests instead modifying
 * the environment (axios)
 */
export const REQ_AGENT = new Agent({
	rejectUnauthorized: false,
});

/**
 * USDBankInfo default fallback data
 */
export const FALLBACK_BANK_DATA = {
	bankName: "",
	buy: Number.NaN,
	sell: Number.NaN,
};

export const CURRENCIES_SRC = "https://www.bcv.org.ve/";
export const BANKS_TABLE_SRC =
	"https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
