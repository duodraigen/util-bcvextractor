import axios from "axios";
import { parse } from "node-html-parser";

import { Currencies } from "@lib/enums";
import type { CurrencyTable } from "@lib/types";
import { CURRENCIES_SRC, REQ_AGENT } from "@lib/config";

/**
 * Get the value in bolivars of a requested currency
 * @param { Currencies } currency - Which currency is the requested (see **Currencies** enum)
 * @returns { Promise<number> | NaN } The value of requested currency
 */
export async function getFromCurrency(currency: Currencies): Promise<number> {
	try {
		const result = await axios
			.get(CURRENCIES_SRC, { httpsAgent: REQ_AGENT })
			.then((document) => {
				const docTree = parse(document.data);
				const expression = docTree.getElementById(currency)
					?.innerText as string;
				const regexFilter = /([A-Z]|\s)/gim;

				return Number.parseFloat(
					expression.replace(regexFilter, "").replace(",", "."),
				);
			});
		return result;
	} catch (except) {
		console.error(except);
		return Number.NaN;
	}
}

/**
 * Gets the values in bolivars of all currencies
 * @returns { Promise<CurrencyTable> } A record with the supported banks
 */
export async function getCurrencyTable(): Promise<CurrencyTable> {
	const currencyTable = {} as CurrencyTable;

	try {
		return await axios
			.get(CURRENCIES_SRC, { httpsAgent: REQ_AGENT })
			.then((document) => {
				const docTree = parse(document.data);
				const regexFilter = /([A-Z]|\s)/gim;

				for (const currency of Object.values(Currencies)) {
					currencyTable[currency] = Number.parseFloat(
						(docTree.getElementById(currency)?.innerText as string)
							.replace(regexFilter, "")
							.replace(",", "."),
					);
				}

				return currencyTable;
			});
	} catch (except) {
		console.error(except);
		for (const currency of Object.values(Currencies)) {
			currencyTable[currency] = Number.NaN;
		}
		return currencyTable;
	}
}
