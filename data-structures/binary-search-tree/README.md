🧩 Binary Search Tree (BST) — JavaScript Implementation

A fully featured Binary Search Tree (BST) written in modern JavaScript (ES2022+), with private class fields, full traversal algorithms, height calculation, and delete operations using the standard BST rules.

It also includes recursive and iterative traversal methods, level-order traversal using a queue, and comprehensive unit tests.

🚀 Features

✅ Object-Oriented Design with #private fields

✅ insert() — recursive insertion

✅ delete() — supports deleting nodes with 0, 1, or 2 children

✅ find_min() / find_max()

✅ get_height() — BFS-based level height

✅ is_empty() — size check

✅ Traversals:

inorder_rec() / inorder_itr()

preorder_rec() / preorder_itr()

postorder_rec() / postorder_itr()

level_order()

✅ TEST

let tree = new BST();

tree.insert(10);
tree.insert(5);
tree.insert(20);
tree.insert(3);
tree.insert(7);
tree.insert(15);
tree.insert(30);

console.log("Size:", tree.size());              // 7
console.log("Min:", tree.find_min());           // 3
console.log("Max:", tree.find_max());           // 30
console.log("Height:", tree.get_height());      // 3
console.log("Depth of 15:", tree.get_depth(15));
console.log("Contains 7:", tree.contains(7));   // true
console.log("Balanced:", tree.is_balanced());   // true
console.log("Valid BST:", tree.validate_BST());// true

console.log("Inorder:", tree.toArray());        // [3,5,7,10,15,20,30]

console.log("Iterator:");
for (let v of tree) {
  console.log(v);
}

console.log("Entries:");
for (let e of tree.entries()) {
  console.log(e);
}

let clone = tree.clone();
console.log("Equals clone:", tree.equals(clone)); // true