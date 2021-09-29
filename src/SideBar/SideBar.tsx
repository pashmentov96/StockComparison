import "./SideBar.scss";

import { SharesList } from "./SharesList";

export function SideBar() {
  // TODO: currencyList
  // TODO: indeciesList
  return (
    <div className="side-bar">
      <span>Ticker selection:</span>
      <SharesList />
    </div>
  );
}
