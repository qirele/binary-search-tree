# This project implements a Balanced Binary Search Tree (BST) in JavaScript. 

It includes basic operations such as insertion, deletion, searching, and tree traversal. 
Additionally, the project provides a rebalancing feature for maintaining a balanced tree.

## How to run

```
$ node main.js
```

## Tree factory implements these methods:

### `root()`

Returns the root node of the tree.

### `insert(value)`

Inserts a new value into the tree.

### `deleteNode(value)`

Deletes a node with the specified value from the tree.

### `find(value)`

Searches for a node with the specified value in the tree.

### `levelOrder(cb)`

Performs a level-order traversal of the tree and executes a callback function for each node.

### `inOrder(cb)`

Performs an in-order traversal of the tree and executes a callback function for each node.

### `preOrder(cb)`

Performs a pre-order traversal of the tree and executes a callback function for each node.

### `postOrder(cb)`

Performs a post-order traversal of the tree and executes a callback function for each node.

### `height(node)`

Calculates the height of the tree or a specified node.

### `depth(node)`

Calculates the depth of a specified node.

### `isBalanced()`

Checks if the tree is balanced.

### `rebalance()`

Rebalances the tree to ensure better performance.
