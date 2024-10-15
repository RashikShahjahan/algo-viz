"use client"

import { ChangeEvent, useEffect, useState } from "react"

export default function Page() {
  const [selected,setSelected] = useState("Linear Search");
  const [curr, setCurr] = useState(1);
  const [tree,setTree] = useState(false);

  const target = 7;
  const items = [1,2,3,4,5,6,7,8];

  const treeData = {
    value: 1,
    left: {
      value: 2,
      left: { value: 4 },
      right: { value: 5 },
    },
    right: {
      value: 3,
      left: { value: 6 },
      right: { value: 7 },
    },
  };

  const Arr = () => {

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {items.map((item, index) => {
          let bgColor = "bg-yellow-100"

          if (curr === item){
            bgColor = "bg-blue-100"
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

  type TreeNodeProps={
    value:number;
    left:object;
    right:object; 
  }

  const TreeNode = (props:TreeNodeProps ) => {
    let bgColor = "bg-yellow-100"

    if (curr === props.value){
      bgColor = "bg-blue-100"
    }
    return (
      <div className="flex flex-col items-center">
        <div className={`${bgColor} border rounded-md px-4 py-2 shadow-md text-center font-medium text-lg`}>
          {props.value}
        </div>
        <div className="flex mt-4 space-x-4">
          {props.left && <TreeNode {...props.left}/>}
          {props.right && <TreeNode {...props.right} />}
        </div>
      </div>
    );
  };
  
  const BinaryTree = () => {

  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <TreeNode {...treeData} />
      </div>
    );
  };
  

  const onButtonCLick = async ()=>{
    if(selected === "Linear Search"){
      setCurr(1)
      await LinearSearch()
    }
    else if(selected === "Binary Search"){
      setCurr(4);
      await BinarySearch();
    }
    else if(selected === "Breadth-First Search (BFS)"){
      setCurr(1);
      await BreadthFirstSearch();
    }
    else if(selected === "Depth-First Search (DFS)"){
      setCurr(1);
      await DepthFirstSearch();
    }

  }
  

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        setSelected(e.target.value);
        if(e.target.value === "Depth-First Search (DFS)" || e.target.value === "Breadth-First Search (BFS)" ){
          setTree(true);
        }
        else{
          setTree(false);
        }
  };

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  const LinearSearch = async () =>{
    for (let item of items) {
      await delay(500);
      if (item === target) {
        setCurr(item)
        return;
      }
      setCurr(item);
    }
  };
  

  const BinarySearch = async () =>{
      let lo =0;
      let hi = items.length-1;
      let mid;

      while( lo<=hi-1){
        await delay(500);
        mid = Math.floor((lo+hi)/2);
        setCurr(items[mid]);
        if (items[mid] === target){
          return;
        }
        else if(mid > target){
          hi = mid-1;
        }
        else if(mid < target){
          lo = mid+1;
        }

      }
  }

  const BreadthFirstSearch = async () =>{
    let queue = [treeData];
    while (queue.length !=0){
      await delay(500);
      const node = queue.shift();
      const val = node?.value;
      setCurr(val);
      console.log(val)
      if (val === target){
        return;
      }
      queue.push(node.left);
      queue.push(node.right);
    }

  }



  const DepthFirstSearch = async () =>{
    let stack = [treeData];
    while (stack.length !=0){
      await delay(500);
      const node = stack.pop();
      const val = node?.value;
      setCurr(val);
      console.log(val)
      if (val === target){
        return;
      }
      stack.push(node.left);
      stack.push(node.right);
    }  
  }
  



    return (
      <div>
        <select  onChange={(e)=>onChangeHandler(e)}>
          <option value="Linear Search">Linear Search</option>
          <option value="Binary Search">Binary Search</option>
          <option value="Depth-First Search (DFS)">Depth-First Search (DFS)</option>
          <option value="Breadth-First Search (BFS)">Breadth-First Search (BFS)</option>
        </select>
        <button onClick={(e)=>onButtonCLick()}>Start</button>
          {tree && <BinaryTree/>}
          {!tree && <Arr/>}

      </div>
    )
  }
