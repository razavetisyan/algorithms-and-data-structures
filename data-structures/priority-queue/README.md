
## Overview

This project implements a **Priority Queue** using a **Binary Heap** in JavaScript.
The data structure supports both **Min Heap** and **Max Heap** behavior depending on the comparator function provided to the constructor.

A **Priority Queue** always removes the element with the highest priority:

* **Min Heap** → smallest element first
* **Max Heap** → largest element first

The implementation uses an **array-based binary heap**.

---

# Constructor

```js
new Priority_Queue(comparator)
```

### Parameters

`comparator(a, b)` – function used to determine priority.

Examples:

```js
// Min Heap
new Priority_Queue((a,b) => a - b)

// Max Heap
new Priority_Queue((a,b) => b - a)
```

---

# Methods

## add(value)

Inserts a new element into the priority queue.

**Time Complexity**

```
O(log n)
```

**Space Complexity**

```
O(1)
```

Example

```js
pq.add(5)
pq.add(1)
pq.add(10)
```

---

## pop()

Removes and returns the element with the highest priority.

**Time Complexity**

```
O(log n)
```

**Space Complexity**

```
O(1)
```

Example

```js
pq.pop()
```

---

## peek()

Returns the top element without removing it.

**Time Complexity**

```
O(1)
```

**Space Complexity**

```
O(1)
```

Example

```js
pq.peek()
```

---

## remove(value)

Removes a specific value from the queue.

**Time Complexity**

```
O(n)
```

Reason: the value must first be located in the heap.

**Space Complexity**

```
O(1)
```

Example

```js
pq.remove(5)
```

---

## size()

Returns the number of elements in the queue.

**Time Complexity**

```
O(1)
```

**Space Complexity**

```
O(1)
```

---

## isEmpty()

Checks if the queue is empty.

**Time Complexity**

```
O(1)
```

**Space Complexity**

```
O(1)
```

---

## clear()

Removes all elements from the queue.

**Time Complexity**

```
O(1)
```

**Space Complexity**

```
O(1)
```

---

## comparator()

Returns the comparator function used by the queue.

**Time Complexity**

```
O(1)
```

**Space Complexity**

```
O(1)
```

---

## toArray()

Returns a copy of the heap as an array.

**Time Complexity**

```
O(n)
```

**Space Complexity**

```
O(n)
```

---

# Internal Heap Operations

These methods maintain heap structure.

### shiftUp

Moves a node up the heap after insertion.

```
Time: O(log n)
```

### shiftDown

Moves a node down after removal.

```
Time: O(log n)
```

---

# Space Complexity (Overall)

```
O(n)
```

The heap stores all elements in an internal array.

---

# Example Usage

```js
let pq = new Priority_Queue((a,b) => a - b);

pq.add(5);
pq.add(1);
pq.add(3);

console.log(pq.peek()); // 1

console.log(pq.pop()); // 1
console.log(pq.pop()); // 3
console.log(pq.pop()); // 5
```

---

# Summary

| Operation | Time Complexity |
| --------- | --------------- |
| add       | O(log n)        |
| pop       | O(log n)        |
| peek      | O(1)            |
| remove    | O(n)            |
| size      | O(1)            |
| isEmpty   | O(1)            |
| clear     | O(1)            |

---

# Data Structure

Binary Heap stored in an array

```
parent = (i - 1) / 2
left   = 2i + 1
right  = 2i + 2
```
