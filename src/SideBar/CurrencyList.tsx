import "./CurrencyList.scss";

import { useEffect, useState } from "react";
import { CurrencyInfo } from "./types";
import { loadCurrenciesList, parseSecName } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";

export function CurrencyList() {
  const [currencyList, setCurrencyList] = useState([] as CurrencyInfo[]);

  useEffect(() => {
    loadCurrenciesList().then((result) => setCurrencyList(result));
  }, []);

  return (
    <div className="currency-list">
      <span className="currency-list__name">Forex:</span>
      {currencyList.map((currency) => (
        <div className="currency-list__element" key={currency.secId}>
          <span className="currency-list__element-name">
            {parseSecName(currency.secName)}{" "}
          </span>
          <span className="currency-list__element-price">
            {currency.prevPrice}
          </span>
          <button className="currency-list__element-action-icon">
            <FontAwesomeIcon
              icon={faCheckCircle}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
