import Tree from "./tree.mjs";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

tree.prettyPrint();

tree.insert(50);
tree.insert(2);
tree.insert(24);

tree.prettyPrint();
