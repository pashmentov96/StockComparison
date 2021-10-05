import "./SideBar.scss";

import { SharesList } from "./SharesList";
import { CurrencyList } from "./CurrencyList";

const SIDE_BAR_CLASS = "side-bar";

export function SideBar() {
  // TODO: indeciesList
  return (
    <div className={SIDE_BAR_CLASS}>
      <span>Tickers selection:</span>
      <SharesList />
      <CurrencyList />
    </div>
  );
}
