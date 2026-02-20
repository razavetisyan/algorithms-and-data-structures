# Queue (Fixed-Capacity) - JavaScript

This is a **Queue** implementation in JavaScript using **private fields** and a **fixed-size array buffer**.  

The Queue follows the **FIFO (First In, First Out)** principle.

Unlike JavaScript's native arrays — where operations like `shift()` and `unshift()` may cost **O(n)** due to element reindexing — this implementation guarantees **O(1)** enqueue/dequeue operations using a **circular buffer**.

---

## Core Features

- Fixed-capacity queue
- Enqueue/Dequeue operations in **O(1)**
- Peek at the front element
- Peek at the back element
- Check if queue is full or empty
- Clear all elements while keeping capacity unchanged
- Private internal state for encapsulation
- Circular buffer ensures full reuse of allocated memory

---

## Internal Structure

| Field        | Description |
|--------------|-------------|
| `#queue`     | internal array buffer for storing elements |
| `#front`     | index of the first logical element |
| `#back`      | index of the last logical element |
| `#size`      | current number of elements in the queue |
| `#cap`       | maximum capacity of the queue |

Circular buffer allows the `front` and `back` pointers to wrap around the array without shifting elements:

```js
back = (back + 1) % capacity;  // circular enqueue
front = (front + 1) % capacity; // circular dequeue