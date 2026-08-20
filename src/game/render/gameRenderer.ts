import { RenderConfig, Tile } from "../common/types";
import { GAME_STATUS_END, GAME_STATUS_PLAYING, GAME_STATUS_STARTING } from "../common/constants";
import { gameStateEvent, GameStateUpdate } from "../core/events";

export class GameRenderer {
    private readonly _context: CanvasRenderingContext2D;
    private readonly _subscriptionTokens: (() => void)[] = [];

    constructor(private readonly _canvas: HTMLCanvasElement, private readonly _renderConfig: RenderConfig) {
        const context = _canvas.getContext("2d");

        if (!context) {
            throw new Error("Unable to get canvas context");
        }

        this._context = context;

        this.initialize();
        this._subscriptionTokens.push(gameStateEvent.subscribe((s) => this.render(s)));
    }

    stop(): void {
        this._subscriptionTokens.forEach(subscription => subscription());
    }

    private initialize(): void {
        this._canvas.width = this._renderConfig.screenWidth;
        this._canvas.height = this._renderConfig.screenHeight;
        this._context.fillStyle = "#A9A9A9";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    private render(update: GameStateUpdate): void {
        switch (update.state.status) {
            case GAME_STATUS_STARTING:
                this.renderSnake(update.state.snake);
                this.renderFood(update.state.food);
                break;
            case GAME_STATUS_PLAYING:
                if (update.addedTile) {
                    this.renderSnakeTile(update.addedTile);
                }
                if (update.removedTile) {
                    this.renderBackgroundTile(update.removedTile);
                } else {
                    this.renderFood(update.state.food);
                }
                break;
            case GAME_STATUS_END:
                break;
        }
    }

    private renderSnake(snake: readonly Tile[]): void {
        snake.forEach(tile => this.renderSnakeTile(tile));
    }

    private renderSnakeTile(tile: Tile): void {
        this.renderTile(tile, "#4169E1");
    }

    private renderFood(tile: Tile): void {
        this.renderTile(tile, "#800020");
    }

    private renderBackgroundTile(tile: Tile): void {
        this.renderTile(tile, "#A9A9A9");
    }

    private renderTile(tile: Tile, style: string): void {
        this._context.fillStyle = style;
        this._context.fillRect(
            tile.x * this._renderConfig.tileSize,
            tile.y * this._renderConfig.tileSize,
            this._renderConfig.tileSize,
            this._renderConfig.tileSize,
        );
    }
}