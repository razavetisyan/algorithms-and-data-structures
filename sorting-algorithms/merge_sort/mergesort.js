
let arr = [4,3,6,5,8,7,10,9];

function mergeSort(arr, left, right){
    let mid = Math.floor(left + (right - left) / 2);

    if(left >= right){
        return;
    }
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);

    return arr;
}

function merge(arr, left, mid, right){
    let start1 = left;
    let end1 = mid;
    let start2 = mid + 1;
    let end2 = right;
    let res = [];

    while(start1 <= end1 && start2 <= end2){
        if(arr[start1] > arr[start2]){
            res.push(arr[start2]);
            ++start2;
        }else{
            res.push(arr[start1]);
            ++start1;
        }
    }

    while(start1 <= end1){
        res.push(arr[start1]);
        ++start1;
    }

    while(start2 <= end2){
        res.push(arr[start2]);
        ++start2;
    }

    for(let i = 0; i < res.length; ++i){
        arr[left] = res[i];
        ++left;
    }
    return res;
}
console.log(mergeSort(arr, 0, arr.length - 1));
