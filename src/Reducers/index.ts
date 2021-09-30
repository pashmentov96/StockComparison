import { combineReducers } from "redux";
import { AddTicker, RemoveTicker } from "../Actions";

export const tickerReducer = (
  state: TickerState = { toAdd: "SBER", toRemove: "" },
  action: AddTicker | RemoveTicker
) => {
  switch (action.type) {
    case "ADD_TICKER":
      return { toRemove: "", toAdd: action.payload };
    case "REMOVE_TICKER":
      return { toAdd: "", toRemove: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ticker: tickerReducer,
});

interface TickerState {
  toAdd: string;
  toRemove: string;
}

export interface RootState {
  ticker: TickerState;
}
