import { MoveDirection } from "../common/types";
import { MOVE_DIRECTION_DOWN, MOVE_DIRECTION_LEFT, MOVE_DIRECTION_RIGHT, MOVE_DIRECTION_UP } from "../common/constants";

const OPPOSITE_DIRECTIONS: Record<MoveDirection, MoveDirection> = {
    [MOVE_DIRECTION_UP]: MOVE_DIRECTION_DOWN,
    [MOVE_DIRECTION_DOWN]: MOVE_DIRECTION_UP,
    [MOVE_DIRECTION_LEFT]: MOVE_DIRECTION_RIGHT,
    [MOVE_DIRECTION_RIGHT]: MOVE_DIRECTION_LEFT,
};

export class DirectionController {
    private readonly _directionsCache: MoveDirection[] = [];

    private _lastKnownDirection: MoveDirection;

    constructor(initialDirection: MoveDirection, private readonly _allowedCacheLength: number = 3) {
        this._lastKnownDirection = initialDirection;
    }

    add(direction: MoveDirection): void {
        if (this._directionsCache.length >= this._allowedCacheLength) {
            return;
        }
        const lastCachedDirection: MoveDirection = this._directionsCache[this._directionsCache.length - 1] ?? this._lastKnownDirection;
        if (!this.isValidDirectionToCache(lastCachedDirection, direction)) {
            return;
        }
        this._directionsCache.push(direction);
    }

    get(): MoveDirection | undefined {
        const direction = this._directionsCache.shift();
        if (direction) {
            this._lastKnownDirection = direction;
        }
        return direction;
    }

    private isValidDirectionToCache(directionToCache: MoveDirection, newDirection: MoveDirection): boolean {
        return directionToCache !== newDirection && OPPOSITE_DIRECTIONS[newDirection] !== directionToCache;
    }
}