/* eslint-disable react-hooks/refs */
import type { Texture } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { HERO_INITIAL_POSITION } from '../../constants/game-world'
import { useHeroControl } from './useHeroControl'
import { useTick } from '@pixi/react'

interface IHeroProps {
  texture: Texture
  onMove: (gridX: number, gridY: number) => void
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef<{ x: number; y: number }>(HERO_INITIAL_POSITION)
  const { getControlledDirection } = useHeroControl()
  const direction = getControlledDirection()
  console.log(getControlledDirection())

  useEffect(() => {
    onMove(position.current.x, position.current.y)
  }, [onMove])

  useTick((delta) => {
    if (direction) {
    }
  })

  return (
    <pixiContainer>
      <pixiSprite
        texture={texture}
        x={position.current.x}
        y={position.current.y}
        scale={0.5}
        anchor={{ x: 0, y: 0 }}
      />
    </pixiContainer>
  )
}
