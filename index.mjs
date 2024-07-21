import Tree from "./tree.mjs";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

tree.prettyPrint();
tree.insert(6);
tree.deleteRec(4);
tree.prettyPrint();

console.log(tree.find(6));
