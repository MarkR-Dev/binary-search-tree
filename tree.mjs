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

      // Handle case for having 2 children
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

  levelOrder(callback) {
    let queue = [];
    let outputArr = [];

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

      outputArr.push(currentNode.data);

      if (callback) {
        callback(currentNode);
      }
    }
    return outputArr;
  }

  levelOrderRec(callback, queue = [this.root], outputArr = []) {
    if (queue.length === 0 || this.root === null) {
      return outputArr;
    }

    let currentNode = queue.shift();

    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    outputArr.push(currentNode.data);

    if (callback) {
      callback(currentNode);
    }

    this.levelOrderRec(callback, queue, outputArr);

    return outputArr;
  }
}

export default Tree;
