import { RenderConfig, StartButtonConfig, StartResult } from "../common/types";
import { StartRenderer } from "../render/startRenderer";
import { StartInputHandler } from "../input/startInput";
import {
    START_BUTTON_ACCEPT_OFFSET,
    START_BUTTON_DECLINE_OFFSET,
    START_BUTTON_HEIGHT,
    START_BUTTON_WIDTH
} from "../common/constants";

export class StartFlow {
    constructor(private readonly _canvas: HTMLCanvasElement, private readonly _renderConfig: RenderConfig) {}

    run(): Promise<StartResult> {
        return new Promise(resolve => {
            const buttonsConfigs: StartButtonConfig[] = [
                {
                    title: "ACCEPT",
                    x: this._renderConfig.screenWidth / 2 - START_BUTTON_ACCEPT_OFFSET,
                    y: this._renderConfig.screenHeight / 2,
                    width: START_BUTTON_WIDTH,
                    height: START_BUTTON_HEIGHT,
                },
                {
                    title: "DECLINE",
                    x: this._renderConfig.screenWidth / 2 - START_BUTTON_DECLINE_OFFSET,
                    y: this._renderConfig.screenHeight / 2,
                    width: START_BUTTON_WIDTH,
                    height: START_BUTTON_HEIGHT,
                }
            ];
            const renderer = new StartRenderer(this._canvas, this._renderConfig, buttonsConfigs);
            const input = new StartInputHandler(this._canvas, this._renderConfig, buttonsConfigs);
            input.start(startResult => {
                input.stop();
                renderer.stop();
                resolve(startResult);
            });
        });
    }
}