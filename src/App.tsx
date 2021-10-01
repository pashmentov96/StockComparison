import "./App.scss";

import { StockChart } from "./Chart/StockChart";
import { SideBar } from "./SideBar/SideBar";

function App() {
  return (
    <div className="app">
      <StockChart />
      <SideBar />
    </div>
  );
}

export default App;
