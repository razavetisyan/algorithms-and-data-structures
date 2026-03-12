class Priority_Queue {
  #heap;
  #size;
  #cmp;

  #min_heap = false;
  #max_heap = false;

  constructor(cmp = (a, b) => a - b) {
    this.#heap = [];
    this.#cmp = cmp;

    if (typeof cmp !== "function") {
      throw new Error("cmp must be a function");
    }

    if (cmp(1, 2) <= 0) {
      this.#min_heap = true;
    } else {    
      this.#max_heap = true;
    }

    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#heap = [];
    this.#size = 0;
  }

  comparator() {
    return this.#cmp;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.#heap[0];
  }

  add(value) {
    this.#heap.push(value);

    if(this.#min_heap) {
        this.#shiftUp_minHeap(this.#size);
    }else{
        this.#shiftUp_maxHeap(this.#size);
    }

    ++this.#size;
  }

  pop() { 
    if(this.isEmpty()) {
        return undefined;
    }

    this.#swap(0, this.#size - 1);

    let returned_value = this.#heap.pop();

    if(this.#min_heap) {
        this.#shiftDown_minHeap(0);
    }else{
        this.#shiftDown_maxHeap(0);
    }

    --this.#size;

    return returned_value;
  }

  remove(value) {
    let idx = this.#indexOf(value);

    if(idx >= 0) {
        this.#swap(0, this.#size - 1);
        this.#heap.pop();

        if(this.#min_heap) {
            this.#shiftDown_minHeap(idx);
        }else{
            this.#shiftDown_maxHeap(idx);
        }
    }
  }

  toArray() {
    return [...this.#heap];
  }

  #get_parent(index){ 
    return Math.floor((index - 1) / 2);
  }

  #get_left_child(index) {
    return 2 * index + 1;
  }

  #get_right_child(index) {
    return 2 * index + 2;
  }

  #swap(i, j) {
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
  }

  #shiftUp_minHeap(index) {
    let parent = this.#get_parent(index);

    if(parent < 0) {
        return;
    }

    if(this.#heap[index] < this.#heap[parent]) {
        this.#swap(index, parent);
        this.#shiftUp_minHeap(parent);
    }
  }

  #shiftUp_maxHeap(index) {
    let parent = this.#get_parent(index);

    if(parent < 0) {
        return;
    }

    if(this.#heap[index] > this.#heap[parent]) {
        this.#swap(index, parent);
        this.#shiftUp_maxHeap(parent);
    }
  }

  #shiftDown_minHeap(index) {
    let left_child = this.#get_left_child(index);
    let right_child = this.#get_right_child(index);

    let min = index;

    if(this.#heap[left_child] < this.#heap[index]) {
        min = left_child;
    }

    if(this.#heap[right_child] < this.#heap[index]) {
        min = right_child;
    }

    if(index != min) {
        this.#swap(index, min);
        this.#shiftDown_minHeap(min);
    }
  }

  #shiftDown_maxHeap(index) {
    let left_child = this.#get_left_child(index);
    let right_child = this.#get_right_child(index);

    let min = index;

    if(this.#heap[left_child] > this.#heap[min]) {
        min = left_child;
    }

    if(this.#heap[right_child] > this.#heap[min]) {
        min = right_child;
    }

    if(min != index) {
        this.#swap(min, index);
        this.#shiftDown_maxHeap(min);
    }
  }

  #indexOf(value) {
    for(let i = 0; i < this.#size; ++i) {
        if(this.#heap[i] === value) {
            return i;
        }
    }

    return -1;
  }

  heapify(array) {
    this.#heap = [...array];
    this.#size = array.length;

    let start = Math.floor((this.#size - 2) / 2);

    for(let i = start; i >= 0; --i) {
        if(this.#min_heap) {
            this.#shiftDown_minHeap(i);
        }else {
            this.#shiftDown_maxHeap(i);
        }
    }
  }

  replace(value) {
    if(this.isEmpty()) {
        this.add(value);
        
        return;
    }

    let old_root = this.#heap[0];

    this.#heap[0] = value;

    if(this.#min_heap) {
        this.#shiftDown_minHeap(0);
    }else {
        this.#shiftDown_maxHeap(0);
    }

    return old_root;
  }

  contains(value) {
    for(let i = 0; i < this.#size; ++i) {
        if(this.#heap[i] === value) {
            return true;
        }
    }

    return false;
  }
}

function testPriorityQueue() {

  console.log("---- CREATE MIN HEAP ----"); 
  let pq = new Priority_Queue((a,b) => a - b);

  console.log(pq.isEmpty()); // true
  console.log(pq.size()); // 0


  console.log("---- ADD ----");

  pq.add(5);
  pq.add(3);
  pq.add(8);
  pq.add(1);
  pq.add(4);

  console.log(pq.toArray()); 
  // [1,3,8,5,4] կամ heap-ի այլ valid order
  // կարևորն է որ root-ը 1 լինի


  console.log("---- SIZE ----");
  console.log(pq.size()); // 5


  console.log("---- PEEK ----");
  console.log(pq.peek()); // 1


  console.log("---- POP ----");

  console.log(pq.pop()); // 1
  console.log(pq.pop()); // 3

  console.log(pq.toArray()); 
  // [4,5,8] կամ [4,8,5] (valid heap)

  console.log(pq.size()); // 3


  console.log("---- REMOVE ----");

  pq.remove(5);

  console.log(pq.toArray()); 
  // [4,8] կամ [8,4]


  console.log("---- COMPARATOR ----");

  let cmp = pq.comparator();

  console.log(cmp(1,2)); 
  // -1 (քանի որ 1-2 = -1)


  console.log("---- CLEAR ----");

  pq.clear();

  console.log(pq.size()); // 0
  console.log(pq.isEmpty()); // true


  console.log("---- MAX HEAP TEST ----");

  let maxpq = new Priority_Queue((a,b) => b - a);

  maxpq.add(5);
  maxpq.add(3);
  maxpq.add(8);
  maxpq.add(1);
  maxpq.add(4);

  console.log(maxpq.toArray());
  // [8,4,5,1,3] կամ նման heap structure
  // կարևորն է root = 8


  console.log(maxpq.pop()); // 8
  console.log(maxpq.pop()); // 5
  console.log(maxpq.pop()); // 4
  console.log(maxpq.pop()); // 3
  console.log(maxpq.pop()); // 1


  console.log(maxpq.isEmpty()); // true
}

testPriorityQueue();