import { combineReducers } from "redux";
import { ChangeCurrentTicker } from "../Actions";

export const tickerReducer = (state: string = "SBER", action: ChangeCurrentTicker) => {
  switch (action.type) {
    case "CHANGE_CURRENT_TICKER":
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ticker: tickerReducer,
});

export interface RootState {
  ticker: string,
}