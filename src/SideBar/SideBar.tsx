import "./SideBar.scss";

import { SharesList } from "./SharesList";
import { CurrencyList } from "./CurrencyList";

const SIDE_BAR_CLASS = "side-bar";
const SIDE_BAR_HEADER_CLASS = `${SIDE_BAR_CLASS}__header`;

export function SideBar() {
  // TODO: indeciesList
  return (
    <div className={SIDE_BAR_CLASS}>
      <span className={SIDE_BAR_HEADER_CLASS}>Tickers selection</span>
      <SharesList />
      <CurrencyList />
    </div>
  );
}
