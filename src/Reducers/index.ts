import { combineReducers } from "redux";
import { TickerActions } from "../Actions";
import { ReplaceTicker } from "../Actions/replaceTicker";

const tickerReducer = (
  state: TickerState = { toAdd: "SBER", toRemove: "", selectedTickers: new Set(["SBER"]) },
  action: TickerActions
) => {
  const newSelectedTickers = state.selectedTickers;
  switch (action.type) {
    case "ADD_TICKER":
      newSelectedTickers.add(action.payload as string);
      return { selectedTickers: newSelectedTickers, toRemove: "", toAdd: action.payload };
    case "REMOVE_TICKER":
      newSelectedTickers.delete(action.payload as string);
      return { selectedTickers: newSelectedTickers, toAdd: "", toRemove: action.payload };
    case "REPLACE_TICKER":
      const { payload: { newTicker, oldTicker } } = action as ReplaceTicker;
      newSelectedTickers.delete(oldTicker);
      newSelectedTickers.add(newTicker);
      return { selectedTickers: newSelectedTickers, toAdd: newTicker, toRemove: oldTicker };
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
  selectedTickers: Set<string>;
}

export interface RootState {
  ticker: TickerState;
}
