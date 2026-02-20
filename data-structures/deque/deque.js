class Deque {
  #deq;
  #front;
  #size;
  #back;
  #cap;

  constructor(cap = 8) {
    if (typeof cap != "number") {
      throw new Error("cap must be a number");
    }

    if (cap < 8) {
      cap = 8;
    }

    this.#deq = new Array(cap).fill(undefined);
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
    this.#cap = cap;
  }

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  empty() {
    return this.#size == 0;
  }

  full() {
    return this.#size == this.#cap;
  }

  #mod(i) {
    return i % this.#cap;
  }

  #index(i) {
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    if (this.#size < this.#cap) {
      return;
    }

    let newCap = this.#cap * 2;
    let newDeq = new Array(newCap).fill(undefined);

    for (let i = 0; i < this.#size; ++i) {
      const item = this.at(i);
      newDeq[i] = item;
    }

    this.#deq = newDeq;
    this.#cap = newCap;
    this.#front = 0;
    this.#back = this.#size - 1;
  }

  front() {
    if (this.empty()) {
      throw new Error("can't be empty");
    }

    return this.#deq[this.#front];
  }

  back() {
    if (this.empty()) {
      throw new Error("can't be empty");
    }

    return this.#deq[this.#back];
  }

  at(i) {
    if (i < 0 || i >= this.#size) {
      throw new Error("Invalid index");
    }

    let idx = this.#index(i);

    return this.#deq[idx];
  }

  push_back(value) {
    this.#ensureCapacityForOneMore();
    this.#back = (this.#back + 1) % this.#cap;
    this.#deq[this.#back] = value;
    this.#size++;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();
    this.#front = (this.#front - 1 + this.#cap) % this.#cap;
    this.#deq[this.#front] = value;
    this.#size++;
  }

  pop_back() {
    if (this.empty()) {
      throw new Error("can't be empty");
    }

    this.#back = (this.#back + this.#cap) % this.#cap;
    let item = this.#deq[this.#back];
    this.#deq[this.#back] = undefined;
    this.#back--;
    this.#size--;

    return item;
  }

  pop_front() {
    if (this.empty()) {
      throw new Error("can't be empty");
    }

    let item = this.#deq[this.#front];
    this.#deq[this.#front] = undefined;
    this.#front = (this.#front + 1) % this.#cap;
    this.#size--;

    return item;
  }

  clear() {
    this.#deq = new Array(this.#cap).fill(undefined);
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
  }

  swap(i, j) {
    if (i < 0 || i >= this.#size) {
      throw new Error("Invalid index");
    }

    if (j < 0 || j > this.#size) {
      throw new Error("Invalid index");
    }

    const absIndexI = this.#index(i);
    const absIndexJ = this.#index(j);

    [this.#deq[absIndexI], this.#deq[absIndexJ]] = [
      this.#deq[absIndexJ],
      this.#deq[absIndexI],
    ];
  }

  find(value) {
    for (let i = 0; i < this.#size; ++i) {
      let item = this.at(i);

      if (item === value) {
        return i;
      }
    }

    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; ++i) {
      if (this.at(i) === value) {
        return true;
      }
    }

    return false;
  }

  toArray() {
    let res = [];

    for (const item of this) {
      res.push(item);
    }

    return res;
  }

  #deepClone(ob) {
    let res = {};

    for (const key of ob) {
      if (typeof ob[key] === "object" && ob[key] != null) {
        res[key] = this.#deepClone(ob.key);
      } else {
        res[key] = ob[key];
      }
    }

    return res;
  }

  clone() {
    let res = new Deque();

    for (const item of this) {
      if (typeof item === "object" && item != null) {
        res.push_back(this.#deepClone(item));
      } else {
        res.push_back(item);
      }
    }

    return res;
  }

  equals(otherDeque) {
    if (this.#size != otherDeque.size()) {
      return false;
    }

    for (let i = 0; i < this.#size; ++i) {
      if (this.at(i) != otherDeque.at(i)) {
        return false;
      }
    }

    return true;
  }

  reserve(newCap) {
    if (newCap <= this.#cap) {
      return;
    }

    const newDeq = new Array(newCap).fill(undefined);

    for (let i = 0; i < this.#size; ++i) {
      newDeq[i] = this.at(i);
    }

    this.#front = 0;
    this.#deq = newDeq;
    this.#cap = newCap;
  }

  shrinkToFit() {
    if (this.#size === this.#cap) {
      return;
    }

    const newDeq = new Array(this.#size).fill(undefined);

    for (let i = 0; i < this.#size; ++i) {
      newDeq[i] = this.at(i);
    }

    this.#deq = newDeq;
    this.#cap = this.#size;
    this.#front = 0;
  }

  reverse(nums, left, right) {
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      ++left;
      --right;
    }
  }

  rotateLeft(k) {
    k %= this.#size;

    this.reverse(this.#deq, 0, k - 1);
    this.reverse(this.#deq, k, this.#size - 1);
    this.reverse(this.#deq, 0, this.#size - 1);
  }

  rotateRight(k) {
    k %= this.#size;

    this.reverse(this.#deq, 0, this.#size - 1);
    this.reverse(this.#deq, 0, k - 1);
    this.reverse(this.#deq, k, this.#size - 1);
  }

  [Symbol.iterator]() {
    const size = this.#size;
    let i = 0;

    return {
      next: () => {
        if (i < size) {
          return {
            value: this.at(i++),
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

  *values() {
    let i = 0;

    while (i < this.#size) {
      yield this.at(i++);
    }
  }

  *keys() {
    let i = 0;

    while (i < this.#size) {
      yield i++;
    }
  }

  *entries() {
    let i = 0;

    while (i < this.#size) {
      yield [i, this.at(i++)];
    }
  }

  forEach(fn) {
    for (let i = 0; i < this.#size; ++i) {
      fn(this.at(i), i, this.#deq);
    }
  }

  map(fn) {
    const newDeq = new Deque(this.#cap);

    for (let i = 0; i < this.#size; ++i) {
      newDeq.push_back(fn(this.at(i), i, this.#deq));
    }

    return newDeq;
  }

  filter(fn) {
    const newDeq = new Deque(this.#cap);

    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.at(i), i, this.#deq)) {
        newDeq.push_back(this.at(i));
      }
    }

    return newDeq;
  }

  reduce(fn, initial) {
    if (this.empty() && initial === undefined) {
      throw new Error("Invalid input");
    }

    let acc;
    let startIndex;

    if (initial != undefined) {
      acc = initial;
      startIndex = 0;
    } else {
      acc = this.at(0);
      startIndex = 1;
    }

    for (let i = startIndex; i < this.#size; ++i) {
      acc = fn(acc, this.at(i), i, this.#deq);
    }

    return acc;
  }
}
