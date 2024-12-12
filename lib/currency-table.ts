import axios from "axios";
import { parse } from "node-html-parser";
import type { Currencies } from "@lib/enums";
import { REQ_AGENT, CURRENCIES_SRC } from "@lib/config";

/**
 * Get the value in bolivars of a requested currency
 * @param currency { Currencies } - Which currency is the requested (see **Currencies** enum)
 * @returns number | NaN
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
