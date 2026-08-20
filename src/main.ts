import { GridConfig, RenderConfig } from "./game/common/types";
import { Flow } from "./game/flow/flow";

const RENDER_DEFAULTS: RenderConfig = {
    screenWidth: 1280,
    screenHeight: 720,
    tileSize: 40,
}

const GRID_DEFAULTS: GridConfig = {
    tilesX: RENDER_DEFAULTS.screenWidth / RENDER_DEFAULTS.tileSize,
    tilesY: RENDER_DEFAULTS.screenHeight / RENDER_DEFAULTS.tileSize,
}

main();

function main() {
    const canvas = document.getElementById("game") as HTMLCanvasElement;

    const flow = new Flow(canvas, RENDER_DEFAULTS, GRID_DEFAULTS);
    flow.start();
}