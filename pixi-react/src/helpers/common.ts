export const calculateCanvasSize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspectRatio = width / height
    return { width, height, aspectRatio }
  }