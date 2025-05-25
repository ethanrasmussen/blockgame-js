import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/ground';

function App() {
  return (
    <>
      <div>BlockgameJS: A Minecraft-Inspired Block Builder</div>
      <Canvas>
        <Sky sunPosition={[100,100,20]}/>
        <ambientLight intensity={1.2}/>
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
