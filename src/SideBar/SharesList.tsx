import "./SharesList.scss";

import { SecurityInfo } from "./types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentTicker } from "../Actions";
import { loadSecuritiesList } from "./utils";

export function SharesList() {
  const [inputValue, setInputValue] = useState("");
  const [sharesList, setSharesList] = useState([] as SecurityInfo[]);

  const dispatch = useDispatch();

  useEffect(() => {
    loadSecuritiesList("stock", "shares", "TQBR").then((result) =>
      setSharesList(result)
    );
  }, []);

  const onShareClick = (secId: string) => () => {
    dispatch(changeCurrentTicker(secId));
    if (secId !== "") {
      setInputValue(secId);
    }
  };

  return (
    <div className="shares-list">
      <div className="search-input-wrapper">
        <input
          placeholder={"Type ticker"}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="search-input"
        />
        <button onClick={() => dispatch(changeCurrentTicker(inputValue))}>
          Show
        </button>
      </div>
      <select className="select-share">
        <option key={"SELECT_ID"} onClick={onShareClick("")}>
          Choose share
        </option>
        {searchInShareList(sharesList, inputValue).map((share) => (
          <option key={share.secId} onClick={onShareClick(share.secId)}>
            {share.shortName}
          </option>
        ))}
      </select>
    </div>
  );
}

function searchInShareList(shareList: SecurityInfo[], searchString: string) {
  if (searchString === "") {
    return shareList;
  }
  return shareList.filter((share) =>
    share.shortName.toLowerCase().startsWith(searchString.toLowerCase())
  );
}
