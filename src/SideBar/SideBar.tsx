import "./SideBar.scss";

import { SharesList } from "./SharesList";
import { CurrencyList } from "./CurrencyList";

export function SideBar() {
  // TODO: currencyList
  // TODO: indeciesList
  return (
    <div className="side-bar">
      <span>Tickers selection:</span>
      <SharesList />
      <CurrencyList />
    </div>
  );
}
