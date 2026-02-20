class Node {
  #value;
  #next = null;

  constructor(val = 0) {
    this.#value = val;
    this.next = null;
  }

  get value() {
    return this.#value;
  }

  set value(val) {
    if (val === undefined) {
      throw new Error("Invalid value");
    }

    this.#value = val;
  }

  get next() {
    if (!this.#next) {
      return null;
    }

    return this.#next;
  }

  set next(new_node) {
    if (!new_node) {
      new_node = null;
    }

    this.#next = new_node;
  }
}

class SinglyLinkedList {
  #head = null;
  #size = 0;

  constructor(iterable) {
    if (iterable === undefined) {
      return;
    }

    if (
      typeof iterable !== "string" &&
      iterable !== null &&
      typeof iterable[Symbol.iterator] === "function"
    ) {
      for (let value of iterable) {
        this.push_back(value);
      }
    } else {
      this.push_back(value);
    }
  }

  getHead() {
    return this.#head;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    if (this.#size === 0) {
      return true;
    }

    return false;
  }

  clear() {
    this.#head = null;
    this.#size = 0;
  }

  front() {
    if (!this.isEmpty()) {
      return undefined;
    }

    return this.#head;
  }

  push_front(val) {
    let node = new Node(val);
    let current = this.#head;
    node.next = current;
    this.#head = node;
    this.#size++;
  }

  push_back(val) {
    if (this.isEmpty()) {
      this.#head = new Node(val);
      this.#size++;
      return;
    }

    let current = this.#head;

    while (current.next) {
      current = current.next;
    }

    let node = new Node(val);
    current.next = node;
    node.next = null;
    this.#size++;
  }

  pop_front() {
    if (this.isEmpty()) {
      return undefined;
    }

    let removed = this.#head;
    this.#head = removed.next;
    this.#size--;

    return removed.value;
  }

  pop_back() {
    if (this.isEmpty()) {
      return undefined;
    } else if (this.#size === 1) {
      this.#head = null;
    }

    let current = this.#head;

    while (current.next.next !== null) {
      current = current.next;
    }

    let removed = current.next;
    current.next = null;
    this.#size--;

    return removed.value;
  }

  at(index) {
    if (index < 0 || index > this.#size) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      return this.front();
    }

    let current = this.#head;
    let i = 0;

    while (i < index) {
      current = current.next;
      ++i;
    }

    return current.value;
  }

  insert(index, value) {
    if (index < 0 || index > this.#size) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      this.push_front(value);
      return;
    }

    if (index === this.#size) {
      this.push_back(value);
      return;
    }

    let current = this.#head;
    let node = new Node(value);
    let i = 0;

    while (i < index) {
      current = current.next;
      ++i;
    }

    let next_node = current.next;
    current.next = node;
    node = next_node;
    this.#size++;
  }

  erase(index) {
    if (index < 0 || index > this.#size) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      this.pop_front;
      return;
    }

    if (index === this.#size - 1) {
      this.pop_back();
      return;
    }

    let current = this.#head;
    let i = 0;

    while (i < index - 1) {
      current = current.next;
      ++i;
    }

    let next_node = current.next.next;
    current.next = next_node;
    this.#size--;
  }

  remove(value, equals) {
    if (typeof equals === "function") {
      let current = this.#head;
      let index = 0;
      let count = 0;

      while (current) {
        if (equals(current.value, value)) {
          this.erase(index);
          ++count;
        }

        current = current.next;
        ++index;
      }

      return count;
    }

    let index = 0;
    let current = this.#head;
    let count = 0;

    while (current) {
      if (current.value === value) {
        this.erase(index);
        ++count;
      }

      current = current.next;
      ++index;
    }

    return count;
  }

  reverse() {
    let next_node = null;
    let prev = null;
    let current = this.#head;

    while (current) {
      next_node = current.next;
      current.next = prev;
      prev = current;
      current = next_node;
    }

    this.#head = prev;
  }

  toArray() {
    let current = this.#head;
    let res = [];

    while (current) {
      res.push(current.value);
      current = current.next;
    }

    return res;
  }

  static fromArray(arr) {
    let list = new SinglyLinkedList(arr);

    return list;
  }

  [Symbol.iterator]() {
    let current = this.#head;

    return {
      next() {
        if (!current) {
          return {
            value: undefined,
            done: true,
          };
        }

        let value = current.value;
        current = current.next;

        return {
          value: value,
          done: false,
        };
      },
    };
  }

  sort() {
    this.#head = this.#mergeSort(this.#head);
    return this;
  }

  #mergeSort(head) {
    if (!head || !head.next) return head;

    let prev = null;
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }

    prev.next = null;

    let left = this.#mergeSort(head);
    let right = this.#mergeSort(slow);

    return this.merge(left, right);
  }

  merge(list1, list2) {
    let dummy = new Node(null);
    let current = dummy;

    while (list1 && list2) {
      if (list1.value <= list2.value) {
        current.next = list1;
        current = current.next;
        list1 = list1.next;
      } else {
        current.next = list2;
        current = current.next;
        list2 = list2.next;
      }
    }

    current.next = list1 || list2;

    return dummy.next;
  }
}
