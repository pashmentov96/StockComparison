export interface ReplaceTicker {
  type: string;
  payload: {
    oldTicker: string;
    newTicker: string;
  };
}

export const replaceTicker = (oldTicker: string, newTicker: string) => {
  return {
    type: "REPLACE_TICKER",
    payload: { oldTicker, newTicker },
  } as ReplaceTicker;
}
