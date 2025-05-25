import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/ground';
import { Player } from './components/player';
import { FPV } from './components/FPV';
import { Blocks } from './components/blocks';


function App() {
  return (
    <>
      {/* <div>BlockgameJS: A Minecraft-Inspired Block Builder</div> */}
      <Canvas>
        <Sky sunPosition={[100,100,20]}/>
        <ambientLight intensity={1.2}/>
        <FPV />
        <Physics>
          <Player />
          <Blocks />
          <Ground />
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
    </>
  );
}

export default App;
