"use client"
import { ChangeEvent,useState } from "react"
import Insertion from "./insertion";

export default function Page() {
  const [selected,setSelected] = useState("Bubble");
  const [leftSwap,setLeftSwap] = useState(1);
  const [rightSwap,setRightSwap] = useState(1);
  const [items, setItems] = useState([5, 3, 8, 4, 2, 1, 7, 6]);


  const Arr = () => {
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
          )
        }
      )}
      </div>
    );
  };

  
  const Bubble = async () => {
    let arr = [...items]; 
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setLeftSwap(arr[j]);
        setRightSwap(arr[j + 1]);

        await delay(500); 

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setItems([...arr]);
        }
      }
    }
  };

  const Selection = async () => {
    let arr = [...items]; 
    for (let j = 0; j < arr.length; j++) {
      let minidx =j;
      setLeftSwap(arr[minidx]);
      for (let i = j+1; i < arr.length; i++) {
          if(arr[minidx]>arr[i]){
              minidx = i;
              console.log(minidx)
          }
      }
      setRightSwap(arr[minidx]);
      let temp = arr[j];
      arr[j] = arr[minidx];
      arr[minidx] = temp;
      setItems([...arr]);
      await delay(500);
    }
  }

  const onButtonCLick = async ()=>{
    if(selected === "Bubble"){
      Bubble();
    }
    else if(selected === "Selection"){
      Selection();
    }
    else if(selected === "Insertion"){
      Insertion(items,console.log);
    }
    else if(selected === "Merge"){
    }
    else if(selected === "Quick"){
    }

  }
  

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        setSelected(e.target.value);
  };

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

 
    return (
      <div>
        <select  onChange={(e)=>onChangeHandler(e)}>
          <option value="Bubble">Bubble Sort</option>
          <option value="Selection">Selection Sort</option>
          <option value="Insertion">Insertion Sort</option>
          <option value="Merge">Merge Sort</option>
          <option value="Quick">Quick Sort</option>
        </select>
        <button onClick={(e)=>onButtonCLick()}>Start</button>
      <Arr/>
      </div>
    )
  }


