 There are several ways to find the highest/lowest priced items. Let me show you the different approaches:

## Method 1: Using `reduce()` (Most Common)

```javascript
function findHighestPriced(filePath) {
  const data = readFile(filePath);
  return data.reduce((highest, current) => {
    return current.price > highest.price ? current : highest;
  });
}

function findLowestPriced(filePath) {
  const data = readFile(filePath);
  return data.reduce((lowest, current) => {
    return current.price < lowest.price ? current : lowest;
  });
}
```

## Method 2: Sort and pick first/last

```javascript
function findHighestPriced(filePath) {
  const data = readFile(filePath);
  const sorted = data.sort((a, b) => b.price - a.price); // Descending
  return sorted[0]; // First item = highest price
}

function findLowestPriced(filePath) {
  const data = readFile(filePath);
  const sorted = data.sort((a, b) => a.price - b.price); // Ascending
  return sorted[0]; // First item = lowest price
}
```

## Method 3: Find max/min price, then find item

```javascript
function findHighestPriced(filePath) {
  const data = readFile(filePath);
  const maxPrice = Math.max(...data.map(item => item.price));
  return data.find(item => item.price === maxPrice);
}

function findLowestPriced(filePath) {
  const data = readFile(filePath);
  const minPrice = Math.min(...data.map(item => item.price));
  return data.find(item => item.price === minPrice);
}
```

## Add to your switch statement:

```javascript
function findOne(filePath, type) {
  const data = readFile(filePath);
  switch (type) {
    case "firstExpensive":
      return data.find((item) => item.price > 5);
    case "lastExpensive":
      return data.findLast((item) => item.price > 5);
    case "mostExpensive":
      return data.reduce((highest, current) =>
        current.price > highest.price ? current : highest
      );
    case "cheapest":
      return data.reduce((lowest, current) =>
        current.price < lowest.price ? current : lowest
      );
    case "heaviestQuantity":
      return data.reduce((highest, current) =>
        current.quantity > highest.quantity ? current : highest
      );
  }
}
```

## Real examples with your data:

```javascript
// Using your grocery data:
findOne(groceriesDBpath, "mostExpensive");
// Returns: Chicken Breast ($8.99)

findOne(groceriesDBpath, "cheapest");
// Returns: Bananas ($1.29)

findOne(groceriesDBpath, "heaviestQuantity");
// Returns: Cheddar Cheese (8 ounces)
```

## Why use `reduce()`?

**Reduce is preferred** because:
- It's O(n) - only goes through the array once
- Doesn't modify the original array (like `sort()` does)
- More memory efficient than creating new arrays
- Clear intent - you're "reducing" the array to a single result

`Math.max()` and `Math.min()` find the highest and lowest **numbers** from a list, but they have some quirks when working with arrays and objects.

## Basic usage with individual numbers:

```javascript
Math.max(5, 10, 3, 8);     // Returns: 10
Math.min(5, 10, 3, 8);     // Returns: 3

Math.max(1.29, 8.99, 3.49); // Returns: 8.99
Math.min(1.29, 8.99, 3.49); // Returns: 1.29
```

## The Problem: Arrays don't work directly

```javascript
const prices = [1.29, 8.99, 3.49];

Math.max(prices);    // ❌ Returns: NaN (doesn't work!)
Math.min(prices);    // ❌ Returns: NaN (doesn't work!)
```

## Solution 1: Spread operator `...`

```javascript
const prices = [1.29, 8.99, 3.49];

Math.max(...prices);  // ✅ Returns: 8.99
Math.min(...prices);  // ✅ Returns: 1.29

// The ... "spreads" the array into individual arguments:
// Math.max(...[1.29, 8.99, 3.49]) becomes Math.max(1.29, 8.99, 3.49)
```

## With your grocery objects:

```javascript
const data = readFile(groceriesDBpath);

// Extract just the prices into an array
const pricesOnly = data.map(item => item.price);
// Result: [1.29, 4.49, 2.99, 6.99, 3.99, 4.29, 8.99, 4.99, 2.49, 5.99]

// Find the highest/lowest price
const maxPrice = Math.max(...pricesOnly);  // 8.99
const minPrice = Math.min(...pricesOnly);  // 1.29

// Then find which item has that price
const mostExpensive = data.find(item => item.price === maxPrice);
const cheapest = data.find(item => item.price === minPrice);
```

## Step by step breakdown:

```javascript
// Your data (simplified):
const groceries = [
  { name: "Bananas", price: 1.29 },
  { name: "Chicken", price: 8.99 },
  { name: "Milk", price: 3.49 }
];

// Step 1: Extract prices
const prices = groceries.map(item => item.price);
// Result: [1.29, 8.99, 3.49]

// Step 2: Find max price
const maxPrice = Math.max(...prices);
// Equivalent to: Math.max(1.29, 8.99, 3.49)
// Result: 8.99

// Step 3: Find the item with that price
const expensiveItem = groceries.find(item => item.price === maxPrice);
// Result: { name: "Chicken", price: 8.99 }
```

## Why not just use reduce()?

`Math.max/min` is great for **simple number comparison**, but `reduce()` is better for **finding objects** because:

```javascript
// Math.max approach (2 passes through array):
const maxPrice = Math.max(...data.map(item => item.price));  // Pass 1
const item = data.find(item => item.price === maxPrice);     // Pass 2

// reduce approach (1 pass through array):
const item = data.reduce((highest, current) =>
  current.price > highest.price ? current : highest
);
```

**Math.max/min** are perfect when you just need the **number**, but **reduce** is better when you need the **whole object**!