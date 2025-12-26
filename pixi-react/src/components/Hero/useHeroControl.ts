/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import type { Direction } from '../../types/common'
import { DIRECTION_KEY } from '../../constants/game-world'


export const useHeroControl = () => {
    const [heldDirection, setHeldDirection] = useState<Direction[]>([])

    const handleKey = useCallback((event: KeyboardEvent, isKeyDown: boolean) => {
        const direction = DIRECTION_KEY[event.key]
        if (!direction) return
        setHeldDirection((prev) => {
            if (!isKeyDown) {
                return prev.includes(direction) ? prev : [direction, ...prev]
            }
            return prev.filter((d) => d !== direction)
        })
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleKey(event, true)
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            handleKey(event, false)
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKey])


    const getControlledDirection = useCallback(() => {
        return heldDirection[0] || null
    }, [heldDirection])
    return {
        getControlledDirection,
    }
}
