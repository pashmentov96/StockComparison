export interface RemoveTicker {
  type: string;
  payload: string;
}

export const removeTicker = (ticker: string) => {
  return {
    type: "REMOVE_TICKER",
    payload: ticker,
  } as RemoveTicker;
};
