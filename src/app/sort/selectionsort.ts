export default async function selectionsort(items:number[], callback: any){
    let arr = [...items]; 
    for (let j = 0; j < arr.length; j++) {
        let minidx =j;
        const left = arr[minidx];
        for (let i = j+1; i < arr.length; i++) {
            if(arr[minidx]>arr[i]){
                minidx = i;
                console.log(minidx)
            }
        }
        const right = arr[minidx];
        let temp = arr[j];
        arr[j] = arr[minidx];
        arr[minidx] = temp;
        await callback(arr,left,right)
      }
  };