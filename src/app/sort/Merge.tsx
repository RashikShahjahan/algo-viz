"use client"
import {useState } from "react"
import mergesort from "./mergesort";

export default function Merge() {
  const [steps, setSteps] = useState<number[][]>([]);
  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  const callbackMerge = async (merged:number[], level:number)=>{
    await delay(500);
    setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[level] = newSteps[level] ? [...newSteps[level]] : [];
        newSteps[level].push(merged);
        return newSteps;
      });
    console.log(steps,level,merged);
  };

    async function onButtonCLick(): Promise<void> {
        await mergesort([2,6,5,1,7,4,8,3], callbackMerge, 0);
    }
    const items = [2,6,5,1,7,4,8,3];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-4">
          {items.map((item, index) => {
            let bgColor = "bg-yellow-100";
            return(
              <div
              key={index}
              className={`${bgColor} p-6 rounded-lg shadow-md text-center font-medium text-lg`}
            >
              {item}
            </div>
            )})}
            <button onClick={()=>onButtonCLick()}>Start</button>
    
            </div>
            )
    }
