/**
 * Kind delimitation prevents from getting typo issues
 * but for every new kind or deprecated one, we need to
 * modify this table
 */

/**
 * Every supported bank available
 * in the table of the data source
 */
export enum Banks {
	bnc = "Banco Nacional de Crédito BNC",
	bbva = "BBVA Provincial",
	other = "Otras Instituciones",
	merca = "Banco Mercantil",
	exter = "Banco Exterior",
	banes = "Banesco",
}

/**
 * Every kind of available currency
 * at the source
 */
export enum Currencies {
	usd = "dolar",
	rub = "rublo",
	try = "lira",
	eur = "euro",
	yen = "yuan",
}
