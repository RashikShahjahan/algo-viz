export default async function mergesort(array:number[],callbackMerge:any,level:number){
    if (array.length <= 1){
        return array
    }
    const splitidx = Math.ceil(array.length/2);
    level++;
    const left =  await mergesort(array.slice(0,splitidx),callbackMerge,level);
    const right = await mergesort(array.slice(splitidx),callbackMerge,level);
    const merged = merge(left,right);
    await callbackMerge(merged,level)
    return merged
  }

  function merge(left:number[],right:number[]){
    const merged = [];    
    let l = 0;
    let r = 0;
    while(l<left.length && r<right.length){
        if(left[l]<right[r]){
            merged.push(left[l]);
            l=l+1;
        }
        else{
            merged.push(right[r]);
            r=r+1;
        }
    }

    while(l<left.length ){
        merged.push(left[l]);
        l=l+1;
    }

    while(r<right.length ){
        merged.push(right[r]);
        r=r+1;
    }

    return merged

  }