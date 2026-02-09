
let arr = [1,4,4,6,3,3,1,8];

function insertionSort(arr){
    let n = arr.length;
    let sorted = [...arr];
    for(let i = 1; i < n; ++i){
        let key = sorted[i];
        let j = i - 1;

        while(j >= 0 && sorted[j] > key){
            sorted[j + 1] = sorted[j];
            --j;
        }

        sorted[j + 1] = key;
    }

    return sorted;
}

console.log(insertionSort(arr));