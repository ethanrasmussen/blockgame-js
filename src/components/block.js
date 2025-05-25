import { useBox } from "@react-three/cannon"
import { useStore } from "../hooks/useStore"
import { useState } from "react"
import * as textures from "../images/textures"

export const Block = ({position, texture}) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))
    const [isHovered, setIsHovered] = useState(false)

    const [addBlock, delBlock] = useStore((state) => [state.addBlock, state.delBlock])

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex/2)
                const {x,y,z} = ref.current.position
                if (e.altKey) {
                    delBlock(x,y,z); return
                }
                else if (clickedFace === 0) {
                    addBlock(x+1,y,z); return
                }
                else if (clickedFace === 1) {
                    addBlock(x-1,y,z); return
                }
                else if (clickedFace === 2) {
                    addBlock(x,y+1,z); return
                }
                else if (clickedFace === 3) {
                    addBlock(x,y-1,z); return
                }
                else if (clickedFace === 4) {
                    addBlock(x,y,z+1); return
                }
                else if (clickedFace === 5) {
                    addBlock(x,y,z-1); return
                }
            }}
        ref={ref}>
            <boxGeometry attach='geometry' />
            <meshStandardMaterial
                map={activeTexture}
                attach='material'
                transparent={true}
                opacity={texture === 'glass' ? 0.6 : 1}
                color={isHovered ? 'grey': 'white'}
            />
        </mesh>
    )
}
