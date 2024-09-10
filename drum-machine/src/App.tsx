import { useEffect, useRef, useState } from "react";

function App() {

  const keysAndSounds = [
    { key: 'Q', sound: 'Heater 1', src: "../public/Heater-1.mp3" },
    { key: 'W', sound: 'Heater 2', src: "/Heater-2.mp3" },
    { key: 'E', sound: 'Heater 3', src: "/Heater-3.mp3" },
    { key: 'A', sound: 'Heater 4', src: "/Heater-4_1.mp3" },
    { key: 'S', sound: 'Clap', src: "/Heater-6.mp3" },
    { key: 'D', sound: 'Open-HH', src: "/Dsc_Oh.mp3" },
    {
      key: 'Z', sound: 'Kick-n-Hat', src: "/Kick_n_Hat.mp3"
    },
    { key: 'X', sound: 'Kick', src: "/RP4_KICK_1.mp3" },
    { key: 'C', sound: 'Closed-HH', src: "/Cev_H2.mp3" }
  ];

  const [clickedButton, setClickedButton] = useState("")
  const audioRef = useRef<HTMLAudioElement[]>([])
  useEffect(() => {
    function keyPressAudio(e: KeyboardEvent) {
      console.log(e.key)
      audioRef.current?.map(ref => {
        if (ref.id === e.key) ref.play()
      })
    }
    addEventListener("keypress", keyPressAudio)

    return () => removeEventListener("keypress", keyPressAudio)

  }, [])
  return (
    <div id="drum-machine" className=" w-screen h-screen flex justify-center items-center bg-black text-white ">
      <div className=" w-[50%] h-[50%] bg-blue-700 flex justify-around items-center">
        <div className=" bg-gray-200 text-black h-full w-[60%] ">
          <div id="" className="  w-44 h-20 flex flex-wrap ">
            {keysAndSounds.map((item, index) => (
              <button className=" drum-pad w-10 h-10 border-2 border-red-300 text-white "
                key={index}
                id={item.sound}
                onClick={() => {
                  setClickedButton(item.sound)
                  audioRef.current?.map(ref => {
                    if (ref.id === item.key) ref.play()
                  })
                }}
              >
                {item.key}
                <audio
                  key={index}
                  src={item.src}
                  ref={elem => audioRef.current[index] = elem!} id={item.key}
                  className="clip"  >
                </audio>
              </button>
            ))}
          </div>
        </div>
        <div className=" bg-gray-200 text-black   h-full w-[35%] " >
          <div id="display" className=" bg-black text-white ">{clickedButton}</div></div>
      </div>
    </div>
  )
}

export default App
