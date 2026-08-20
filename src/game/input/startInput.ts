import { RenderConfig, StartButtonConfig, StartResult } from "../common/types";
import { START_RESULT_ACCEPT, START_RESULT_DECLINE } from "../common/constants";

export class StartInputHandler {
    private _resultFunc?: (result: StartResult) => void;

    constructor(
        private readonly _canvas: HTMLCanvasElement,
        private readonly _renderConfig: RenderConfig,
        private readonly _buttonsConfigs: StartButtonConfig[],
    ) {}

    start(resultFunc: (result: StartResult) => void): void {
        this._resultFunc = resultFunc;
        this._canvas.addEventListener("click", this.onClick);
    }

    stop(): void {
        this._canvas.removeEventListener("click", this.onClick);
        this._resultFunc = undefined;
    }

    private onClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
        const rect = this._canvas.getBoundingClientRect();
        const x: number = (event.clientX - rect.left) * this._canvas.width / rect.width;
        const y: number = (event.clientY - rect.top) * this._canvas.height / rect.height;
        if (this.isAcceptClicked(x, y)) {
            this._resultFunc?.(START_RESULT_ACCEPT);
        } else if (this.isDeclineClicked(x, y)) {
            this._resultFunc?.(START_RESULT_DECLINE);
        }
    };

    private isAcceptClicked(x: number, y: number): boolean {
        return x >= this._buttonsConfigs[0].x &&
            x <= this._buttonsConfigs[0].x + this._buttonsConfigs[0].width &&
            y >= this._buttonsConfigs[0].y &&
            y <= this._buttonsConfigs[0].y + this._buttonsConfigs[0].height;
    }

    private isDeclineClicked(x: number, y: number): boolean {
        return x >= this._buttonsConfigs[1].x &&
            x <= this._buttonsConfigs[1].x + this._buttonsConfigs[1].width &&
            y >= this._buttonsConfigs[1].y &&
            y <= this._buttonsConfigs[1].y + this._buttonsConfigs[1].height;
    }
}