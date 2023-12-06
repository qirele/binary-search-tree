function Node(data1 = null, left1 = null, right1 = null) {
  let data = data1;
  let left = left1;
  let right = right1;

  // const setData = (data) => data = data;
  // const setLeft = (left) => left = left;
  // const setRight = (right) => right = right;

  const getData = () => data;
  const getLeft = () => left;
  const getRight = () => right;

  return {getData, getLeft, getRight}
}

function Tree(arr) {
  let root = buildTree(arr);

    
}
