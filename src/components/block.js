import { useBox } from "@react-three/cannon"
import * as textures from "../images/textures"

export const Block = ({position, texture}) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))
    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh ref={ref}>
            <boxGeometry attach='geometry' />
            <meshStandardMaterial map={activeTexture} attach='material' />
        </mesh>
    )
}