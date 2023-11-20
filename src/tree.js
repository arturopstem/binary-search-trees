import Queue from './queue';
import Node from './node';
import { prettyPrint } from './util';

function buildTree(arr, start, end) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

function insertBST(key, root) {
  let pointer = root;
  if (pointer == null) {
    pointer = new Node(key);
    return pointer;
  }
  if (key < root.data) {
    pointer.left = insertBST(key, pointer.left);
  } else if (key > root.data) {
    pointer.right = insertBST(key, pointer.right);
  }

  return pointer;
}

function deleteBST(key, root) {
  const pointer = root;
  if (pointer == null) {
    return pointer;
  }

  if (key < pointer.data) {
    pointer.left = deleteBST(key, pointer.left);
    return pointer;
  }
  if (key > pointer.data) {
    pointer.right = deleteBST(key, pointer.right);
    return pointer;
  }
  if (pointer.left == null) {
    const temp = pointer.right;
    return temp;
  }
  if (pointer.right == null) {
    const temp = pointer.left;
    return temp;
  }
  let succParent = pointer;
  let succ = pointer.right;
  while (succ.left != null) {
    succParent = succ;
    succ = succ.left;
  }
  if (succParent !== pointer) {
    succParent.left = succ.right;
  } else {
    succParent.right = succ.right;
  }
  pointer.data = succ.data;
  return pointer;
}

function findBST(key, root) {
  if (root == null) {
    return undefined;
  }
  if (key < root.data) {
    return findBST(key, root.left);
  }
  if (key > root.data) {
    return findBST(key, root.right);
  }
  return root;
}

function levelOrderTraversal(queue, callbackFn) {
  if (queue.isEmpty()) {
    return [];
  }
  const node = queue.peek();
  if (callbackFn) {
    callbackFn(node);
  }
  if (node.left) {
    queue.enqueue(node.left);
  }
  if (node.right) {
    queue.enqueue(node.right);
  }
  queue.dequeue();
  const arr = levelOrderTraversal(queue, callbackFn);
  return callbackFn ? undefined : [node.data, ...arr];
}

function preOrderTraversal(node, callbackFn) {
  if (node == null) {
    return [];
  }
  if (callbackFn) {
    callbackFn(node);
  }
  const leftArr = preOrderTraversal(node.left, callbackFn);
  const rightArr = preOrderTraversal(node.right, callbackFn);

  return callbackFn ? undefined : [node.data, ...leftArr, ...rightArr];
}

function inOrderTraversal(node, callbackFn) {
  if (node == null) {
    return [];
  }
  const leftArr = inOrderTraversal(node.left, callbackFn);
  if (callbackFn) {
    callbackFn(node);
  }
  const rightArr = inOrderTraversal(node.right, callbackFn);

  return callbackFn ? undefined : [...leftArr, node.data, ...rightArr];
}

function postOrderTraversal(node, callbackFn) {
  if (node == null) {
    return [];
  }
  const leftArr = postOrderTraversal(node.left, callbackFn);
  const rightArr = postOrderTraversal(node.right, callbackFn);
  if (callbackFn) {
    callbackFn(node);
  }

  return callbackFn ? undefined : [...leftArr, ...rightArr, node.data];
}

function heightBST(node) {
  if (node == null) {
    return 0;
  }
  const left = node.left ? 1 + heightBST(node.left) : 0;
  const right = node.right ? 1 + heightBST(node.right) : 0;
  return Math.max(left, right);
}

function depthBST(node, root) {
  if (root.data === node.data) {
    return 0;
  }
  let depth;
  if (node.data < root.data) {
    depth = 1 + depthBST(node, root.left);
  }
  if (node.data > root.data) {
    depth = 1 + depthBST(node, root.right);
  }
  return depth;
}

class Tree {
  constructor(arr) {
    const set = new Set(arr);
    const sortedArr = Array.from(set).sort((a, b) => a - b);
    this.root = buildTree(sortedArr, 0, sortedArr.length - 1);
  }

  print() {
    prettyPrint(this.root);
  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
      return this.root;
    }
    return insertBST(key, this.root);
  }

  delete(key) {
    return deleteBST(key, this.root);
  }

  find(key) {
    if (key == null) {
      return undefined;
    }
    return findBST(key, this.root);
  }

  levelOrder(callbackFn) {
    if (this.root == null) {
      return undefined;
    }
    const queue = new Queue();
    queue.enqueue(this.root);
    return levelOrderTraversal(queue, callbackFn);
  }

  preOrder(callbackFn) {
    if (this.root == null) {
      return undefined;
    }
    return preOrderTraversal(this.root, callbackFn);
  }

  inOrder(callbackFn) {
    if (this.root == null) {
      return undefined;
    }
    return inOrderTraversal(this.root, callbackFn);
  }

  postOrder(callbackFn) {
    if (this.root == null) {
      return undefined;
    }
    return postOrderTraversal(this.root, callbackFn);
  }

  height(node) {
    if (this.root == null || node == null) {
      return undefined;
    }
    return heightBST(node);
  }

  depth(node) {
    if (this.root == null || node == null) {
      return undefined;
    }
    return depthBST(node, this.root);
  }

  isBalanced() {
    if (this.root == null) {
      return undefined;
    }
    let left = 0;
    let right = 0;
    if (this.root.left) {
      left = 1 + this.height(this.root.left);
    }
    if (this.root.right) {
      right = 1 + this.height(this.root.right);
    }
    return Math.abs(left - right) < 2;
  }

  rebalance() {
    if (this.root != null) {
      const sortedArr = this.inOrder();
      this.root = buildTree(sortedArr, 0, sortedArr.length - 1);
    }
  }
}

export default Tree;
