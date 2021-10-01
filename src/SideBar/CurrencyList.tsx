import "./CurrencyList.scss";

import { useEffect, useState } from "react";
import { CurrencyInfo } from "./types";
import { loadCurrenciesList, parseSecName } from "./utils";

export function CurrencyList() {
  const [currencyList, setCurrencyList] = useState([] as CurrencyInfo[]);

  useEffect(() => {
    loadCurrenciesList().then((result) => setCurrencyList(result));
  }, []);

  return (
    <div className="currency-list">
      <span>Forex:</span>
      {currencyList.map((currency) => (
        <div className="currency-list__element" key={currency.secId}>
          <span>{parseSecName(currency.secName)} </span>
          <span>{currency.prevPrice}</span>
        </div>
      ))}
    </div>
  );
}
