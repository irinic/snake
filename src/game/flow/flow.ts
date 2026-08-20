import { StartFlow } from "./startFlow";
import { GameFlow } from "./gameFlow";
import { DECLINE_REDIRECT_URL, START_RESULT_DECLINE } from "../common/constants";
import { GridConfig, RenderConfig, StartResult } from "../common/types";
import { AdFlow } from "./adFlow";

export class Flow {
    constructor(
        private readonly _canvas: HTMLCanvasElement,
        private readonly _renderConfig: RenderConfig,
        private readonly _gridConfig: GridConfig,
    ) {}

    async start(): Promise<void> {
        while (true) {
            const startFlow = new StartFlow(this._canvas, this._renderConfig);
            const startResult: StartResult = await startFlow.run();

            if (startResult === START_RESULT_DECLINE) {
                window.location.href = DECLINE_REDIRECT_URL;
                return;
            }

            const adFlow = new AdFlow(this._canvas, this._renderConfig);
            await adFlow.run();

            const gameFlow = new GameFlow(this._canvas, this._renderConfig, this._gridConfig);
            await gameFlow.run();
        }
    }
}