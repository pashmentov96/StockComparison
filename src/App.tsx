import { useSelector } from "react-redux";
import "./App.scss";
import { StockChart } from "./Chart/StockChart";
import { RootState } from "./Reducers";
import { SideBar } from "./SideBar/SideBar";

function App() {
  const security = useSelector((state: RootState) => state.ticker);
  return (
    <div className="app">
      <StockChart security={security} />
      <SideBar />
    </div>
  );
}

export default App;
