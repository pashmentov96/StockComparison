import { combineReducers } from "redux";
import { tickerReducer, TickerState } from "./tickerReducer";

export const rootReducer = combineReducers({
  ticker: tickerReducer,
});

export interface RootState {
  ticker: TickerState;
}
