import Tree from "./tree.mjs";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

tree.prettyPrint();
tree.insert(56);
tree.insert(57);
tree.insert(-34);
tree.insert(-56);
tree.insert(560);
tree.prettyPrint();
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
