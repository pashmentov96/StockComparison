import { TickerActions } from "../Actions";
import { ReplaceTicker } from "../Actions/replaceTicker";

const DEFAULT_TICKER = "SBER";

export const tickerReducer = (
  state: TickerState = {
    toAdd: DEFAULT_TICKER,
    toRemove: "",
    selectedTickers: [DEFAULT_TICKER],
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

export interface TickerState {
  toAdd: string;
  toRemove: string;
  selectedTickers: string[];
}
