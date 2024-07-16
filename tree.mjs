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
    console.log(array);
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
}

export default Tree;
