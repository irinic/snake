import { MOVE_DIRECTIONS, START_RESULTS } from "./constants";

export interface RenderConfig {
    screenWidth: number;
    screenHeight: number;
    tileSize: number;
}

export type StartResult = typeof START_RESULTS[number];

export interface StartButtonConfig {
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GridConfig {
    tilesX: number;
    tilesY: number;
}

export type Tile = {
    readonly x: number;
    readonly y: number;
}

export type MoveDirection = typeof MOVE_DIRECTIONS[number];