/**
 * Converts the first match of a string that can contain a number to a floating number.
 * @param { string } str - The string to convert
 * @returns { number }
 */
export function toFloat(str?: string): number {
	if (!str) return Number.NaN;
	/**
	 *  Matches a float number with or without comma.
	 * @example
	 * FLOAT_REGEX.test('123') // => true
	 * FLOAT_REGEX.test('123.456') // => true
	 * FLOAT_REGEX.test('123,456') // => true
	 */
	const FLOAT_REGEX = /[0-9]+(?:\.|,)?[0-9]*/;
	const num = str.match(FLOAT_REGEX)?.[0];
	if (!num) return Number.NaN;
	return Number.parseFloat(num.replace(",", "."));
}
