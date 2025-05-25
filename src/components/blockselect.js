import { useStore } from "../hooks/useStore"
import { useKeyboard } from "../hooks/useKeyboard"
import { useEffect, useState } from "react"
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "../images/images"

const images = {
	dirt: dirtImg,
	grass: grassImg,
	glass: glassImg,
	wood: woodImg,
	log: logImg,
}


export const BlockSelectMenu = () => {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore((state) => [state.texture])
    const {
            dirt,
			grass,
			glass,
			wood,
			log
        } = useKeyboard()

    useEffect(() => {
        const textures = {
            dirt,
			grass,
			glass,
			wood,
			log
        }
        const selectedTexture = Object.entries(textures).find(([k,v]) => v)
        if (selectedTexture) {
            setTexture(selectedTexture[0])
        }
    }, [setTexture, dirt, grass, glass, wood, log])

    useEffect(() => {
        const visTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000)
        setVisible(true)
        return () => {
            clearTimeout(visTimeout)
        }
    }, [activeTexture])

    return visible && (
        <div className="absolute centered selection-menu">
            {
                Object.entries(images).map(([k, src]) => {
                    return (<img
                        key={k}
                        src={src}
                        alt={k}
                        className={`${k === activeTexture ? 'active' : ''}`}
                    />)
			})}
        </div>
    )
}