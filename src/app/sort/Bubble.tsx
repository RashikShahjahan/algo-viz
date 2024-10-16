"use client"
import {useState } from "react"
import bubblesort from "./bubblesort";

export default function Bubble() {
  const [leftSwap,setLeftSwap] = useState(0);
  const [rightSwap,setRightSwap] = useState(0);
  const [items, setItems] = useState([2,6,5,1,7,4,8,3]);

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  const callbackFunc= async (arr:number[],j:number)=>{
    setLeftSwap(arr[j]);
    setRightSwap(arr[j + 1]);

    await delay(500); 
    setItems([...arr]);
  }

    async function onButtonCLick(): Promise<void> {
        await bubblesort(items,callbackFunc)
    }

  return (
      
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item, index) => {
        let bgColor = "bg-yellow-100";
        if(item === leftSwap){
          bgColor ="bg-green-100";
        }
        if(item === rightSwap){
          bgColor= "bg-red-100";
        }

        return(
          <div
          key={index}
          className={`${bgColor} p-6 rounded-lg shadow-md text-center font-medium text-lg`}
        >
          {item}
        </div>
        )})}
        <button onClick={(e)=>onButtonCLick()}>Start</button>

        </div>
        )
    }
