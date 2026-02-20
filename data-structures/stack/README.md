# Stack (Fixed-Capacity) - JavaScript

This is a **Stack** implementation in JavaScript using **private fields** and a **fixed-capacity array**.  

The Stack follows the **LIFO (Last In, First Out)** principle.

Unlike JavaScript's native arrays — where `push()` and `pop()` are available but `unshift()`/`shift()` are costly — this implementation provides **predictable, O(1) push/pop operations** and explicit capacity management.

---

## Core Features

- Fixed-capacity stack
- Push/Pop operations in **O(1)**
- Peek at the top element
- Check if the stack is full or empty
- Clear all elements while keeping capacity intact
- Private internal state for encapsulation

---

## Internal Structure

| Field       | Description |
|-------------|-------------|
| `#stack`    | internal array buffer for storing elements |
| `#size`     | current number of elements in the stack |
| `#cap`      | maximum capacity of the stack |

---

## Methods

| Method        | Description |
|---------------|-------------|
| `push(value)` | Add a value to the top of the stack. Throws an error if the stack is full. |
| `pop()`       | Remove and return the top element. Throws an error if the stack is empty. |
| `peek()`      | Return the top element without removing it. Throws an error if empty. |
| `size()`      | Return the number of elements currently in the stack. |
| `capacity()`  | Return the maximum stack capacity. |
| `isEmpty()`   | Return `true` if the stack has no elements. |
| `isFull()`    | Return `true` if the stack is at full capacity. |
| `clear()`     | Remove all elements, reset size to 0, keep capacity unchanged. |
