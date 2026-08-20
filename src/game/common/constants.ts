export const START_RESULT_ACCEPT = "acceptPlay";
export const START_RESULT_DECLINE = "declinePlay";
export const START_RESULTS = [START_RESULT_ACCEPT, START_RESULT_DECLINE] as const;

export const START_BUTTON_WIDTH = 150;
export const START_BUTTON_HEIGHT = 70;
export const START_BUTTON_ACCEPT_OFFSET = 200;
export const START_BUTTON_DECLINE_OFFSET = -50;

export const DECLINE_REDIRECT_URL = "https://www.google.com";

export const MOVE_DIRECTION_UP = "up";
export const MOVE_DIRECTION_DOWN = "down";
export const MOVE_DIRECTION_LEFT = "left";
export const MOVE_DIRECTION_RIGHT = "right";
export const MOVE_DIRECTIONS = [MOVE_DIRECTION_UP, MOVE_DIRECTION_DOWN, MOVE_DIRECTION_LEFT, MOVE_DIRECTION_RIGHT] as const;

export const GAME_STATUS_STARTING = "starting";
export const GAME_STATUS_PLAYING = "playing";
export const GAME_STATUS_END = "endGame";

export const GAME_TICKER_INTERVAL_MS = 150;