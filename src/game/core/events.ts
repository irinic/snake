import { Tile } from "../common/types";
import { GAME_STATUS_END, GAME_STATUS_PLAYING, GAME_STATUS_STARTING } from "../common/constants";
import { GameEvent } from "../common/events";

export interface GameStateUpdate {
    state: {
        snake: readonly Tile[];
        food: Tile;
        status: typeof GAME_STATUS_STARTING | typeof GAME_STATUS_PLAYING | typeof GAME_STATUS_END;
    };
    addedTile?: Tile;
    removedTile?: Tile;
}

export const gameStateEvent = new GameEvent<GameStateUpdate>();

export const gameEndEvent = new GameEvent<void>();