import "./CurrencyList.scss";

import { useEffect, useState } from "react";
import { CurrencyInfo } from "./types";
import { loadCurrenciesList, parseSecName } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducers";
import { addTicker, removeTicker, replaceTicker } from "../Actions";
import classNames from "classnames";

export function CurrencyList() {
  const [currencyList, setCurrencyList] = useState([] as CurrencyInfo[]);

  const selectedTickers = useSelector(
    (state: RootState) => state.ticker.selectedTickers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    loadCurrenciesList().then((result) => setCurrencyList(result));
  }, []);

  const onShareClick = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (selectedTickers.length === 1 && !selectedTickers.includes(secId)) {
      const oldTicker = Array.from(selectedTickers)[0];
      dispatch(replaceTicker(oldTicker, secId));
    }
  };

  const onRemoveShareFromCompare =
    (secId: string) => (event: React.MouseEvent) => {
      event.stopPropagation();

      if (selectedTickers.length > 1) {
        dispatch(removeTicker(secId));
      }
    };

  const onAddShareToCompare = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    dispatch(addTicker(secId));
  };

  return (
    <div className="currency-list">
      <span className="currency-list__name">Forex:</span>
      {currencyList.map((currency) => {
        const { secId, prevPrice, secName } = currency;
        const isSelected = selectedTickers.includes(secId);
        const className = classNames("currency-list__element", {
          ["currency-list__element--selected"]: isSelected,
        });
        return (
          <div className={className} key={secId} onClick={onShareClick(secId)}>
            <span className="currency-list__element-name">
              {parseSecName(secName)}
            </span>
            <span className="currency-list__element-price">
              {prevPrice}
            </span>
            <button 
              className="currency-list__element-action-icon"
              onClick={
                isSelected
                  ? onRemoveShareFromCompare(secId)
                  : onAddShareToCompare(secId)
              }
              title={isSelected ? "Remove from compare" : "Add to compare"}
            >
              <FontAwesomeIcon
                icon={isSelected ? faTimesCircle : faCheckCircle}
              />
            </button>
          </div>
      )})}
    </div>
  );
}
