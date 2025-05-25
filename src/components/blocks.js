import { useStore } from "../hooks/useStore";
import { Block } from "./block";

export const Blocks = () => {
    const blocks = useStore(s => s.blocks)

    return blocks.map(({key, pos, texture}) => {
        return (
            <Block key={key} position={pos} texture={texture} />
        )
    })
}