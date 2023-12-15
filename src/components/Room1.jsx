import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from "@react-three/fiber"


const Room1 = ({ setRoom, setOverlayState, setOverlayContent }) => {
    function room() {
        const gltf = useLoader(GLTFLoader, "/3d/room1/room.glb");

        return gltf ? <primitive object={gltf.scene} /> : null
    }

    function shelf1() {
        const gltf = useLoader(GLTFLoader, "/3d/room1/bookshelf1.glb");

        return gltf ? <primitive object={gltf.scene} /> : null
    }

    function shelf2() {
        const gltf = useLoader(GLTFLoader, "/3d/room1/bookshelf2.glb");

        return gltf ? <primitive object={gltf.scene} /> : null
    }

    function door() {
        const gltf = useLoader(GLTFLoader, "/3d/room1/door.glb");

        return gltf ? <primitive onClick={() => openOverlay()} object={gltf.scene} /> : null
    }

    function openOverlay() {
        setOverlayState(true);
        setOverlayContent('room1');
    }


    return (
        <mesh>
            {room()}
            {shelf1()}
            {shelf2()}
            {door()}
        </mesh>
    )

}

export default Room1