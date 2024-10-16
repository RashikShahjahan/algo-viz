"use client"
import {useState } from "react"
import insertionsort from "./insertionsort";

export default function Insertion() {
  const [unsorted, setUnSorted] = useState([2,6,5,1,7,4,8,3]);
  const [sorted, setSorted] = useState([]);

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  const callbackFunc= async (sorted:number[],unsorted:number[])=>{
    await delay(500);
    setSorted(sorted);
    setUnSorted(unsorted);
  }

    async function onButtonCLick(): Promise<void> {
        await insertionsort(unsorted,callbackFunc,sorted);
    }

  return (
      
    <div >
        Sorted

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sorted.map((item, index) => {
         const bgColor = "bg-green-100";

        return(
          <div
          key={index}
          className={`${bgColor} p-6 rounded-lg shadow-md text-center font-medium text-lg`}
        >
          {item}
        </div>
        )})}
        </div>
        Unsorted

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {unsorted.map((item, index) => {
         const bgColor = "bg-red-100";

        return(
          <div
          key={index}
          className={`${bgColor} p-6 rounded-lg shadow-md text-center font-medium text-lg`}
        >
          {item}
        </div>
        )})}
        </div>
        <button onClick={(e)=>onButtonCLick()}>Start</button>

        </div>
        )
    }
