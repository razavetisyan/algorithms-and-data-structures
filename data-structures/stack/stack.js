class Stack {
  #stack;
  #size;
  #cap;

  constructor(capacity) {
    if (typeof capacity != "number" || capacity <= 0) {
      throw new Error("Invalid capacity");
    }

    this.#cap = capacity;
    this.#stack = new Array(capacity).fill(undefined);
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  isEmpty() {
    if (this.#size === 0) {
      return true;
    }

    return false;
  }

  isFull() {
    if (this.#size === this.#cap) {
      return true;
    }

    return false;
  }

  clear() {
    for (let i = 0; i < this.#size; ++i) {
      this.#stack[i] = null;
    }

    this.#size = 0;
  }

  push(value) {
    if (this.isFull()) {
      throw new Error("stack is full");
    }

    this.#stack[this.#size] = value;
    this.#size++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("stack is empty");
    }

    let index = this.#size - 1;
    let removed = this.#stack[index];
    this.#stack[index] = null;
    this.#size--;

    return removed;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("stack is empty");
    }

    let index = this.#size - 1;

    return this.#stack[index];
  }
}
