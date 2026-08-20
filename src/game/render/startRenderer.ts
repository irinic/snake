import { RenderConfig, StartButtonConfig } from "../common/types";

export class StartRenderer {
    private readonly _context: CanvasRenderingContext2D;

    constructor(
        private readonly _canvas: HTMLCanvasElement,
        private readonly _renderConfig: RenderConfig,
        private readonly _buttonsConfigs: StartButtonConfig[],
    ) {
        const context = this._canvas.getContext("2d");

        if (!context) {
            throw new Error("Unable to get canvas context");
        }

        this._context = context;
        this.initialize();
    }

    public stop(): void {

    }

    private initialize(): void {
        this._canvas.width = this._renderConfig.screenWidth;
        this._canvas.height = this._renderConfig.screenHeight;
        this._context.fillStyle = "#A9A9A9";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.renderChoice();
        this.renderButton(this._buttonsConfigs[0]);
        this.renderButton(this._buttonsConfigs[1]);
    }

    private renderChoice(): void {
        this._context.fillStyle = "#FFFDD0";
        this._context.font = "48px Roboto";
        this._context.textAlign = "center";
        this._context.textBaseline = "middle";

        this._context.fillText(
            "Start playing the Snake game?",
            this._canvas.width / 2,
            this._canvas.height / 2 - 100,
        );
    }

    private renderButton(config: StartButtonConfig): void {
        this._context.fillStyle = "#FFFDD0";
        this._context.font = "40px Arial";
        this._context.textAlign = "center";
        this._context.textBaseline = "middle";

        this._context.fillText(config.title, config.x + config.width / 2, config.y + config.height / 2);
    }
}