export interface AddTicker {
  type: string;
  payload: string;
}

export const addTicker = (ticker: string) => {
  return {
    type: "ADD_TICKER",
    payload: ticker,
  } as AddTicker;
};
