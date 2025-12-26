import type { Direction } from "../types/common"

export const TILE_SIZE = 32
export const COLS = 26
export const ROWS = 17
export const GAME_WIDTH = TILE_SIZE * COLS - TILE_SIZE * 2
export const GAME_HEIGHT = TILE_SIZE * ROWS - TILE_SIZE * 2

export const OFFSET_X = 0
export const OFFSET_Y = TILE_SIZE / 2

export const HERO_INITIAL_POSITION = {
    x: TILE_SIZE * 10,
    y: TILE_SIZE * 10,
}

export const DIRECTION_KEY: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    W: 'up',
    S: 'down',
    A: 'left',
    D: 'right',
}
