"use client"
import { ChangeEvent,useState } from "react"
import Bubble from "./Bubble";
import Selection from "./Selection";
import Insertion from "./Insertion";

export default function Page() {
  const [selected,setSelected] = useState("Bubble");

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        setSelected(e.target.value);
        }

    return (
      <div>
        <select  onChange={(e)=>onChangeHandler(e)}>
          <option value="Bubble">Bubble Sort</option>
          <option value="Selection">Selection Sort</option>
          <option value="Insertion">Insertion Sort</option>
          <option value="Merge">Merge Sort</option>
          <option value="Quick">Quick Sort</option>
        </select>
        {selected==="Bubble"&&<Bubble/>}
        {selected==="Selection"&&<Selection/>}
        {selected==="Insertion"&&<Insertion/>}


      </div>
    )
  }


