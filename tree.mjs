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
}

export default Tree;
