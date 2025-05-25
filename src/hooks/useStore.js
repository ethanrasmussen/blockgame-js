import { create } from "zustand";
import { nanoid } from "nanoid";


export const useStore = create((set) => ({
    texture: 'dirt',
    blocks: [{
        key: nanoid(),
        pos: [1,5,1],
        texture: 'dirt'
    }],
    addBlock: (x,y,z) => {
        set((prev) => ({
            blocks: [
                ...prev.blocks,
                {
                    key: nanoid(),
                    pos: [x,y,z],
                    texture: prev.texture
                }
            ]
        }))
    },
    delBlock: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {}
}))