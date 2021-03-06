import {
  ShareInfo,
  CurrencyInfo,
  shareColumns,
  currencyColumns,
} from "./types";

export function loadSharesList() {
  const elementToSecurityInfo = (sec: any) =>
    ({
      secId: sec[0],
      shortName: sec[1],
      listLevel: sec[2],
    } as ShareInfo);

  return loadSecuritiesList<ShareInfo>(
    "stock",
    "shares",
    "TQBR",
    shareColumns,
    elementToSecurityInfo
  );
}

export const currencySecuritiesList = [
  "USD000000TOD",
  "EUR_RUB__TOD",
  "EURUSD000TOD",
  "GBPRUB_TOD",
  "JPYRUB_TOD",
];;

export function loadCurrenciesList() {
  const elementToSecurityInfo = (sec: any) =>
    ({
      secId: sec[0],
      secName: sec[1],
      prevPrice: sec[2],
    } as CurrencyInfo);

  return loadSecuritiesList<CurrencyInfo>(
    "currency",
    "selt",
    "CETS",
    currencyColumns,
    elementToSecurityInfo,
    currencySecuritiesList
  );
}

// engine: stock, market: shares, board: TQBR
// engine: stock, market: index, board: SNDX
// engine: stock, market: shares, board: TQTF, TQTD
// engine: currency, market: selt, board: CETS
function loadSecuritiesList<T>(
  engine: string,
  market: string,
  board: string,
  securititiesColumns: string[],
  elementToSecurityInfo: (sec: any) => T,
  securitiesList?: string[]
) {
  const params = new URLSearchParams();
  params.append("iss.meta", "off");
  params.append("iss.only", "securities");
  params.append("securities.columns", securititiesColumns.join(","));
  if (securitiesList) {
    params.append("securities", securitiesList.join(","));
  }

  const baseUrl = `https://iss.moex.com/iss/engines/${engine}/markets/${market}/boards/${board}/securities.json`;
  const url = `${baseUrl}?${params}`;

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error " + response.status);
      }
    })
    .then((json) => extractDataFromJSON(json, elementToSecurityInfo));
}

export function searchInSharesList(
  sharesList: ShareInfo[],
  searchString: string
) {
  if (searchString === "") {
    return sharesList;
  }
  return sharesList.filter((share) =>
    share.shortName.toLowerCase().startsWith(searchString.toLowerCase())
  );
}

// example: EUR/USD_TOD - EUR/USD
export function parseSecName(secName: string) {
  return secName.split("-")[1];
}

function extractDataFromJSON<T>(
  json: any,
  elementToSecurityInfo: (sec: any) => T
) {
  const data: T[] = [];
  json.securities.data.forEach((sec: any) =>
    data.push(elementToSecurityInfo(sec))
  );
  return data;
}
