import Tree from "./tree.mjs";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr2 = [1, 2];
const arr3 = [];
const tree = new Tree(arr3);

tree.prettyPrint();

console.log(tree.depthRec(tree.root));
