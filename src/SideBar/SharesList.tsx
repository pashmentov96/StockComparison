import "./SharesList.scss";

import { SecurityInfo } from "./types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicker, removeTicker, replaceTicker } from "../Actions";
import { loadSecuritiesList, searchInSharesList } from "./utils";
import { List, ListRowProps, AutoSizer } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { RootState } from "../Reducers";

export function SharesList() {
  const [inputValue, setInputValue] = useState("");
  const [sharesList, setSharesList] = useState([] as SecurityInfo[]);
  const selectedTickers = useSelector((state: RootState) => state.ticker.selectedTickers);

  const dispatch = useDispatch();

  useEffect(() => {
    loadSecuritiesList("stock", "shares", "TQBR").then((result) =>
      setSharesList(result)
    );
  }, []);

  const onShareClick = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (selectedTickers.length === 1 && !selectedTickers.includes(secId)) {
      const oldTicker = Array.from(selectedTickers)[0];
      dispatch(replaceTicker(oldTicker, secId))
      setInputValue("");
    }
  };

  const onRemoveShareFromCompare = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (selectedTickers.length > 1) {
      dispatch(removeTicker(secId));
    }
  };

  const onAddShareToCompare = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
  
    dispatch(addTicker(secId));
    setInputValue("");
  };

  const sharesListWhileSearch = searchInSharesList(sharesList, inputValue);
  const rowRenderer = ({ index, style }: ListRowProps) => {
    const { secId, shortName } = sharesListWhileSearch[index];
    const isSelected = selectedTickers.includes(secId);
    const className = classNames("shares-list__element", {
      ["shares-list__element--selected"]: isSelected,
    });
    return (
      <div key={secId} style={style}>
        <div className={className} onClick={onShareClick(secId)}>
          <span>{shortName}</span>
          <button className="shares-list__action-icon" onClick={isSelected ? onRemoveShareFromCompare(secId) : onAddShareToCompare(secId)}>
            <FontAwesomeIcon icon={isSelected ? faTimesCircle : faCheckCircle} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="shares-list-wrapper">
      <div className="search-input-wrapper">
        <input
          placeholder={"Search share"}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="search-input"
        />
        <button className="search-input-wrapper__reset">
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => setInputValue("")}
          />
        </button>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={sharesListWhileSearch.length}
            rowHeight={25}
            rowRenderer={rowRenderer}
            className="shares-list"
          />
        )}
      </AutoSizer>
    </div>
  );
}
