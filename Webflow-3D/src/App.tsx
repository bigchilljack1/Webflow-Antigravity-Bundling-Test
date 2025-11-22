import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
function RotatingBox(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const meshRef = useRef<THREE.Mesh>(null)

  // Hold state for hovered and clicked events
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <RotatingBox position={[-1.2, 0, 0]} />
        <RotatingBox position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}
export default App