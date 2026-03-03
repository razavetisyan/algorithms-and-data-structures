class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  #root;
  #size;

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
    let newNode = new Node(value);

    if (!this.#root) {
      this.#root = newNode;
      this.#size++;
      return;
    }

    let current = this.#root;

    while (true) {
      if (value === current.value) {
        return;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          this.#size++;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          this.#size++;
        }

        current = current.right;
      }
    }
  }

  delete(value) {
    let parent = null;
    let current = this.#root;

    while (current && current.value != value) {
      parent = current;

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) {
      return;
    }

    if (!current.left || !current.right) {
      let child = current.left || current.right;

      if (!parent) {
        this.#root = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }

    if (current.left && current.right) {
      let parent1 = current;
      let rightLeaf = current.right;

      while (rightLeaf.left) {
        parent1 = rightLeaf;
        rightLeaf = rightLeaf.left;
      }

      current.value = rightLeaf.value;

      parent = parent1;
      current = rightLeaf;
    }

    this.#size--;
  }

  contains(value) {
    let current = this.#root;

    while (current) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  get_height() {
    if (!this.#root) {
      return;
    }

    let queue = [];
    queue.push(this.#root);

    let height = 0;

    while (queue.length > 0) {
      let level = queue.length;

      for (let i = 0; i < level; ++i) {
        let node = queue.shift();

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      ++height;
    }

    return height;
  }

  get_depth(value) {
    let current = this.#root;
    let depth = 0;

    while (current) {
      if (value === current.value) {
        return depth;
      }

      if (value < current.value) {
        current = current.left;
        ++depth;
      } else {
        current = current.right;
        ++depth;
      }
    }

    return -1;
  }

  find_min() {
    if (this.isEmpty()) {
      throw new Error("tree is empty");
    }

    let current = this.#root;

    while (current.left) {
      current = current.left;
    }

    return current.value;
  }

  find_max() {
    if (this.isEmpty()) {
      throw new Error("tree is empty");
    }

    let current = this.#root;

    while (current.right) {
      current = current.right;
    }

    return current.value;
  }

  level_order() {
    if (!this.#root) {
      return;
    }

    let queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      let level = queue.length;

      for (let i = 0; i < level; ++i) {
        let node = queue.shift();
        console.log(node.value);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }

  inorder_rec() {
    let res = [];
    this.#_inorder(this.#root, res);

    return res;
  }

  inorder_itr() {
    if (!this.#root) {
      return;
    }

    let stack = [];
    let current = this.#root;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      console.log(current.value);
      current = current.right;
    }
  }

  preorder_rec() {
    let res = [];
    this.#_preorder(this.#root, res);

    return res;
  }

  preorder_itr() {
    if (!this.#root) {
      return;
    }

    let stack = [];
    stack.push(this.#root);

    while (stack.length > 0) {
      let node = stack.pop();
      console.log(node.value);

      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }

  postorder_rec() {
    let res = [];
    this.#_postorder(this.#root, res);

    return res;
  }

  postorder_itr() {
    if (!this.#root) {
      return;
    }

    let stack1 = [];
    let stack2 = [];

    stack1.push(this.#root);

    while (stack1.length > 0) {
      let node = stack1.pop();
      stack2.push(node);

      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    while (stack2.length > 0) {
      let node = stack2.pop();
      console.log(node.value);
    }
  }

  find_successor(value) {
    let current = this.#root;
    let successor = null;

    while (current) {
      if (value < current.value) {
        successor = current;
        current = current.left; 
      } else {
        current = current.right;
      }
    }

    return successor ? successor.value : null;
  }

  find_predecessor(value) {
    let current = this.#root;
    let predecessor = null;

    while (current) {
      if (value > current.value) {
        predecessor = value;
        current = current.right;
      } else {
        current = current.left;
      }
    }

    if (predecessor) {
      return predecessor.value;
    }

    return null;
  }

  is_balanced() {
    return this.#_isBalanced(this.#root);
  }

  validate_BST() {
    let stack = [];
    let current = this.#root;
    let prev = null;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();

      if (prev != null && current.value <= prev) {
        return false;
      }

      prev = current.value;

      current = current.right;
    }

    return true;
  }

  toArray() {
    let res = [];

    let inorder = (node) => {
      if (!node) return;

      inorder(node.left);
      res.push(node.value);
      inorder(node.right);  
    };

    inorder(this.#root);

    return res;
  }

  clone() {
    let newTree = new BST();
    newTree.#root = this.#_clone(this.#root);
    newTree.#size = this.#size;

    return newTree;
  }

  equals(otherTree) {
    const compare = (node1, node2) => {
      if (!node1 && !node2) return true;
      if (!node1 || !node2) return false;

      if (node1.value != node2.value) return false;

      return (
        compare(node1.left, node2.left) && compare(node1.right, node2.right)
      );
    };

    return compare(this.#root, otherTree.#root);
  }

  [Symbol.iterator]() {
    let current = this.#root;
    let stack = [];

    return {
      next: () => {
        while (current || stack.length > 0) {
          while (current) {
            stack.push(current);
            current = current.left;
          }

          current = stack.pop();
          let value = current.value;
          current = current.right;

          return {
            value,
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  }

  values() {
    return this[Symbol.iterator]();
  }

  entries() {
    let stack = [];
    let current = this.#root;
    let index = 0;

    return {
      next() {
        while (current || stack.length > 0) {
          while (current) {
            stack.push(current);
            current = current.left;
          }

          current = stack.pop();
          let value = current.value;
          current = current.right;

          return {
            value: [index++, value],
            done: false,
          };
        }

        return {
          value : undefined,
          done : true
        }
      },

      [Symbol.iterator]() {
        return this;
      }
    };
  }

  #_insert(node, value) {
    let newNode = new Node(value);
    if (!node) {
      ++this.#size;
      return newNode;
    }

    if (value < node.value) {
      node.left = this.#_insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.#_insert(node.right, value);
    }

    return node;
  }

  #_delete(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.#_delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.#_delete(node.right, value);
    } else {
      if (!node.left) {
        return node.left;
      } else if (!node.right) {
        return node.right;
      } else {
        let accessor = this.#_accessor(node);
        node.value = accessor;
        node.right = this.#_delete(node.right, accessor);
      }
    }

    return node;
  }

  #_accessor(node) {
    return this.#_find_min(node.right);
  }

  #_find_min(node) {
    if (!node) return;

    if (!node.left) return node.value;

    return this.#_find_min(node.left);
  }

  #_find_max(node) {
    if (!node) return;

    if (!node.right) return node.value;

    return this.#_find_max(node.right);
  }

  #_get_height(node) {
    if (!node) return 0;

    return (
      Math.max(this.#_get_height(node.left), this.#_get_height(node.right)) + 1
    );
  }

  #_inorder(node, res) {
    if (!node) return;

    this.#_inorder(node.left, res);
    res.push(node.value);
    this.#_inorder(node.right, res);
  }

  #_preorder(node, res) {
    if (!node) return;

    res.push(node.value);
    this.#_preorder(node.left, res);
    this.#_preorder(node.right, res);
  }

  #_postorder(node, res) {
    if (!node) return;

    this.#_postorder(node.left, res);
    this.#_postorder(node.right, res);
    res.push(node.value);
  }

  #_isBalanced(node) {
    if (!node) return true;

    let leftHeight = this.#_get_height(node.left);
    let rightHeight = this.#_get_height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.#_isBalanced(node.left) && this.#_isBalanced(node.right);
  }

  #_clone(node) {
    if (!node) return null;

    let newNode = new Node(node.value);

    newNode.left = this.#_clone(node.left);
    newNode.right = this.#_clone(node.right);

    return newNode;
  }
}

