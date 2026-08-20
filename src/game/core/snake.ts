import { GridConfig, MoveDirection, Tile } from "../common/types";
import { MOVE_DIRECTION_DOWN, MOVE_DIRECTION_LEFT, MOVE_DIRECTION_RIGHT, MOVE_DIRECTION_UP, MOVE_DIRECTIONS } from "../common/constants";

export class Snake {
    private readonly _snakeTiles: Tile[];

    private _moveDirection: MoveDirection;

    constructor(private readonly _config: GridConfig) {
        this._moveDirection = MOVE_DIRECTIONS[Math.floor(Math.random() * MOVE_DIRECTIONS.length)];
        this._snakeTiles = this.getStartSnakePosition();
    }

    get tiles(): readonly Tile[] {
        return this._snakeTiles;
    }

    get moveDirection(): MoveDirection {
        return this._moveDirection;
    }

    private get head(): Tile {
        return this._snakeTiles[0];
    }

    getNextStepHead(): Tile {
        switch (this._moveDirection) {
            case MOVE_DIRECTION_UP:
                return { x: this.head.x, y: this.head.y - 1 };
            case MOVE_DIRECTION_DOWN:
                return { x: this.head.x, y: this.head.y + 1 };
            case MOVE_DIRECTION_LEFT:
                return { x: this.head.x - 1, y: this.head.y };
            case MOVE_DIRECTION_RIGHT:
                return { x: this.head.x + 1, y: this.head.y };
        }
    }

    changeDirection(direction: MoveDirection): void {
        this._moveDirection = direction;
    }

    eatTile(tile: Tile): void {
        this.addHead(tile);
    }

    move(tile: Tile): void {
        this.addHead(tile);
        this._snakeTiles.pop();
    }

    private getStartSnakePosition(): Tile[] {
        const gridCenter = {
            x: Math.floor(this._config.tilesX / 2),
            y: Math.floor(this._config.tilesY / 2),
        };

        switch (this._moveDirection) {
            case MOVE_DIRECTION_UP:  // start from the bottom border
                return [
                    { x: gridCenter.x, y: this._config.tilesY - 3 },
                    { x: gridCenter.x, y: this._config.tilesY - 2 },
                    { x: gridCenter.x, y: this._config.tilesY - 1 },
                ];
            case MOVE_DIRECTION_DOWN:  // start from the top border
                return [
                    { x: gridCenter.x, y: 2 },
                    { x: gridCenter.x, y: 1 },
                    { x: gridCenter.x, y: 0 },
                ];
            case MOVE_DIRECTION_LEFT:  // start from the right border
                return [
                    { x: this._config.tilesX - 3, y: gridCenter.y },
                    { x: this._config.tilesX - 2, y: gridCenter.y },
                    { x: this._config.tilesX - 1, y: gridCenter.y },
                ];
            case MOVE_DIRECTION_RIGHT: // start from the left border
                return [
                    { x: 2, y: gridCenter.y },
                    { x: 1, y: gridCenter.y },
                    { x: 0, y: gridCenter.y },
                ];
        }
    }

    private addHead(head: Tile): void {
        this._snakeTiles.unshift(head);
    }
}