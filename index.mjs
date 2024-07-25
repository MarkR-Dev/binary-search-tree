import Tree from "./tree.mjs";

function randomArray() {
  const arr = [];
  const size = Math.floor(Math.random() * 50 + 1);

  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100 + 1));
  }

  return arr;
}

const tree = new Tree(randomArray());

tree.prettyPrint();

console.log("\nIs balanced:", tree.isBalanced());

const preorder = [];
tree.preOrder((node) => preorder.push(node.data));

const inorder = [];
tree.inOrder((node) => inorder.push(node.data));

const postorder = [];
tree.postOrder((node) => postorder.push(node.data));

console.log("Preoder:", preorder);
console.log("Inoder:", inorder);
console.log("Postoder:", postorder);

for (let i = 0; i < 10; i++) {
  tree.insert(Math.floor(Math.random() * 10 + 100));
}

tree.prettyPrint();

console.log("\nIs balanced:", tree.isBalanced());
console.log("Rebalancing...");
tree.rebalance();
tree.prettyPrint();
console.log("\nIs balanced:", tree.isBalanced());

preorder.length = 0;
inorder.length = 0;
postorder.length = 0;
tree.preOrder((node) => preorder.push(node.data));
tree.inOrder((node) => inorder.push(node.data));
tree.postOrder((node) => postorder.push(node.data));

console.log("\nPreoder:", preorder);
console.log("Inoder:", inorder);
console.log("Postoder:", postorder);
