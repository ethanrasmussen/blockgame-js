import { useStore } from "../hooks/useStore"
import { useKeyboard } from "../hooks/useKeyboard"
import { useEffect, useState } from "react"
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "../images/images"

const images = { dirt: dirtImg, grass: grassImg, glass: glassImg, wood: woodImg, log: logImg }

export const BlockSelectMenu = () => {
  const [visible, setVisible] = useState(false)

  const activeTexture = useStore(s => s.texture)
  const setTexture = useStore(s => s.setTexture)

  const { dirt, grass, glass, wood, log } = useKeyboard()

  useEffect(() => {
    const pressed = Object.entries({ dirt, grass, glass, wood, log }).find(([_, down]) => down)?. [0]

    if (pressed && pressed !== activeTexture) {
      setTexture(pressed)
    }
  }, [activeTexture, dirt, grass, glass, wood, log, setTexture])

  useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timeout)
  }, [activeTexture])

  if (!visible) return null
  return (
    <div className="absolute centered selection-menu">
      {Object.entries(images).map(([key, src]) => (
        <img
          key={key}
          src={src}
          alt={key}
          className={key === activeTexture ? "active" : ""}
        />
      ))}
    </div>
  )
}

