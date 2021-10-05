import { currencySecuritiesList } from "../../SideBar/utils";
import { SeriesData } from "../types";
import { dateToString } from "./dateToString";
import { stringToDate } from "./stringToDate";

export function loadSeriesData(security: string, start: number) {
  const url = createUrlForLoadSeriesData(security, start);

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error " + response.status);
      }
    })
    .then((xmlText) => parseXML(xmlText));
}

function createUrlForLoadSeriesData(security: string, start: number) {
  const tillDate = new Date();
  const till = dateToString(tillDate);

  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 6);
  const from = dateToString(fromDate);

  const [engine, market, board] = currencySecuritiesList.includes(security)
    ? ["currency", "selt", "CETS"]
    : ["stock", "shares", "TQBR"];

  return `https://iss.moex.com/iss/history/engines/${engine}/markets/${market}/boards/${board}/securities/${security}.xml?from=${from}&till=${till}&start=${start}`;
}

function parseXML(xmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "text/xml");
  const rows = doc.documentElement.getElementsByTagName("rows")[0];
  const tradeData: SeriesData = [];
  let prevPrice = 0;
  rows.childNodes.forEach((rowNode) => {
    if (rowNode.nodeName === "row") {
      const el = rowNode as Element;
      const price =
        Number.parseFloat(el.getAttribute("CLOSE") as string) || prevPrice;
      tradeData.push({
        date: stringToDate(el.getAttribute("TRADEDATE") as string),
        value: price,
      });
      prevPrice = price;
    }
  });
  // there can be gaps in the beginning of the data
  if (tradeData.length > 0 && tradeData[0].value === 0) {
    const newValue = tradeData.find((el) => el.value > 0)?.value || 0;
    return tradeData.map((el) =>
      el.value === 0 ? { date: el.date, value: newValue } : el
    );
  }
  return tradeData;
}
