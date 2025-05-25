import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../images/textures"
import { useStore } from "../hooks/useStore"
import { NearestFilter, planeGeometry, RepeatWrapping } from "three"
// import { extend } from "@react-three/fiber";
// import { PlaneBufferGeometry } from "three";
// extend({ PlaneBufferGeometry });

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], position: [0, -0.5, 0]
    }))

    const [addBlock] = useStore((state) => [state.addBlock])

    // groundTexture.magFilter = NearestFilter
    // groundTexture.wrapS = RepeatWrapping
    // groundTexture.wrapT = RepeatWrapping
    groundTexture.repeat.set(100,100)

    return (
        <mesh 
        onClick={(e) => {
            e.stopPropagation()
            const [x,y,z] = Object.values(e.point).map(val => Math.ceil(val));
            addBlock(x,y,z)
        }}
        ref={ref}>
            <planeGeometry attach='geometry' args={[100,100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}