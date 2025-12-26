import tileMap from '../../assets/tilemap.png'
import { Assets, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
} from '../../constants/game-world'

export const Level = () => {
  const [tileMapTexture, setTileMapTexture] = useState<Texture>(Texture.EMPTY)

  useEffect(() => {
    if (tileMapTexture === Texture.EMPTY) {
      Assets.load({
        alias: 'tileMap',
        src: tileMap,
        format: 'image',
      }).then((texture) => {
        setTileMapTexture(texture)
      })
    }
  }, [tileMapTexture])

  return (
    <pixiSprite
      x={OFFSET_X}
      y={OFFSET_Y}
      texture={tileMapTexture}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
    />
  )
}
