# Util BCV Currency Checker
Utility to get the currency values like usd in bolivars which presents an alternative to visiting the central bank of venezuela web just for getting the USD dollar value (which is the most commonly use case of the page honestly). Additionally allows to get the usd buy/sell values per bank (supported ones which can be seen below)

This kind of strategy allows to get the value directly without entering the page constantly only to get currency values like the dollar or euro and, in fact, using this value with commercial transactions or as a service to update product commercial values based on the dollar value

## How it works?
The scrapping method is done using [node-html-parser](https://www.npmjs.com/package/node-html-parser?activeTab=readme) and the html tag id/tag name disposed on the source pages:

- **Getting EUR/USD/YEN etc**: the page actually uses a `<div id="<currency>">` tag to store every currency to their respective name, which allows to get the concrete element and sanitize it.

## Usage
**To get a currency value from currencies table**
```typescript 
await getFromCurrency(Currencies.<SupportedCurrency>).then((data) => {console.log(data)})
```

**To get all currency values**
```typescript 
await getCurrencyTable().then((data) => {console.log(data)})
```

**`NEW` To get a USD information from a supported bank**
```typescript
await getBankFromTable(Banks.<SupportedBank>).then((data) => {console.log(data)})
```

**`NEW` To get a USD information from all supported banks**
```typescript
await getBanksTable().then((data) => {console.log(data)})
```

## Supported Currencies
```typescript
enum Currencies {
	usd = "dolar",
	rub = "rublo",
	try = "lira",
	eur = "euro",
	yen = "yuan",
}
```

## Supported Banks
```typescript
enum Banks {
	bnc = "Banco Nacional de Crédito BNC",
	bbva = "BBVA Provincial",
	other = "Otras Instituciones",
	merca = "Banco Mercantil",
	banes = "Banesco",
}
```

## Examples
```typescript
// Get yen value in bolivars
const yenPrice = await getFromCurrency(Currencies.yen).then((val) => val)
console.log(yenPrice)
```

```typescript
// Get buy value of USD from banesco bank in bolivars
const banescoBuy = await getBankFromTable(Banks.banes).then((val) => val[Banks.banes].buy)
console.log(banescoBuy)
```

```typescript
// Get all currencies
const table = await getCurrencyTable().then((val) => val)
console.log(table)
```

```typescript
// Get all banks
const table = await getBanksTable().then((val) => val)
console.log(table)
```

## Running tests
See [Tests Readme](tests/README.md) to get information about running and writing tests

## What about the beta version?
**util-bcv-currency** will be archived/deleted due some issues with dependencies and a bunch of unnecessary branches which i am lazy to debug personally. Additionally, there are improvements to the api and naming conventions i applied here:

- **Request 001**: Used path aliases to improve imports, suggested by [@luiseyer](https://github.com/luiseyer)

- **Request 002**: Changed naming conventions to improve simplicity

- **Request 003**: Transpiled with tsc to get javascript support

- **Performance 001**: Changed `cheerio` dependency by `node-html-parser`

- **Performance 002**: Removed `module-alias` package and added patch aliases support to export javascript correctly due resolution issues
