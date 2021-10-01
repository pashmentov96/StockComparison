export interface ShareInfo {
  secId: string;
  shortName: string;
  listLevel: number;
}

export const shareColumns = ["SECID", "SHORTNAME", "LISTLEVEL"];

export interface CurrencyInfo {
  secId: string;
  secName: string;
  prevPrice: number;
}

export const currencyColumns = ["SECID", "SECNAME", "PREVPRICE"];
