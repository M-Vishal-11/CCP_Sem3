"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface SensorData {
  moisturePercent: number;
  soilStatus: string;
  temperature: number;
  humidity: number;
  relayStatus: number;
}

export default function Home() {
  const [dataList, setDataList] = useState<SensorData[]>([]);

  useEffect(() => {
    const dealInterval = setInterval(async () => {
      try {
        const res = await axios.get<SensorData>("http://192.168.1.200/getData");
        const newData = res.data;
        setDataList((prevList) => [newData, ...prevList].slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(dealInterval);
  }, []);

  async function handleOn() {
    await axios.post("http://192.168.1.200/on");
  }

  async function handleOff() {
    await axios.post("http://192.168.1.200/off");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 p-6 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-900 mb-2">
          🌱 GreenCity Dashboard
        </h1>
        <p className="text-lg text-green-800">
          Irrigation Monitoring System - Vishal
        </p>
      </header>

      <div className="flex justify-center gap-6 mb-10">
        <button
          onClick={handleOn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-200"
        >
          Turn On 💧
        </button>
        <button
          onClick={handleOff}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-200"
        >
          Turn Off ❌
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataList.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-5 border-l-8 border-green-500 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-3 text-green-900">
              Reading #{index + 1}
            </h2>
            <p className="text-gray-700 mb-1">
              🌡 Temp: <span className="font-bold">{item.temperature} °C</span>
            </p>
            <p className="text-gray-700 mb-1">
              💧 Humidity: <span className="font-bold">{item.humidity} %</span>
            </p>
            <p className="text-gray-700 mb-1">
              🌱 Moisture:{" "}
              <span className="font-bold">{item.moisturePercent} %</span>
            </p>
            <p
              className={`mb-1 font-bold ${
                item.soilStatus === "Dry" ? "text-red-600" : "text-blue-600"
              }`}
            >
              {item.soilStatus === "Dry" ? "🌵 Dry" : "💦 Wet"}
            </p>
            <p
              className={`font-bold ${
                item.relayStatus ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Motor: {item.relayStatus ? "💧 On" : "🛑 Off"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
