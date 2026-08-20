import { GAME_TICKER_INTERVAL_MS } from "../common/constants";
import { GameTicker } from "../game-ticker/gameTicker";
import { GameController } from "../core/gameController";
import { GameInputHandler } from "../input/gameInput";
import { GridConfig, RenderConfig } from "../common/types";
import { gameEndEvent } from "../core/events";
import { GameRenderer } from "../render/gameRenderer";

export class GameFlow {
    constructor(
        private readonly _canvas: HTMLCanvasElement,
        private readonly _renderConfig: RenderConfig,
        private readonly _gridConfig: GridConfig,
    ) {}

    run(): Promise<void> {
        return new Promise(resolve => {
            const renderer = new GameRenderer(this._canvas, this._renderConfig);
            const inputHandler = new GameInputHandler();
            const controller = new GameController(this._gridConfig);
            const ticker = new GameTicker(GAME_TICKER_INTERVAL_MS);

            const endGameSubscription = gameEndEvent.subscribe(_ => {
                endGameSubscription();
                ticker.stop();
                inputHandler.unsubscribe();
                controller.stop();
                renderer.stop();
                resolve();
            });

            inputHandler.subscribe();
            ticker.start();
        });
    }
}