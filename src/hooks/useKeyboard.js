import { useCallback, useEffect, useState } from "react"

function keyAction(key) {
    const keyMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log'
    }
    return keyMap[key]
}

export const useKeyboard = () => {
    const [actions, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        tx1: false,
        tx2: false,
        tx3: false,
        tx4: false,
        tx5: false
    })

    const handleKeyDown = useCallback((e) => {
        const action = keyAction(e.code)
        if(action){
            setMovement((prev) => {
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    },[])

    const handleKeyUp = useCallback((e) => {
        const action = keyAction(e.code)
        if(action){
            setMovement((prev) => {
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    },[])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    },[handleKeyDown, handleKeyUp])

    return actions
}