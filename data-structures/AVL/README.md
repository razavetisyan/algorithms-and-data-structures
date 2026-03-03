📌 Description

An AVL Tree is a self-balancing Binary Search Tree (BST).
After every insertion or deletion, the tree automatically rebalances itself using rotations to maintain optimal height.

The algorithm was invented by
Georgy Adelson-Velsky and
Evgenii Landis in 1962.

🌳 AVL Tree Properties

1. Left subtree values < node value

2. Right subtree values > node value

3. For every node:

| balance factor | ≤ 1

balance factor = height(left subtree) - height(right subtree)

⏱ Time Complexity

| Operation | Time Complexity |
| --------- | --------------- |
| Insert    | O(log n)        |
| Delete    | O(log n)        |
| Search    | O(log n)        |
| Traversal | O(n)            |

🏗 Class Structure

class Node {
    value;
    left = null;
    right = null;
    height = 1;
}

🔹 Public Methods
Basic Methods

1. size() → Returns number of nodes

2. isEmpty() → Returns true if tree is empty

3. clear() → Removes all nodes


Core Operations

1. insert(value) → Inserts a new value

2. delete(value) → Removes a value

3. search(value) → Returns true or false

4. getMin() → Returns minimum node

5. getMax() → Returns maximum node

6. getHeight() → Returns tree height


Traversal Methods

1. level_order() → Breadth-first traversal

2. inorder_rec() → Inorder (recursive)

3. inorder_itr() → Inorder (iterative)

4. preorder_rec() → Preorder (recursive)

5. preorder_itr() → Preorder (iterative)

6. postorder_rec() → Postorder (recursive)

7. postorder_itr() → Postorder (iterative)

8. toArray() → Returns sorted array of values


🔄 Rotations

AVL Tree uses four types of rotations to rebalance:

1. Left Rotation (RR case)

2. Right Rotation (LL case)

3. Left-Right Rotation (LR case)

4. Right-Left Rotation (RL case)

5. Rotations maintain BST properties while restoring balance.