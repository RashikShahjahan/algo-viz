export default async function insertionsort(unsorted: number[], callback: any, sorted: number[] = []){
    if(unsorted.length === 0){
        return sorted
    }

    const elemToSort = unsorted.shift();
    let idxtoSplice = 0;
    for (let i = 0; i < sorted.length; i++) {
        if (elemToSort>sorted[i]){
            idxtoSplice = i+1;
        }
    };

    const newSorted = sorted.toSpliced(idxtoSplice, 0, elemToSort);
    await callback(newSorted,unsorted);
    return insertionsort(unsorted,callback,newSorted);
  }