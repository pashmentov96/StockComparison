import { AddTicker } from "./addTicker";
import { RemoveTicker } from "./removeTicker";
import { ReplaceTicker } from "./replaceTicker";

export { addTicker } from "./addTicker";
export { removeTicker } from "./removeTicker";
export { replaceTicker } from "./replaceTicker";

export type TickerActions = AddTicker | RemoveTicker | ReplaceTicker;
