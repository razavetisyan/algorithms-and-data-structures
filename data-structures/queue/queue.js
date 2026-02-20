class Queue {
  #queue;
  #front;
  #back;
  #size;
  #cap;

  constructor(capacity) {
    if (typeof capacity != "number" || capacity <= 0) {
      throw new Error("Invalid capacity");
    }

    this.#queue = new Array(capacity).fill(undefined);
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
    this.#cap = capacity;
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
      this.#queue[i] = null;
    }

    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
  }

  enqueue(value) {
    if (this.isFull()) {
      throw new Error("queue is full");
    }

    this.#back = (this.#back + 1) % this.#cap;
    this.#queue[this.#back] = value;
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("queue is empty");
    }

    let removed = this.#queue[this.#front];
    this.#queue[this.#front] = null;
    this.#front = (this.#front + 1) % this.#cap;
    this.#size--;

    return removed;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("depending on design contract");
    }

    return this.#queue[this.#front];
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("queue is empty");
    }

    return this.#queue[this.#back];
  }

  print() {
    for (let i = 0; i < this.#size; ++i) {
      let index = (this.#front + i) % this.#cap;
      console.log(this.#queue[index]);
    }
  }
}
