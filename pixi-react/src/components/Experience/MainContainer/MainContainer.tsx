import { extend } from '@pixi/react'
import { Assets, Container, Sprite, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'
interface MainContainerProps {
  canvasSize: {
    width: number
    height: number
    aspectRatio: number
  }
  children?: React.ReactNode
}
extend({ Container, Sprite })

export const MainContainer = ({ canvasSize, children }: MainContainerProps) => {
  const [bgTexture, setBgTexture] = useState<Texture>(Texture.EMPTY)

  useEffect(() => {
    if (bgTexture === Texture.EMPTY) {
      Assets.load({
        alias: 'bg',
        src: 'https://picsum.photos/200/300.jpg',
        format: 'image',
      }).then((texture) => {
        console.log(texture)
        setBgTexture(texture)
      })
    }
  }, [bgTexture])

  return (
    <pixiContainer>
      <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height}/>
      {children}
    </pixiContainer>
  )
}
