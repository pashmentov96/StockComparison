import "./SharesList.scss";

import { SecurityInfo } from "./types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentTicker } from "../Actions";
import { loadSecuritiesList, searchInSharesList } from "./utils";
import { List, ListRowProps, AutoSizer } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export function SharesList() {
  const [inputValue, setInputValue] = useState("");
  const [sharesList, setSharesList] = useState([] as SecurityInfo[]);

  const dispatch = useDispatch();

  useEffect(() => {
    loadSecuritiesList("stock", "shares", "TQBR").then((result) =>
      setSharesList(result)
    );
  }, []);

  const onShareClick = (secId: string) => () => {
    dispatch(changeCurrentTicker(secId));
    setInputValue("");
  };

  const sharesListWhileSearch = searchInSharesList(sharesList, inputValue);
  const rowRenderer = ({ index, style }: ListRowProps) => {
    const { secId, shortName } = sharesListWhileSearch[index];
    return (
      <div key={secId} style={style}>
        <div className="shares-list__element" onClick={onShareClick(secId)}>
          {shortName}
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
