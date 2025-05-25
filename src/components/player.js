import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"

const JUMP_VELOCITY = 4
const WALK_SPEED = 5

export const Player = () => {
    const actions = useKeyboard()

    const {camera} = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0,5,0]
    }))

    const vel = useRef([0,0,0])
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
    }, [api.velocity])

    const pos = useRef([0,0,0])
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
    }, [api.position])

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        const dir = new Vector3()

        const fwdVec = new Vector3(
            0,
            0,
            (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)
        )

        const sideVec = new Vector3(
            (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
            0,
            0
        )

        dir.subVectors(fwdVec,sideVec).normalize().multiplyScalar(WALK_SPEED).applyEuler(camera.rotation)

        api.velocity.set(dir.x, vel.current[1], dir.z)

        if (actions.jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2])
        }
    })

    return (
        <mesh ref={ref}></mesh>
    )
}