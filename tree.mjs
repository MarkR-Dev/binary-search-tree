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
}

export default Tree;
