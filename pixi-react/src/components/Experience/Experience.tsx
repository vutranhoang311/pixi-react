import { Application, extend } from '@pixi/react'
import { Container, Graphics, Sprite } from 'pixi.js'
import { useCallback, useEffect, useState } from 'react'
import { calculateCanvasSize } from '../../helpers/common'
import { MainContainer } from './MainContainer/MainContainer'

extend({ Container, Graphics, Sprite })

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())

  const handleResize = useCallback(() => {
    setCanvasSize(calculateCanvasSize())
  }, [setCanvasSize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <Application width={canvasSize.width} height={canvasSize.height}>
      <MainContainer canvasSize={canvasSize} />
    </Application>
  )
}
