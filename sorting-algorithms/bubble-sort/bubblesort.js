
let arr = [1,4,4,6,3,3,1,8];

function bubbleSort(arr){
    let n = arr.length;
    let sorted = [...arr];
    for(let i = 0; i < n - 1; ++i){
        let flag = true;
        for(let j = 0; j < n - 1 - i; ++j){
            if(sorted[j] > sorted[j + 1]){
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                flag = false;
            }
        }

        if(flag){
            return sorted;
        }
    }
    return sorted;
}

console.log(bubbleSort(arr));