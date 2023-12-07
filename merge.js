export default function mergeSort(arr) {
  if (!arr) return "Bruh input an array dawg";

  if (arr.length === 0) return [];

  if (arr.length === 1) {
    return arr;
  }

  let midIdx = Math.floor((arr.length - 1) / 2);

  // sort left part of array
  let leftArr = mergeSort(arr.slice(0, midIdx + 1))
  
  // sort right part of array
  let rightArr = mergeSort(arr.slice(midIdx + 1))

  // merge em left and right
  let mergedArr = [];
  let i = 0;
  let j = 0;

  // compare A[i] with B[j] until i or j exceeds its array length
  // after its done, copy the remaining elements to the mergedArr
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      mergedArr.push(leftArr[i++])
    } else {
      mergedArr.push(rightArr[j++])
    }
  }
  
  for (; i < leftArr.length; i++) {
    mergedArr.push(leftArr[i]);
  }

  for (; j < rightArr.length; j++) {
    mergedArr.push(rightArr[j]);
  }

  return mergedArr;
}
