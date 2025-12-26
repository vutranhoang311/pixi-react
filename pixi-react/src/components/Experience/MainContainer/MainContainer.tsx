import { Assets, Texture } from 'pixi.js'
import { useCallback, useEffect, useState } from 'react'
import bg from '../../../assets/background-xanh-1.jpg'
import { Level } from '../../Level/Level'
import { Hero } from '../../Hero/Hero'
import hero from '../../../assets/hero.png'
import { TILE_SIZE } from '../../../constants/game-world'
interface MainContainerProps {
  canvasSize: {
    width: number
    height: number
    aspectRatio: number
  }
  children?: React.ReactNode
}

export const MainContainer = ({ canvasSize, children }: MainContainerProps) => {
  const [bgTexture, setBgTexture] = useState<Texture>(Texture.EMPTY)
  const [heroTexture, setHeroTexture] = useState<Texture>(Texture.EMPTY)
  const [heroPosition, setHeroPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    if (bgTexture === Texture.EMPTY) {
      Assets.load({
        alias: 'bg',
        src: bg,
        format: 'image',
      }).then((texture) => {
        setBgTexture(texture)
      })
      Assets.load({
        alias: 'hero',
        src: hero,
        format: 'image',
      }).then((texture) => {
        setHeroTexture(texture)
      })
    }
  }, [bgTexture])

  const updateHeroPosition = useCallback((gridX: number, gridY: number) => {
    setHeroPosition({
      x: Math.floor(gridX / TILE_SIZE),
      y: Math.floor(gridY / TILE_SIZE),
    })
  }, [])

  return (
    <pixiContainer width={canvasSize.width} height={canvasSize.height}>
      <pixiSprite
        texture={bgTexture}
        width={canvasSize.width}
        height={canvasSize.height}
        anchor={{ x: 0, y: 0 }}
        x={0}
        y={0}
      />
      <Level />
      {children}
      <Hero texture={heroTexture} onMove={updateHeroPosition} />
    </pixiContainer>
  )
}
