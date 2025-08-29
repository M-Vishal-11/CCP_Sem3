"use client";
import axios from "axios";

export default function Home() {
  async function handleOn() {
    const res = axios.post("http://192.168.1.200/on");
    console.log(await res);
  }

  async function handleOff() {
    const res = axios.post("http://192.168.1.200/off");
    console.log(await res);
  }

  return (
    <div>
      <div className="w-full mt-[5vh] flex flex-col justify-center items-center gap-5">
        <button
          onClick={() => {
            handleOn();
          }}
          className="bg-blue-300 hover:bg-blue-400 active:bg-blue-400 text-2xl font-bold text-black p-3 rounded-xl"
        >
          Turn On!
        </button>
        <button
          onClick={() => {
            handleOff();
          }}
          className="bg-blue-300 hover:bg-blue-400 active:bg-blue-400 text-2xl font-bold text-black p-3 rounded-xl"
        >
          Turn Off!
        </button>
      </div>
    </div>
  );
}
