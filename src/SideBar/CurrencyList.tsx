import "./CurrencyList.scss";

import { useEffect, useState } from "react";
import { CurrencyInfo } from "./types";
import { loadCurrenciesList, parseSecName } from "./utils";
import { SecurityElement } from "./SecurityElement";

const CURRENCY_LIST_CLASS = "currency-list";
const CURRENCY_LIST_NAME_CLASS = `${CURRENCY_LIST_CLASS}__name`;
const CURRENCY_LIST_ELEMENT = `${CURRENCY_LIST_CLASS}__element`;

export function CurrencyList() {
  const [currencyList, setCurrencyList] = useState([] as CurrencyInfo[]);

  useEffect(() => {
    loadCurrenciesList().then((result) => setCurrencyList(result));
  }, []);

  return (
    <div className={CURRENCY_LIST_CLASS}>
      <span className={CURRENCY_LIST_NAME_CLASS}>Forex:</span>
      {currencyList.map((currency) => {
        const { secId, prevPrice, secName } = currency;
        return (
          <div className={CURRENCY_LIST_ELEMENT} key={secId}>
            <SecurityElement
              name={parseSecName(secName)}
              price={prevPrice}
              secId={secId}
            />
          </div>
        );
      })}
    </div>
  );
}
