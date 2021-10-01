import { combineReducers } from "redux";
import { TickerActions } from "../Actions";
import { ReplaceTicker } from "../Actions/replaceTicker";

const tickerReducer = (
  state: TickerState = {
    toAdd: "SBER",
    toRemove: "",
    selectedTickers: ["SBER"],
  },
  action: TickerActions
) => {
  switch (action.type) {
    case "ADD_TICKER":
      return {
        selectedTickers: [...state.selectedTickers, action.payload],
        toRemove: "",
        toAdd: action.payload,
      };
    case "REMOVE_TICKER":
      return {
        selectedTickers: state.selectedTickers.filter(
          (id) => id !== action.payload
        ),
        toAdd: "",
        toRemove: action.payload,
      };
    case "REPLACE_TICKER":
      const {
        payload: { newTicker, oldTicker },
      } = action as ReplaceTicker;
      return {
        selectedTickers: [newTicker],
        toAdd: newTicker,
        toRemove: oldTicker,
      };
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
  selectedTickers: string[];
}

export interface RootState {
  ticker: TickerState;
}
