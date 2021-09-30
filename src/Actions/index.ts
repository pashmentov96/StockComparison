export interface AddTicker {
  type: string;
  payload: string;
}

export interface RemoveTicker {
  type: string;
  payload: string;
}

export const addTicker = (newValue: string) => {
  return {
    type: "ADD_TICKER",
    payload: newValue,
  } as AddTicker;
};

export const removeTicker = (ticker: string) => {
  return {
    type: "REMOVE_TICKER",
    payload: ticker,
  };
};
