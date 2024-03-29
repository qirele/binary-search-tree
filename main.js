import mergeSort from "./merge.js";
import prettyPrint from "./prettyPrint.js";

function Node() {
  let _data = null;
  let _left = null;
  let _right = null;

  const setData = (data) => (_data = data);
  const setLeft = (left) => (_left = left);
  const setRight = (right) => (_right = right);

  const data = () => _data;
  const left = () => _left;
  const right = () => _right;

  return { data, left, right, setData, setLeft, setRight };
}

function Tree(arr) {
  // use mergesort from the previous assignment
  arr = mergeSort(arr);

  // remove duplicates
  // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  arr = [...new Set(arr)];

  let _root = buildTree(arr, 0, arr.length - 1);

  const root = () => _root;
  const insert = (value) => insertRec(_root, value);
  const deleteNode = (root, value) => deleteRec(root, value);
  const find = (value) => findRec(_root, value);
  const levelOrder = (cb) => _levelOrder(_root, cb);
  const inOrder = (cb) => _inOrder(_root, cb);
  const preOrder = (cb) => _preOrder(_root, cb);
  const postOrder = (cb) => _postOrder(_root, cb);
  const height = (node) => _height(node);
  const depth = (node) => _depth(_root, node);
  const isBalanced = () => {
    let obj = _isBalanced(_root);
    return obj.balanced;
  };

  const rebalance = () => (_root = _rebalance(_root));

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function _rebalance(root) {
  let inOrderArr = _inOrder(root);

  // remove duplicates
  inOrderArr = [...new Set(inOrderArr)];
  return buildTree(inOrderArr, 0, inOrderArr.length - 1);
}

function _isBalanced(root) {
  if (root === null) return { height: 0, balanced: true };

  let objNotBalanced = {
    height: "Its definitely not balanced",
    balanced: false,
  };

  let leftObj = _isBalanced(root.left());
  if (!leftObj.balanced) return objNotBalanced;

  let rightObj = _isBalanced(root.right());
  if (!rightObj.balanced) return objNotBalanced;

  let diff = Math.abs(leftObj.height - rightObj.height);

  if (diff > 1) {
    return objNotBalanced;
  }

  let max = Math.max(leftObj.height, rightObj.height) + 1;
  return { height: max, balanced: true };
}

function _depth(root, node) {
  if (node === -1) return "no such node";

  if (root === null) return 0;

  const rootVal = root.data();
  const nodeVal = node.data();

  if (rootVal === nodeVal) {
    return 1;
  }

  if (rootVal > nodeVal) {
    return _depth(root.left(), node) + 1;
  }

  if (rootVal < nodeVal) {
    return _depth(root.right(), node) + 1;
  }
}

function _height(node) {
  if (node === null) return 0;

  if (node.left() === null && node.right() === null) {
    return 1;
  }

  let leftHeight = _height(node.left());
  let rightHeight = _height(node.right());
  return leftHeight > rightHeight ? ++leftHeight : ++rightHeight;
}

function _postOrder(root, cb) {
  if (root === null) return -1;

  if (cb !== undefined) {
    _postOrder(root.left(), cb);
    _postOrder(root.right(), cb);
    cb(root);
  }

  let arr = [];
  let left = _postOrder(root.left());
  if (left !== -1) arr.push(...left);
  let right = _postOrder(root.right());
  if (right !== -1) arr.push(...right);
  arr.push(root.data());

  return arr;
}

function _preOrder(root, cb) {
  if (root === null) return -1;

  if (cb !== undefined) {
    cb(root);
    _preOrder(root.left(), cb);
    _preOrder(root.right(), cb);
  }

  let arr = [root.data()];
  let left = _preOrder(root.left());
  if (left !== -1) arr.push(...left);
  let right = _preOrder(root.right());
  if (right !== -1) arr.push(...right);

  return arr;
}

function _inOrder(root, cb) {
  if (root === null) return -1;

  let arr = [];

  let left = _inOrder(root.left(), cb);
  if (left !== -1 && left !== undefined) arr.push(...left);

  if (cb !== undefined) cb(root);
  arr.push(root.data());

  let right = _inOrder(root.right(), cb);
  if (right !== -1 && right !== undefined) arr.push(...right);

  if (cb === undefined) return arr;
}

function _levelOrder(root, cb) {
  if (root === null) return;

  let arr = [];
  let queue = [root];

  while (queue.length !== 0) {
    let node = queue.shift();

    if (cb !== undefined) cb(node);
    else arr.push(node.data());

    if (node.left() !== null) queue.push(node.left());
    if (node.right() !== null) queue.push(node.right());
  }

  if (cb === undefined) return arr;
}

function findRec(root, value) {
  if (root === null) return -1;

  if (value < root.data()) {
    return findRec(root.left(), value);
  } else if (value > root.data()) {
    return findRec(root.right(), value);
  } else {
    return root;
  }
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

function deleteRec(root, value) {
  // Base case
  if (root === null) {
    return root;
  }

  // Recursive calls for ancestors of
  // node to be deleted
  if (value < root.data()) {
    root.setLeft(deleteRec(root.left(), value));
    return root;
  } else if (value > root.data()) {
    root.setRight(deleteRec(root.right(), value));
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

// test cases
function randomArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }
  return arr;
}

const arr = randomArray(16);
const tree = Tree(arr);
prettyPrint(tree.root());
console.log(`is tree balanced? ${tree.isBalanced() === true ? `yes` : `no`}`);
console.log(`level order: ${tree.levelOrder()}`);
console.log(`pre order: ${tree.preOrder()}`);
console.log(`post order: ${tree.postOrder()}`);
console.log(`in order (sorted): ${tree.inOrder()}`);
console.log(`Unbalancing the tree:`);
tree.insert(106);
tree.insert(120);
tree.insert(105);
prettyPrint(tree.root());
console.log(`is tree balanced? ${tree.isBalanced() === true ? `yes` : `no`}`);
console.log(`rebalancing the tree:`);
tree.rebalance();
prettyPrint(tree.root());
console.log(`is tree balanced? ${tree.isBalanced() === true ? `yes` : `no`}`);
console.log(`level order: ${tree.levelOrder()}`);
console.log(`pre order: ${tree.preOrder()}`);
console.log(`post order: ${tree.postOrder()}`);
console.log(`in order (sorted): ${tree.inOrder()}`);
