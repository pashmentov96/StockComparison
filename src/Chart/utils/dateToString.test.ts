import { dateToString } from "./dateToString";

test("Correct transformation date to string in format YYYY-MM-DD", () => {
  const firstDate = new Date(2021, 9, 8);
  const secondDate = new Date(2020, 1, 29);
  expect(dateToString(firstDate)).toEqual("2021-10-08");
  expect(dateToString(secondDate)).toEqual("2020-02-29");
});