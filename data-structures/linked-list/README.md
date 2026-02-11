Singly Linked List (JavaScript)

Description

This project implements a Singly Linked List data structure in JavaScript.

A singly linked list is a linear data structure where each node contains:

a value

a reference to the next node

Unlike arrays, elements are not stored in contiguous memory.
Each node points to the next one in sequence.


class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

List Structure

The SinglyLinkedList class maintains:

#head → reference to the first node

(optional) #tail → reference to the last node

(optional) #size → number of elements

Implemented Methods
push(value)

Adds a new value to the end of the list.

Time Complexity:

O(n) without tail

O(1) if tail is maintained