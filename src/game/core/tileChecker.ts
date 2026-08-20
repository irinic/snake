import { GridConfig, Tile } from "../common/types";

export class TileChecker {
    constructor(private readonly _config: GridConfig) {
    }

    isTileInSnake(tile: Tile, snakeTiles: readonly Tile[]): boolean {
        return snakeTiles.some(t => t.x === tile.x && t.y === tile.y);
    }

    isBorderCollision(tile: Tile): boolean {
        return tile.x < 0 || tile.y < 0 || tile.x >= this._config.tilesX || tile.y >= this._config.tilesY;
    }

    isSnakeBodyCollision(tile: Tile, snakeTiles: readonly Tile[]): boolean {
        for (const snakeTile of snakeTiles) {
            if (snakeTile.x === tile.x && snakeTile.y === tile.y) {
                return true;
            }
        }
        return false;
    }

    isFoodCollision(head: Tile, food: Tile): boolean {
        return head.x === food.x && head.y === food.y;
    }
}