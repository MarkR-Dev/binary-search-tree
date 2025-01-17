import Node from "./node.mjs";

class Tree {
  constructor(array) {
    // Remove duplicate values and sort array
    const formattedArray = [...new Set(array)];
    formattedArray.sort((a, b) => a - b);
    this.root = this.buildTree(formattedArray);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);

    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // Insert all new values as leaf nodes, ignores any duplicate values
  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      const leaf = new Node(value);
      return leaf;
    }

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.insert(value, currentNode.right);
    }

    return currentNode;
  }

  delete(value, currentNode = this.root) {
    // Check for if root node is target to delete
    if (
      currentNode !== null &&
      (currentNode.left === null) & (currentNode.right === null) &&
      value === currentNode.data
    ) {
      this.root = null;
      return;
    }

    // Find target value
    let parent = null;
    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) {
        parent = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parent = currentNode;
        currentNode = currentNode.right;
      }
    }

    // Reached a null node meaning value to delete is not in the tree or the tree is empty
    if (currentNode === null) {
      return;
    }

    // First checks if node to remove has 2 children, then 1 child or no children
    // For two children finds inorder successor and removes it and sets the target to remove as the value of the successor
    // For one child points the parent to the child of the node to remove
    // If the value is a leaf simply remove it by setting it's parents pointer to that node to null
    if (currentNode.left && currentNode.right) {
      let nextLargest = currentNode.right;
      while (nextLargest.left !== null) {
        nextLargest = nextLargest.left;
      }
      this.delete(nextLargest.data, this.root);
      currentNode.data = nextLargest.data;
    } else if (currentNode.left || currentNode.right) {
      const child = currentNode.left || currentNode.right;

      if (parent === null) {
        this.root = child;
        return;
      }

      if (parent.left && parent.left.data === value) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    } else {
      if (parent.left && parent.left.data === value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }

  deleteRec(value) {
    this.root = this.deleteNode(value, this.root);
  }

  deleteNode(value, currentNode = this.root) {
    // Base case
    if (currentNode === null) {
      return currentNode;
    }

    // Search for node to delete
    if (value < currentNode.data) {
      currentNode.left = this.deleteNode(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteNode(value, currentNode.right);
    } else {
      // Handle case for node having 1 or 0 children
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }

      // Handle case for node having 2 children
      currentNode.data = this.minValue(currentNode.right);

      currentNode.right = this.deleteNode(currentNode.data, currentNode.right);
    }

    return currentNode;
  }

  minValue(node) {
    let minVal = node.data;
    while (node.left !== null) {
      minVal = node.left.data;
      node = node.left;
    }
    return minVal;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  // Uses a queue to implement breadth-first traversal
  levelOrder(callback) {
    if (!callback) {
      throw new Error("A callback function must be provided to levelOrder");
    }

    let queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length) {
      let currentNode = queue.shift();
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }

      callback(currentNode);
    }
  }

  levelOrderRec(callback, queue = [this.root]) {
    if (!callback) {
      throw new Error("A callback function must be provided to levelOrderRec");
    }

    if (queue.length === 0 || this.root === null) {
      return;
    }

    let currentNode = queue.shift();

    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    callback(currentNode);

    this.levelOrderRec(callback, queue);
  }

  preOrder(callback, currentNode = this.root) {
    if (!callback) {
      throw new Error("A callback function must be provided to preOrder");
    }

    if (currentNode === null) {
      return;
    }

    callback(currentNode);
    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  // A balanced tree will output elements in ascending order
  inOrder(callback, currentNode = this.root) {
    if (!callback) {
      throw new Error("A callback function must be provided to preOrder");
    }

    if (currentNode === null) {
      return;
    }

    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    if (!callback) {
      throw new Error("A callback function must be provided to preOrder");
    }

    if (currentNode === null) {
      return;
    }

    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
  }

  height(currentNode = this.root) {
    if (currentNode === null) {
      return -1;
    }

    let left = 0;
    let right = 0;

    if (currentNode.left) {
      left = 1 + this.height(currentNode.left);
    }
    if (currentNode.right) {
      right = 1 + this.height(currentNode.right);
    }

    return left > right ? left : right;
  }

  depth(node = this.root) {
    if (node === null) {
      return -1;
    }

    let depth = 0;
    let currentNode = this.root;

    while (currentNode !== node) {
      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      depth++;
    }

    return depth;
  }

  depthRec(node, parent = this.root) {
    if (parent === null) {
      return -1;
    }

    if (node.data === parent.data) {
      return 0;
    }

    if (node.data < parent.data) {
      return 1 + this.depthRec(node, parent.left);
    }

    if (node.data > parent.data) {
      return 1 + this.depthRec(node, parent.right);
    }
  }

  // Check every node's height of left and right subtrees,
  // returns false if any height difference is greater than 1 (imbalanced)
  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }
    const leftSubtreeHeight = this.height(root.left);
    const rightSubtreeHeight = this.height(root.right);

    const leftBalanced = this.isBalanced(root.left);
    const rightBalanced = this.isBalanced(root.right);

    return (
      Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1 &&
      leftBalanced &&
      rightBalanced
    );
  }

  rebalance() {
    const newArr = [];
    this.inOrder((node) => newArr.push(node.data));

    this.root = this.buildTree(newArr);
  }
}

export default Tree;
