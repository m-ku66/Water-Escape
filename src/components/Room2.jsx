import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from "@react-three/fiber"


const Room2 = ({ setRoom, setOverlayState, setOverlayContent, setHintState }) => {

    let tileArray = [];
    const correctArray = ['red', 'purple', 'green', 'yellow'];

    function success2() {
        setOverlayState(true);
        setHintState("show");
        setOverlayContent("array match");
    }

    function failure2() {
        setOverlayState(true);
        setOverlayContent("array mismatch");
        tileArray = [];

        setTimeout(() => {
            setOverlayState(false)
        }, 5000);
    }

    function fillTileArray(tile) {
        if (tileArray.length < 5) {
            tileArray.push(tile);
        } else {
            setOverlayState(true);
            setOverlayContent('full array');
        }

        if (tileArray.length === 4) {
            checkArray();
        }
    }

    function checkArray() {
        if (
            tileArray[0] === correctArray[0] &&
            tileArray[1] === correctArray[1] &&
            tileArray[2] === correctArray[2] &&
            tileArray[3] === correctArray[3]
        ) {
            success2();
        } else {
            failure2();
        }
    }


    function room() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/room.glb");

        return gltf ? <primitive object={gltf.scene} /> : null
    }

    function openSign() {
        setOverlayState(true);
        setOverlayContent('sign');
    }

    function sign() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/sign.glb");

        return gltf ? <primitive onClick={() => openSign()} object={gltf.scene} /> : null
    }

    function green() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/greenTile.glb");

        return gltf ? <primitive onClick={() => fillTileArray('green')} object={gltf.scene} /> : null
    }

    function purple() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/purpleTile.glb");

        return gltf ? <primitive onClick={() => fillTileArray('purple')} object={gltf.scene} /> : null
    }

    function red() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/redTile.glb");

        return gltf ? <primitive onClick={() => fillTileArray('red')} object={gltf.scene} /> : null
    }

    function yellow() {
        const gltf = useLoader(GLTFLoader, "/3d/room2/yellowTile.glb");

        return gltf ? <primitive onClick={() => fillTileArray('yellow')} object={gltf.scene} /> : null
    }


    return (
        <mesh>
            {room()}
            {sign()}
            {green()}
            {purple()}
            {red()}
            {yellow()}
        </mesh>
    )

}

export default Room2