import { useStore } from "../hooks/useStore";

export const Menu = () => {
    const saveWorld = useStore(s => s.saveWorld)
    const resetWorld = useStore(s => s.resetWorld)

    return (
        <div className="menu absolute">
            <button onClick={() => saveWorld()}>Save World</button>
            <button onClick={() => resetWorld()}>Reset World</button>
        </div>
    )
}