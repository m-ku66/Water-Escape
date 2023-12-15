import React, { useState } from 'react'
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import Room1 from './components/Room1'
import Room2 from './components/Room2'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init();

  const [room, setRoom] = useState(0);
  const [overlayState, setOverlayState] = useState(false);
  const [overlayContent, setOverlayContent] = useState("");

  const [room1Keycode, setroom1KeyCode] = useState('');
  const [hintState, setHintState] = useState("hidden");
  const [signInput, setSignInput] = useState('');

  const renderRoom = (level) => {
    let renderedRoom;
    switch (level) {
      case 1:
        renderedRoom = <Room1 setRoom={setRoom} setOverlayState={setOverlayState} setOverlayContent={setOverlayContent} />;
        break;
      case 2:
        renderedRoom = <Room2 setRoom={setRoom} setOverlayState={setOverlayState} setOverlayContent={setOverlayContent} setHintState={setHintState} />;
        break;
      case 3:
        renderedRoom =
          <mesh position={[0, 1, 0]}>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        break;
    }
    return renderedRoom;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCode = room1Keycode;
    const correctCode = "54637";

    inputCode === correctCode ? success() : failure();
  }

  const handleSign = (e) => {
    e.preventDefault();
    const inputName = signInput;
    const correctInput = "bladensburg"

    inputName === correctInput ? success() : failure();
  }

  const renderOverlayContent = (contentKey) => {
    let content;
    switch (contentKey) {
      case "room1":
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <div className='mb-[10%] mt-[10%] px-[20%] w-full flex justify-between'>
                <div className='rounded-full w-[30px] h-[30px] bg-blue-400'></div>
                <div className='rounded-full w-[30px] h-[30px] bg-red-400'></div>
                <div className='rounded-full w-[30px] h-[30px] bg-green-400'></div>
                <div className='rounded-full w-[30px] h-[30px] bg-purple-400'></div>
                <div className='rounded-full w-[30px] h-[30px] bg-stone-400'></div>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col'>
                <label className='default-text text-[20px] text-center mb-[5%] text-yellow-700'>INPUT THE NUMBER KEY</label>
                <input
                  className='border text-center'
                  maxLength={5}
                  type="text"
                  required
                  value={room1Keycode}
                  onChange={(e) => setroom1KeyCode(e.target.value)}
                />
              </form>
            </div>
          </div>
        break;

      case 'full array':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='default-text text-[100px] mt-[10%] text-center text-yellow-700'>ARRAY FULL</h1>
              <img className='absolute bottom-[8%] w-[60%] h-[60%]' src="/images/failure_vector.svg" alt="" />
            </div>
          </div>
        break;

      case 'array match':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <img className='absolute bottom-[8%] w-[60%] h-[60%]' src="/images/success_vector.svg" alt="" />
              <h1 className='default-text text-[32px] mt-[10%] text-center text-yellow-700'>Hint Aquired</h1>
              <p className='default-text text-[18px] mt-[10%] text-center text-yellow-700'>Try to decipher the code now in your hands</p>
            </div>
          </div>
        break;

      case 'array mismatch':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <img className='absolute bottom-[8%] w-[60%] h-[60%]' src="/images/failure_vector.svg" alt="" />
              <h1 className='default-text text-[32px] mt-[10%] text-center text-yellow-700'>Hrm...</h1>
              <p className='default-text text-[18px] mt-[10%] text-center text-yellow-700'>A peculiar puzzle indeed...</p>
            </div>
          </div>
        break;

      case 'sign':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-800 absolute z-[11] w-[80%] h-[80%] bg-yellow-700'>
            <div className='flex flex-col justify-center px-[10%]'>
              <h1 className='default-text text-[100px] my-[5%] text-center text-black/[0.6]'>RIDDLE!</h1>
              <p className='default-text text-[32px] mb-[5%] text-center text-black/[0.6]'>I'm a word that rhymes with bird. Not a character, but related to one in particular. A flame sorcerer, her hometown, I am: </p>
              <form onSubmit={handleSign} className='flex flex-col px-[30%]'>
                <input
                  className='border text-center'
                  maxLength={11}
                  type="text"
                  required
                  value={signInput}
                  onChange={(e) => setSignInput(e.target.value)}
                />
              </form>
            </div>
          </div>
        break;

      case 'success':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='default-text text-[100px] mt-[10%] text-center text-yellow-700'>SUCCESS!</h1>
              <img className='absolute bottom-[8%] w-[60%] h-[60%]' src="/images/success_vector.svg" alt="" />
            </div>
          </div>
        break;

      case 'failure':
        content =
          <div className='rounded-[30px] border-[5px] border-yellow-700 absolute z-[11] w-[30%] h-[80%] bg-yellow-500'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='default-text text-[100px] mt-[10%] text-center text-yellow-700'>HRM...</h1>
              <img className='absolute bottom-[8%] w-[60%] h-[60%]' src="/images/failure_vector.svg" alt="" />
            </div>
          </div>
        break;
    }

    return content;
  }

  function success() {
    setOverlayContent("success");
    setTimeout(() => {
      switch (room) {
        case 1:
          setRoom(2);
          break;
        case 2:
          setHintState('hidden');
          setRoom(3);
          break;
      }
      setOverlayState(false);
    }, 3000);
  }

  function failure() {
    setOverlayContent("failure");
    setTimeout(() => {
      setOverlayState(false)
    }, 5000);
  }


  const overlayStyle1 = "overlay flex items-center justify-center absolute z-10 w-full h-full bg-black/[0.5]";
  const overlayStyle2 = "hidden";

  const hintStyle1 = "absolute bottom-[5%] right-[5%] rounded-[30px] z-[100] border-yellow-700 bg-yellow-500 p-[1%]";
  const hintStyle2 = "hidden";

  const winStyle1 = "absolute w-full z-[50] flex flex-col justify-center"
  const winStyle2 = "hidden";

  const overallStyle = room === 0 ? "hidden" : 'container max-w-full h-screen bg-blue-300';
  const onBoardingStyle = room === 0 ? 'container max-w-full h-fit bg-blue-300' : "hidden";

  return (
    <>
      <div className={onBoardingStyle}>
        <div className='flex flex-col w-full h-screen justify-center items-center'>
          <h1 data-aos="fade-up" data-aos-duration="1000" className='default-text text-[200px] text-yellow-600 mb-[5%]'>Water Escape</h1>
          <p data-aos="fade-up" data-aos-duration="3000" className='flicker-anim default-text text-[48px] text-yellow-600'>scroll down</p>
        </div>

        <div className='flex w-full h-screen justify-center items-center'>
          <div className='flex flex-col w-[60%]'>
            <h1 data-aos="fade-right" data-aos-duration="1000" className='default-text text-[100px] text-yellow-600 mb-[5%]'>What's Going On?</h1>
            <p data-aos="fade-right" data-aos-duration="2000" className='default-text text-[32px] text-yellow-600'>
              There's a cool cube out there, and we need your big brain to find it
            </p>
          </div>
        </div>

        <div className='flex w-full h-screen justify-center items-center'>
          <div className='flex flex-col w-[60%]'>
            <h1 data-aos="fade-left" data-aos-duration="1000" className='default-text text-[100px] text-yellow-600 mb-[5%]'>Da Rules</h1>
            <p data-aos="fade-left" data-aos-duration="2000" className='default-text text-[32px] text-yellow-600'>
              Use your mouse to orbit each room, zoom in on details, and click on stuff
            </p>
            <p onClick={() => setRoom(1)} data-aos="fade-left" data-aos-duration="3000" className='cursor-pointer default-text text-[32px] text-yellow-700 hover:text-white w-fit'>
              Let's go!
            </p>
          </div>
        </div>
      </div>


      <div className={overallStyle}>
        <div className={overlayState ? overlayStyle1 : overlayStyle2}>
          <div onClick={() => setOverlayState(false)} className='z-10 w-full h-full'></div>
          {renderOverlayContent(overlayContent)}
        </div>

        <div className={hintState === "hidden" ? hintStyle2 : hintStyle1}>
          <h1 className='text-[18px] text-yellow-700'>2,12,1,4,5,14,19,2,21,18,7</h1>
        </div>

        <div className={room === 3 ? winStyle1 : winStyle2}>
          <h1 className='default-text text-[100px] text-center text-black/[0.8]'>YOU WIN</h1>
          <p className='default-text text-[20px] mt-[3%] text-center text-black/[0.5]'>Here's a cool cube</p>
          <p onClick={() => location.reload()} className='cursor-pointer duration-500 default-text text-[18px] mt-[1%] text-center text-black/[0.5] hover:text-white'>retry?</p>
        </div>


        <Canvas camera={{ position: [0, 1.6, -5] }}>
          <ambientLight intensity={2} />
          <OrbitControls target={[0, 1.6, 0]} maxPolarAngle={Math.PI / 2} minAzimuthAngle={Math.PI / 200} maxAzimuthAngle={Math.PI / 2} enablePan={false} enableZoom={true} minDistance={1} maxDistance={5} />
          {renderRoom(room)}
        </Canvas>
      </div>
    </>
  )
}

export default App
