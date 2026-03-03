class Node {
  value;
  left = null;
  right = null;
  height = 1;

  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  #root;
  #size = 0;

  constructor() {
    this.#root = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  insert(value) {
    this.#root = this.#insert(this.#root, value);
  }

  delete(value) {
    this.#root = this.#delete(this.#delete, value);
  }

  search(value) {
    return this.#search(this.#root, value);
  }

  getHeight() {
    return this.#getHeight(this.#root);
  }

  getMin() {
    return this.#getMin(this.#root);
  }

  getMax() {
    return this.#getMax(this.#root);
  }

  level_order() {
    if (!this.#root) return;

    let stack = [];
    let current = this.#root;
    stack.push(current);
    let res = [];

    while (stack.length > 0) {
      let node = stack.shift();
      res.push(node.value);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    return res;
  }

  inorder_rec() {
    let res = [];

    return this.#inorder_rec(this.#root, res);
  }

  inorder_itr() {
    if (!this.#root) return;

    let res = [];
    let stack = [];
    let current = this.#root;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      res.push(current.value);
      current = current.right;
    }

    return res;
  }

  preorder_rec() {
    let res = [];

    return this.#preorder_rec(this.#root, res);
  }

  preorder_itr() {
    if (!this.#root) return;

    let res = [];
    let stack = [];
    let current = this.#root;

    while (current || stack.length > 0) {
      while (current) {
        res.push(current.value);
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      current = current.right;
    }

    return res;
  }

  postorder_rec() {
    let res = [];

    return this.#postorder_rec(this.#root, res);
  }

  postorder_itr() {
    if (!this.#root) return;

    let stack1 = [];
    let stack2 = [];
    let current = this.#root;
    let res = [];

    stack1.push(current);

    while (stack1.length > 0) {
      let node = stack1.pop();
      stack2.push(node);

      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    while (stack2.length > 0) {
      res.push(stack2.pop().value);
    }

    return res;
  }

  find_successor(value) {
    let current = this.#root;
    let successor = null;

    if (value < current.value) {
      successor = current;
      current = current.left;
    } else {
      current = current.right;
    }

    return successor ? successor.value : null;
  }

  find_predeccessor(value) {
    let current = this.#root;
    let predecessor = null;

    if (value > current.value) {
      predecessor = current;
      current = current.right;
    } else {
      current = current.left;
    }

    return predecessor ? predecessor.value : null;
  }

  toArray() {
    let res = [];

    const inorder = (node) => {
      if (!node) return;

      inorder(node.left);
      res.push(node.value);
      inorder(node.right);
    };

    inorder(this.#root);

    return res;
  }

  #insert(node, value) {
    if (!node) {
      ++this.#size;
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this.#insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.#insert(node.right, value);
    } else {
      return node;
    }

    node.height = this.#getHeight(node);
    node = this.#reBalance(node);

    return node;
  }

  #delete(node, value) {
    if (!node) return;

    if (value < node.value) {
      node.left = this.#delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.#delete(node.right, value);
    } else {
      let successor = this.getMin(node.right);
      node.value = successor.value;
      node.right = this.#delete(node.right, value);
    }

    node = this.#reBalance(node);

    return node;
  }

  #getHeight(node) {
    if (!node) return 0;

    return (
      Math.max(this.#getHeight(node.left), this.#getHeight(node.right)) + 1
    );
  }

  #reBalance(node) {
    let bf = this.#balanceFactor(node);

    if (bf > 1) {
      if (this.#balanceFactor(node.left) >= 0) {
        return this.#rotateRight(node);
      } else {
        node.left = this.#rotateLeft(node.left);
        return this.#rotateRight(node);
      }
    }

    if (bf < -1) {
      if (this.#balanceFactor(node.right) <= 0) {
        return this.#rotateLeft(node);
      } else {
        node.right = this.#rotateRight(node.right);
        return this.#rotateLeft(node);
      }
    }

    return node;
  }

  #balanceFactor(node) {
    return this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  #rotateLeft(node) {
    let y = node.right;
    let x = y.left;

    node.right = x;
    y.left = node;

    node.height = this.#update(node);
    y.height = this.#update(y);

    return y;
  }

  #rotateRight(node) {
    let y = node.left;
    let x = y.right;

    node.left = x;
    y.right = node;

    node.height = this.#update(node);
    y.height = this.#update(y);

    return y;
  }

  #update(node) {
    let left = this.#getHeight(node.left);
    let right = this.#getHeight(node.right);

    return Math.max(left, right) + 1;
  }

  #getMin(node) {
    if (!node || !node.left) {
      return node;
    }

    return this.#getMin(node.left);
  }

  #getMax(node) {
    if (!node || !node.right) {
      return node;
    }

    return this.#getMax(node.right);
  }

  #search(node, value) {
    if (!node) return false;

    if (value === node.value) {
      return true;
    } else if (value < node.value) {
      return this.#search(node.left, value);
    } else {
      return this.#search(node.right, value);
    }
  }

  #inorder_rec(node, res) {
    if (!node) return;

    this.#inorder_rec(node.left, res);
    res.push(node.value);
    this.#inorder_rec(node.right, res);

    return res;
  }

  #preorder_rec(node, res) {
    if (!node) return;

    res.push(node.value);
    this.#preorder_rec(node.left, res);
    this.#preorder_rec(node.right, res);

    return res;
  }

  #postorder_rec(node, res) {
    if (!node) return;

    this.#postorder_rec(node.left, res);
    this.#postorder_rec(node.right, res);
    res.push(node.value);

    return res;
  }
}

const tree = new AVL();

// ===== size, isEmpty =====
console.log("isEmpty:", tree.isEmpty()); // true
console.log("size:", tree.size()); // 0

// ===== insert =====
tree.insert(10);
tree.insert(20);
tree.insert(5);
tree.insert(4);
tree.insert(15);
tree.insert(25);

console.log("size after inserts:", tree.size()); // 6
console.log("isEmpty after inserts:", tree.isEmpty()); // false

// ===== search =====
console.log("search 15:", tree.search(15)); // true
console.log("search 100:", tree.search(100)); // false

// ===== getHeight =====
console.log("height:", tree.getHeight()); // AVL balanced height

// ===== getMin / getMax =====
console.log("min:", tree.getMin()?.value); // 4
console.log("max:", tree.getMax()?.value); // 25

// ===== Traversals =====
console.log("level order:", tree.level_order());
console.log("inorder recursive:", tree.inorder_rec());
console.log("inorder iterative:", tree.inorder_itr());

console.log("preorder recursive:", tree.preorder_rec());
console.log("preorder iterative:", tree.preorder_itr());

console.log("postorder recursive:", tree.postorder_rec());
console.log("postorder iterative:", tree.postorder_itr());

// ===== toArray =====
console.log("toArray:", tree.toArray()); // sorted array

// ===== find successor / predecessor =====
console.log("successor of 15:", tree.find_successor(15));
console.log("predecessor of 15:", tree.find_predeccessor(15));

// ===== delete =====
tree.delete(10);
console.log("after delete 10 inorder:", tree.inorder_rec());
console.log("size after delete:", tree.size());

// ===== clear =====
tree.clear();
console.log("after clear size:", tree.size()); // 0
console.log("after clear isEmpty:", tree.isEmpty()); // true
