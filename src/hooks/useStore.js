import { create } from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))


export const useStore = create((set) => ({
    texture: 'dirt',
    blocks: getLocalStorage('blocks') || [],
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
    delBlock: (x,y,z) => {
        set((prev) => ({
            blocks: prev.blocks.filter(block => {
                const [X,Y,Z] = block.pos
                return X !== x || Y !== y || Z !== z
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {
        set((prev) => {
            setLocalStorage('blocks', prev.blocks)
        })
    },
    resetWorld: () => {
        set(() => ({
            blocks: []
        }))
    }
}))
