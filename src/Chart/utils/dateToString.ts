/** Return string with format YYYY-MM-DD */
export function dateToString(date: Date) {
  const year = date.getFullYear();
  const month = numberToStringWithNDigit(date.getMonth() + 1, 2);
  const day = numberToStringWithNDigit(date.getDate(), 2);
  return `${year}-${month}-${day}`;
}

function numberToStringWithNDigit(value: number, N: number) {
  const result = value.toString();
  return "0".repeat(N - result.length) + result;
}