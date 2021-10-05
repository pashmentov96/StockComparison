import "./SharesList.scss";

import { ShareInfo } from "./types";
import { useEffect, useState } from "react";
import { loadSharesList, searchInSharesList } from "./utils";
import { List, ListRowProps, AutoSizer } from "react-virtualized";
import { SecurityElement } from "./SecurityElement";
import { NothingFoundPlaceholder } from "./NothingFoundPlaceholder";
import { SearchInput } from "./SearchInput";

const SHARES_LIST_CONTAINER_CLASS = "shares-list-container";
const SHARES_LIST = "shares-list";
const SHARES_LIST_NAME = `${SHARES_LIST_CONTAINER_CLASS}__name`;

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
    <div className={SHARES_LIST_CONTAINER_CLASS}>
      <span className={SHARES_LIST_NAME}>Stocks</span>
      <SearchInput
        placeholder="Search share by name"
        value={inputValue}
        onChangeValue={(value: string) => setInputValue(value)}
      />
      <div className={SHARES_LIST}>
        {inputValue !== "" && sharesListWhileSearch.length === 0 ? (
          <NothingFoundPlaceholder />
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={sharesListWhileSearch.length}
                rowHeight={25}
                rowRenderer={rowRenderer}
                overscanRowCount={15}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
}
