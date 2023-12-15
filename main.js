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
  const insert = (value) => insertRec(_tree, value); 
  const deleteValue = (root, value) => deleteNode(root, value);

  return { tree, insert, deleteValue };
}

function insertRec(root, value) {
  if (root === null) {
    root = Node();
    root.setData(value);
    return root;
  }
  
  if (value < root.data()) {
    root.setLeft(insertRec(root.left(), value));
  } else if (value > root.data()) {
    root.setRight(insertRec(root.right(), value));
  }
  
  return root;
}

function deleteNode(root, value) {
  // Base case
  if (root === null) {
    return root;
  }

  // Recursive calls for ancestors of
  // node to be deleted
  if (value < root.data()) {
    root.setLeft(deleteNode(root.left(), value));
    return root;
  } else if (value > root.data()) {
    root.setRight(deleteNode(root.right(), value));
    return root;
  }

  // If one of the children is empty
  // or the root is the leaf node
  if (root.left() === null) {
    return root.right();
  } else if (root.right() === null) {
    return root.left();
  } else {
    // both children exist
    // go right, and then keep going left until null 

    let successorParent = root;
    
    let successor = root.right();
    while (successor.left() !== null) {
      successorParent = successor;
      successor = successor.left();
    }

    if (successorParent !== root) {
      successorParent.setLeft(successor.right());
    } else {
      successorParent.setRight(successor.right());
    }

    root.setData(successor.data());
    
    return root;
  }
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
tree.deleteValue(tree.tree(), 8);
prettyPrint(tree.tree());
