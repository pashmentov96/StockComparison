import { SecurityInfo } from "./types";

// engine: stock, market: shares, board: TQBR
// engine: stock, market: index, board: SNDX
// engine: stock, market: shares, board: TQTF, TQTD
// engine: currency, market: selt, board: CETS
export function loadSecuritiesList(
  engine: string,
  market: string,
  board: string
) {
  const url = `https://iss.moex.com/iss/engines/${engine}/markets/${market}/boards/${board}/securities.json?iss.meta=off&iss.only=securities&securities.columns=SECID,SHORTNAME,LISTLEVEL`;
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error " + response.status);
      }
    })
    .then((json) => extractDataFromJSON(json));
}

export function searchInSharesList(
  sharesList: SecurityInfo[],
  searchString: string
) {
  if (searchString === "") {
    return sharesList;
  }
  return sharesList.filter((share) =>
    share.shortName.toLowerCase().startsWith(searchString.toLowerCase())
  );
}

function extractDataFromJSON(json: any) {
  const data: SecurityInfo[] = [];
  json.securities.data.forEach((sec: any) =>
    data.push({
      secId: sec[0],
      shortName: sec[1],
      listLevel: sec[2],
    })
  );
  console.log(data);
  return data;
}
