/** return Date object of string with format YYYY-MM-DD */
export function stringToDate(str: string) {
  return new Date(Date.parse(str));
}