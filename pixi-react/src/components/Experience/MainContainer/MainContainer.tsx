import { Assets, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'
import bg from '../../../assets/background-xanh-1.jpg'
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

  useEffect(() => {
    if (bgTexture === Texture.EMPTY) {
      Assets.load({
        alias: 'bg',
        src: bg,
        format: 'image',
      }).then((texture) => {
        setBgTexture(texture)
      })
    }
  }, [bgTexture])

  return (
    <pixiContainer width={canvasSize.width} height={canvasSize.height}>
      <pixiSprite
        texture={bgTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
    </pixiContainer>
  )
}
