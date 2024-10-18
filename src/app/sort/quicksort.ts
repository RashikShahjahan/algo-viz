export default async function quicksort(array:number[],callback:any){
    if(array.length <=1){
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    
    const left = array.filter(x => x < pivot);
    const middle = array.filter(x => x === pivot);
    const right = array.filter(x => x > pivot);

    const sortedLeft = await quicksort(left, callback);
    const sortedRight = await quicksort(right, callback);

    const merged = [...sortedLeft, ...middle, ...sortedRight];
    
    for (let i = 0; i < merged.length; i++) {
        array[i] = merged[i];
    }
    await callback(array,pivot);

    return merged;
}