let arr = [1, 4, 4, 6, 3, 3, 1, 8];

function selectionSort(arr) {
  let n = arr.length;
  let sorted = [...arr];
  for (let i = 0; i < n; ++i) {
    let min = i;

    for (let j = i + 1; j < n; ++j) {
      if (sorted[min] > sorted[j]) {
        min = j;
      }
    }

    [sorted[min], sorted[i]] = [sorted[i], sorted[min]];
  }
  
  return sorted;
}

console.log(selectionSort(arr));
