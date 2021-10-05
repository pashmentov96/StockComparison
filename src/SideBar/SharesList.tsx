import "./SharesList.scss";

import { ShareInfo } from "./types";
import { useEffect, useState } from "react";
import { loadSharesList, searchInSharesList } from "./utils";
import { List, ListRowProps, AutoSizer } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faFrown,
} from "@fortawesome/free-regular-svg-icons";
import { SecurityElement } from "./SecurityElement";

export function SharesList() {
  const [inputValue, setInputValue] = useState("");
  const [sharesList, setSharesList] = useState([] as ShareInfo[]);

  useEffect(() => {
    loadSharesList().then((result) => setSharesList(result));
  }, []);

  const sharesListWhileSearch = searchInSharesList(sharesList, inputValue);
  const rowRenderer = ({ index, style }: ListRowProps) => {
    const { secId, shortName } = sharesListWhileSearch[index];
    return (
      <div key={secId} style={style}>
        <SecurityElement name={shortName} secId={secId} />
      </div>
    );
  };

  return (
    <div className="shares-list-container">
      <div className="search-input-wrapper">
        <input
          placeholder={"Search share by name"}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="search-input"
        />
        <button className="search-input-wrapper__reset">
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => setInputValue("")}
            title="Clear search"
          />
        </button>
      </div>
      <div className="shares-list-wrapper">
        {inputValue !== "" && sharesListWhileSearch.length === 0 ? (
          <div className="nothing-found-placeholder">
            <FontAwesomeIcon icon={faFrown} size={"2x"} />
            <span>Nothing found...</span>
          </div>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={sharesListWhileSearch.length}
                rowHeight={25}
                rowRenderer={rowRenderer}
                className="shares-list"
                overscanRowCount={15}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
}
