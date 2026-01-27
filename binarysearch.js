
let arr = [1,4,4,6,3,3,1,8];

function binarySearch(arr, target){
    let n = arr.length;
    let start = 0;
    let end = n - 1;

    while(start <= end){
        let mid = Math.floor(start + (end - start) / 2);

        if(arr[mid] === target){
            return mid;
        }else if(arr[mid] < target){
            start = mid + 1;
        }else{
            end = mid - 1;
        }
    }
}

console.log(binarySearch(arr, 8))