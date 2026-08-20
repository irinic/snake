import { MoveDirection } from "../common/types";
import { GameEvent } from "../common/events";

export interface GameInputResult {
    direction: MoveDirection;
}

export const gameInputEvent = new GameEvent<GameInputResult>();