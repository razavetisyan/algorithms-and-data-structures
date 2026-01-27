
let arr = [1,4,4,6,3,3,1,8];

function countingSort(arr){
    let n = arr.length;
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let count = new Array(max - min + 1).fill(0);

    for(let i = 0; i < n; ++i){
        count[arr[i] - min]++;
    }

    let sorted = [];
    
    for(let i = 0; i < count.length; ++i){
        while(count[i] > 0){
            sorted.push(i + min);
            count[i]--;
        }
    }

    return sorted;
}

console.log(countingSort(arr))