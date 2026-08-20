import { Snake } from "./snake";
import { GridConfig, MoveDirection, Tile } from "../common/types";
import { GAME_STATUS_END, GAME_STATUS_PLAYING, GAME_STATUS_STARTING } from "../common/constants";
import { TileChecker } from "./tileChecker";
import { gameEndEvent, gameStateEvent, GameStateUpdate } from "./events";
import { gameInputEvent } from "../input/events";
import { tickEvent } from "../game-ticker/events";
import { DirectionController } from "./directionController";

export class GameController {
    private readonly _snake: Snake;
    private readonly _tileChecker: TileChecker;
    private readonly _directionController: DirectionController;
    private readonly _subscriptionTokens: (() => void)[] = [];

    private _food!: Tile; // initialized in constructor
    private _gameStatus: GameStateUpdate["state"]["status"] = GAME_STATUS_STARTING;

    constructor(private readonly _config: GridConfig) {
        this._snake = new Snake(this._config);
        this._tileChecker = new TileChecker(this._config);
        this._directionController = new DirectionController(this._snake.moveDirection);

        this.createFood();
        this.notifyState();
        this._subscriptionTokens.push(
            gameInputEvent.subscribe(i => this.onInput(i.direction)),
            tickEvent.subscribe(_ => this.onTick()),
        );
    }

    stop(): void {
        this._subscriptionTokens.forEach(subscription => subscription());
        this._subscriptionTokens.length = 0;
    }

    private onInput(direction: MoveDirection): void {
        this._directionController.add(direction);
    }

    private onTick(): void {
        if (this._gameStatus === GAME_STATUS_END) {
            return;
        }
        if (this._gameStatus === GAME_STATUS_STARTING) {
            this._gameStatus = GAME_STATUS_PLAYING;
        }

        this.changeDirection();
        this.move();
    }

    private changeDirection(): void {
        const moveDirection: MoveDirection | undefined = this._directionController.get();
        if (moveDirection) {
            this._snake.changeDirection(moveDirection);
        }
    }

    private move(): void {
        const nextHead: Tile = this._snake.getNextStepHead();

        if (this._tileChecker.isBorderCollision(nextHead) || this._tileChecker.isSnakeBodyCollision(nextHead, this._snake.tiles)) {
            this._gameStatus = GAME_STATUS_END;
            this.notifyState();
            gameEndEvent.notify();
            return;
        }

        if (this._tileChecker.isFoodCollision(nextHead, this._food)) {
            this._snake.eatTile(nextHead);
            this.createFood();
            this.notifyState(nextHead);
        } else {
            const tailToRemove: Tile = this._snake.tiles[this._snake.tiles.length - 1];
            this._snake.move(nextHead);
            this.notifyState(nextHead, tailToRemove);
        }
    }

    private createFood(): void {
        let food: Tile;
        do {
            food = {
                x: Math.floor(Math.random() * this._config.tilesX),
                y: Math.floor(Math.random() * this._config.tilesY),
            };
        } while (this._tileChecker.isTileInSnake(food, this._snake.tiles));

        this._food = food;
    }

    private notifyState(addedTile?: Tile, removedTile?: Tile): void {
        gameStateEvent.notify({
            state: {
                snake: [...this._snake.tiles],
                food: this._food,
                status: this._gameStatus,
            },
            addedTile,
            removedTile,
        });
    }
}