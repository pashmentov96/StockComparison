import "./SharesList.scss";

import { ShareInfo } from "./types";
import { useEffect, useState } from "react";
import { loadSharesList, searchInSharesList } from "./utils";
import { List, ListRowProps, AutoSizer } from "react-virtualized";
import { SecurityElement } from "./SecurityElement";
import { NothingFoundPlaceholder } from "./NothingFoundPlaceholder";
import { SearchInput } from "./SearchInput";
import { SwitchButton } from "./SwitchButton";
import { RootState } from "../Reducers";
import { useSelector } from "react-redux";

const SHARES_LIST_CONTAINER_CLASS = "shares-list-container";
const SHARES_LIST_NAME_CLASS = `${SHARES_LIST_CONTAINER_CLASS}__name`;
const SHARES_LIST_HEADER_CLASS = `${SHARES_LIST_CONTAINER_CLASS}__header`;
const SHARES_LIST_CLASS = "shares-list";

export function SharesList() {
  const [inputValue, setInputValue] = useState("");
  const [sharesList, setSharesList] = useState([] as ShareInfo[]);
  const [toggleValue, setToggleValue] = useState(false);

  const selectedTickers = useSelector(
    (state: RootState) => state.ticker.selectedTickers
  );

  useEffect(() => {
    loadSharesList().then((result) => setSharesList(result));
  }, []);

  const selectedSharesList = toggleValue
    ? sharesList.filter((share) => selectedTickers.includes(share.secId))
    : sharesList;
  const sharesListWhileSearch = searchInSharesList(
    selectedSharesList,
    inputValue
  );
  const rowRenderer = ({ index, style }: ListRowProps) => {
    const { secId, shortName } = sharesListWhileSearch[index];
    return (
      <div key={secId} style={style}>
        <SecurityElement name={shortName} secId={secId} />
      </div>
    );
  };

  const isNothingFound =
    (inputValue !== "" && sharesListWhileSearch.length === 0) ||
    (toggleValue && selectedSharesList.length === 0);

  return (
    <div className={SHARES_LIST_CONTAINER_CLASS}>
      <div className={SHARES_LIST_HEADER_CLASS}>
        <span className={SHARES_LIST_NAME_CLASS}>Stocks</span>
        <SwitchButton
          value={toggleValue}
          title={toggleValue ? "Show all stocks" : "Show only selected stocks"}
          onChangeValue={(value: boolean) => setToggleValue(value)}
        />
      </div>
      <SearchInput
        placeholder="Search share by name"
        value={inputValue}
        onChangeValue={(value: string) => setInputValue(value)}
      />
      <div className={SHARES_LIST_CLASS}>
        {isNothingFound ? (
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
