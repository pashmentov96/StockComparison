export interface AddTicker {
  type: string;
  payload: string;
}

export interface RemoveTicker {
  type: string;
  payload: string;
}

export interface ReplaceTicker {
  type: string;
  payload: {
    oldTicker: string;
    newTicker: string;
  };
}

export const addTicker = (ticker: string) => {
  return {
    type: "ADD_TICKER",
    payload: ticker,
  } as AddTicker;
};

export const removeTicker = (ticker: string) => {
  return {
    type: "REMOVE_TICKER",
    payload: ticker,
  };
};

export const replaceTicker = (oldTicker: string, newTicker: string) => {
  return {
    type: "REPLACE_TICKER",
    payload: { oldTicker, newTicker },
  };
}