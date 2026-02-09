Quick Sort
Quick Sort is a fast and classic sorting algorithm.
 It works by selecting a pivot element and rearranging the array so that elements smaller than the pivot come before it, and elements greater come after it.
 This process is applied recursively to sort the entire array.

How It Works

Choose a pivot element
Partition the array around the pivot
Move elements smaller than the pivot to the left
Move elements greater than the pivot to the right
Repeat until the array is fully sorted

Time and Space Complexity

Time Complexity
CaseComplexityBest CaseO(n log n)AverageO(n log n)Worst CaseO(n²)
Explanation:
Best Case (O(n log n)): When the pivot splits the array into two nearly equal parts.
Average Case (O(n log n)): When the pivot selection is reasonably balanced.
Worst Case (O(n²)): When the pivot is always the smallest or largest element (for example, an already sorted array).

Space Complexity
O(log n) — Due to recursive calls in the average case.
O(n) — In the worst case because of deep recursion.

Stability
• Not stable
 Equal elements may not preserve their original order.

Adaptiveness
• Not adaptive
 Quick Sort does not stop early for already sorted data.