

let arr = [5,4,3,2,1];

function foo(arr){
    let tmp = 0;
    let size = arr.length;

    for(let i = 0; i < size - 1; ++i){
        let flag = true;
        for(let j = 0; j < size - i - 1; ++j){
            if(arr[j] > arr[j + 1]){
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                flag = false;
            }
            if(flag){
                return arr;
            }
        }
    }

    return arr;
}

console.log(foo(arr));