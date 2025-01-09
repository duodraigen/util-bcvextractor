import axios from "axios";
import { parse } from "node-html-parser";

import { BANKS_TABLE_SRC, FALLBACK_BANK_DATA, REQ_AGENT } from "@lib/config";
import type { BankInfo, BankTable } from "@lib/types";
import { toFloat, decodeRow } from "@lib/utils";
import { Banks } from "@lib/enums";

/**
 * Gets an information table about the USD price
 * for every supported bank in the platform
 * @returns { Promise<BankTable> } a record filled with every actual bank USD information
 */
export async function getBanksTable(): Promise<BankTable> {
	const bankTable = {} as BankTable;

	try {
		return await axios
			.get(BANKS_TABLE_SRC, { httpsAgent: REQ_AGENT })
			.then(({ data }) => {
				const docTree = parse(data);
				const rows = docTree.querySelector("tbody")?.childNodes;

				if (rows) {
					for (const row of rows) {
						const cells = decodeRow(row.innerText);
						bankTable[cells[1]] = {
							published: cells[0],
							buy: toFloat(cells[2]),
							sell: toFloat(cells[3]),
						};
					}
				}

				return bankTable;
			});
	} catch (except) {
		console.error(except);
		for (const info of Object.values(Banks)) {
			bankTable[info] = FALLBACK_BANK_DATA;
		}
		return bankTable;
	}
}

/**
 * Gets information from a specific bank about USD prices
 * @param { Banks } bank - reference bank to get USD prices
 * @returns { BankInfo } information based from the bank parameter
 */
export async function getBankFromTable(bank: Banks): Promise<BankInfo> {
	const bankInfo = {} as BankInfo;

	try {
		return await axios
			.get(BANKS_TABLE_SRC, { httpsAgent: REQ_AGENT })
			.then(({ data }) => {
				const docTree = parse(data);
				let row = docTree.querySelector("tbody > tr");

				while (row) {
					const cells = decodeRow(row.innerText);

					if (bank === cells[1]) {
						bankInfo[bank] = {
							published: cells[0],
							buy: toFloat(cells[2]),
							sell: toFloat(cells[3]),
						};
						break;
					}

					row = row.nextElementSibling;
				}

				return bankInfo;
			});
	} catch (except) {
		console.error(except);
		bankInfo[bank] = FALLBACK_BANK_DATA;
		return bankInfo;
	}
}
