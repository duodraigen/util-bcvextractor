import axios from "axios";
import { parse } from "node-html-parser";

import { CURRENCIES_SRC, REQ_AGENT } from "@lib/config";
import { Currencies } from "@lib/enums";
import type { CurrencyTable } from "@lib/types";
import { toFloat } from "@lib/utils";

/**
 * Get the value in bolivars of a requested currency
 * @param { Currencies } currency - Which currency is the requested (see **Currencies** enum)
 * @returns { Promise<number> | NaN } The value of requested currency
 */
export async function getFromCurrency(currency: Currencies): Promise<number> {
	try {
		return await axios
			.get(CURRENCIES_SRC, { httpsAgent: REQ_AGENT })
			.then(({ data }) =>
				toFloat(parse(data).getElementById(currency)?.innerText),
			);
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
			.then(({ data }) => {
				const docTree = parse(data);

				for (const currency of Object.values(Currencies)) {
					currencyTable[currency] = toFloat(
						docTree.getElementById(currency)?.innerText,
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
