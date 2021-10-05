import "./App.scss";

import { StockChart } from "./Chart/StockChart";
import { SideBar } from "./SideBar/SideBar";

const APP_CLASS = "app";

function App() {
  return (
    <div className={APP_CLASS}>
      <StockChart />
      <SideBar />
    </div>
  );
}

export default App;
