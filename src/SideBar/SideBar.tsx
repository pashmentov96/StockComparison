import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentTicker } from "../Actions";
import "./SideBar.scss";

export function SideBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="side-bar">
      <span>Ticker selection:</span>
      <div className="input-wrapper">
        <input
          placeholder={"SBER"}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={() => dispatch(changeCurrentTicker(inputValue))}>
          Show
        </button>
        <span></span>
      </div>
    </div>
  );
}
