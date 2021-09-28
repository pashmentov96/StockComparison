import { ChartData } from "../types";
import { dateToString } from "./dateToString";
import { stringToDate } from "./stringToDate";

export function loadChartData(security: string, start: number) {
  const tillDate = new Date();
  const till = dateToString(tillDate);

  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 6);
  const from = dateToString(fromDate);

  const url = `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${security}.xml?from=${from}&till=${till}&start=${start}`;

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

function parseXML(xmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "text/xml");
  const rows = doc.documentElement.getElementsByTagName("rows")[0];
  const tradeData: ChartData = [];
  rows.childNodes.forEach((rowNode) => {
    if (rowNode.nodeName === "row") {
      const el = rowNode as Element;
      tradeData.push({
        date: stringToDate(el.getAttribute("TRADEDATE") as string),
        value: Number.parseFloat(el.getAttribute("LEGALCLOSEPRICE") as string),
      });
    }
  });
  return tradeData;
}
