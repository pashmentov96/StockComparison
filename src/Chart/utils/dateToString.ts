/** Return string with format YYYY-MM-DD */
export function dateToString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}