
let arr = [1,4,4,6,3,3,1,8];

function cumulativeSort(arr){
    let n = arr.length
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let count = new Array(max - min + 1).fill(0);

    for(let i = 0; i < n; ++i){
        count[arr[i] - min]++;
    }

    for(let i = 1; i < count.length; ++i){
        count[i] += count[i - 1];
    }

    let output = new Array(n).fill(0);

    for(let i = 0; i < n; ++i){
        let value = arr[i];
        let index = value - min;
        let position = count[index] - 1;
        output[position] = value;
        count[index]--;
    }

    return output;
}

console.log(cumulativeSort(arr));