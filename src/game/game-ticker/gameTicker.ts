import { tickEvent } from "./events";

export class GameTicker {
    private _lastFrameTime: number = 0;
    private _elapsedTime: number = 0;
    private _frameId?: number;

    constructor(private readonly _tickInterval: number) {}

    start(): void {
        if (this._frameId !== undefined) {
            return;
        }
        this._lastFrameTime = performance.now();
        this._frameId = requestAnimationFrame(this.onAnimationFrame);
    }

    stop(): void {
        if (this._frameId !== undefined) {
            cancelAnimationFrame(this._frameId);
            this._frameId = undefined;
        }
    }

    private onAnimationFrame: (newTime: number) => void = (newTime: number): void => {
        this._elapsedTime += newTime - this._lastFrameTime;
        this._lastFrameTime = newTime;
        if (this._elapsedTime >= this._tickInterval) {
            tickEvent.notify();
            this._elapsedTime -= this._tickInterval;
        }
        this._frameId = requestAnimationFrame(this.onAnimationFrame);
    }
}