import { gameInputEvent } from "./events";
import { MoveDirection } from "../common/types";
import { MOVE_DIRECTION_DOWN, MOVE_DIRECTION_LEFT, MOVE_DIRECTION_RIGHT, MOVE_DIRECTION_UP } from "../common/constants";

export class GameInputHandler {
    subscribe(): void {
        document.addEventListener("keydown", this.onKeyDown);
    }

    unsubscribe(): void {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    private onKeyDown: (event: KeyboardEvent) => void = (event: KeyboardEvent): void => {
        const direction: MoveDirection | undefined = this.getDirection(event.key);
        if (direction) {
            event.preventDefault();
            gameInputEvent.notify({ direction });
        }
    };

    private getDirection(key: string): MoveDirection | undefined {
        switch (key) {
            case "ArrowUp":
                return MOVE_DIRECTION_UP;
            case "ArrowDown":
                return MOVE_DIRECTION_DOWN;
            case "ArrowLeft":
                return MOVE_DIRECTION_LEFT;
            case "ArrowRight":
                return MOVE_DIRECTION_RIGHT;
            default:
                return undefined;
        }
    }
}