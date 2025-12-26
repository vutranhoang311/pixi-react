import { COLLISION_MAP } from "../constants/collision-map"
import { COLS, TILE_SIZE } from "../constants/game-world"
import type { Direction, IPosition } from "../types/common"

export const calculateCanvasSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const aspectRatio = width / height
  return { width, height, aspectRatio }
}

export const calculateNewTarget = (x: number, y: number, direction: Direction): IPosition => {

  return {
    x: (x / TILE_SIZE) * TILE_SIZE + (direction === 'left' ? -TILE_SIZE : direction === 'right' ? TILE_SIZE : 0),
    y: (y / TILE_SIZE) * TILE_SIZE + (direction === 'up' ? -TILE_SIZE : direction === 'down' ? TILE_SIZE : 0),
  }

}


const moveTowards = (current: number, target: number, maxStep: number) => {

  return (current + Math.sign(target - current) * Math.min(maxStep, Math.abs(target - current)))
}

const continueMovement = (currentPosition: IPosition, newPosition: IPosition, step: number)
  : IPosition => {

  return {
    x: moveTowards(currentPosition.x, newPosition.x, step),
    y: moveTowards(currentPosition.y, newPosition.y, step),
  }
}

export const checkCanMove = (target: IPosition): boolean => {
  const row = Math.floor(target.y / TILE_SIZE)
  const col = Math.floor(target.x / TILE_SIZE)
  const index = col + row * COLS
  if (index < 0 || index >= COLLISION_MAP.length) return false
  return COLLISION_MAP[index] !== 1
}

export const handleMovement = (currentPosition: IPosition, newPosition: IPosition, moveSpeed: number, delta: number) => {
  const step = moveSpeed * delta
  const distance = Math.hypot(newPosition.x - currentPosition.x, newPosition.y - currentPosition.y)
  if (distance < step) {
    return {
      position: newPosition,
      completed: true,
    }
  }
  return {
    position: continueMovement(currentPosition, newPosition, step),
    completed: false,
  }
}