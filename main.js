import mergeSort from './merge.js';
import prettyPrint from './prettyPrint.js';

function Node() {
  let _data = null;
  let _left = null;
  let _right = null;

  const setData = (data) => _data = data;
  const setLeft = (left) => _left = left;
  const setRight = (right) => _right = right;

  const data = () => _data;
  const left = () => _left;
  const right = () => _right;

  return {data, left, right, setData, setLeft, setRight};
}

function Tree(arr) {
  // use mergesort from the previous assignment
  arr = mergeSort(arr);

  // remove duplicates
  // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  arr = [...new Set(arr)];
  console.log(...arr);

  let _tree = buildTree(arr, 0, arr.length - 1);

  const tree = () => _tree;    
  const insert = (key) => insertRec(_tree, key); 

  return { tree, insert };
}

function insertRec(root, key) {
  if (root === null) {
    root = Node();
    root.setData(key);
    return root;
  }
  
  if (key < root.data()) {
    root.setLeft(insertRec(root.left(), key));
  } else if (key > root.data()) {
    root.setRight(insertRec(root.right(), key));
  }
  
  return root;
}

function buildTree(arr, start, end) {
  if (start > end) return null;

  let mid = parseInt((start + end) / 2);
  let root = Node();
  root.setData(arr[mid]);
  root.setLeft(buildTree(arr, start, mid - 1));
  root.setRight(buildTree(arr, mid + 1, end));

  return root;
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);
prettyPrint(tree.tree());
tree.insert(56);
tree.insert(57);
tree.insert(58);
prettyPrint(tree.tree());
