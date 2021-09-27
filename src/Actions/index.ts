export interface ChangeCurrentTicker {
  type: string;
  payload: string;
}

export const changeCurrentTicker = (newValue: string) => {
  return {
    type: "CHANGE_CURRENT_TICKER",
    payload: newValue,
  } as ChangeCurrentTicker;
}