
// ============================================================================
// 1. TOTAL DOLLAR VALUE - Multiple Strategies
// ============================================================================
console.log('\n1. TOTAL DOLLAR VALUE (PRICE × QUANTITY)');
console.log('-'.repeat(30));

// Strategy 1A: Basic reduce with initial value
const totalValue1 = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Strategy 1A (with initial 0):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value:

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue1.toFixed(2));

// Strategy 1B: No initial value - TRICKY! Need to handle first item carefully
const totalValue2 = groceries.reduce((acc, item, index) => {
    // First iteration: acc is the first grocery item, not a number!
    if (index === 1) {
        // acc is groceries[0], item is groceries[1]
        return (acc.price * acc.quantity) + (item.price * item.quantity);
    }
    // Now acc is a number
    return acc + (item.price * item.quantity);
});
console.log('Strategy 1B (no initial value):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue2.toFixed(2));

// Strategy 1C: Arrow function one-liner
const totalValue3 = groceries.reduce((acc, item) => acc + (item.price * item.quantity), 0);
console.log('Strategy 1C (one-liner):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue3.toFixed(2));

// Show the difference between just price vs price × quantity
const justPriceSum = groceries.reduce((acc, item) => acc + item.price, 0);
console.log('\n📊 Comparison:');
console.log('Just prices (WRONG):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + justPriceSum.toFixed(2));
console.log('Price × Quantity (CORRECT):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue1.toFixed(2));

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalInventoryValue.toFixed(2));

// Show breakdown by item
console.log('\nInventory breakdown:');
groceries.forEach(item => {
    const itemTotal = item.price * item.quantity;
    console.log(`${item.name}: ${item.quantity} × ${item.price} = ${itemTotal.toFixed(2)}`);
});

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue1.toFixed(2));

// Strategy 1B: No initial value - TRICKY! Need to handle first item carefully
const totalValue2 = groceries.reduce((acc, item, index) => {
    // First iteration: acc is the first grocery item, not a number!
    if (index === 1) {
        // acc is groceries[0], item is groceries[1]
        return (acc.price * acc.quantity) + (item.price * item.quantity);
    }
    // Now acc is a number
    return acc + (item.price * item.quantity);
});
console.log('Strategy 1B (no initial value):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue2.toFixed(2));

// Strategy 1C: Arrow function one-liner
const totalValue3 = groceries.reduce((acc, item) => acc + (item.price * item.quantity), 0);
console.log('Strategy 1C (one-liner):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue3.toFixed(2));

// Show the difference between just price vs price × quantity
const justPriceSum = groceries.reduce((acc, item) => acc + item.price, 0);
console.log('\n📊 Comparison:');
console.log('Just prices (WRONG):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + justPriceSum.toFixed(2));
console.log('Price × Quantity (CORRECT):', '

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60)); + totalValue1.toFixed(2));

// ============================================================================
// 2. HIGHEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n2. HIGHEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 2A: Return entire object, with initial value
const highestPriced1 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
}, groceries[0]); // Start with first item
console.log('Strategy 2A (with initial):', highestPriced1.name, '$' + highestPriced1.price);

// Strategy 2B: No initial value, accumulator is first item
const highestPriced2 = groceries.reduce((acc, current) => {
    return current.price > acc.price ? current : acc;
});
console.log('Strategy 2B (no initial):', highestPriced2.name, '$' + highestPriced2.price);

// Strategy 2C: Using ternary operator (compact)
const highestPriced3 = groceries.reduce((acc, current) =>
    current.price > acc.price ? current : acc
);
console.log('Strategy 2C (ternary):', highestPriced3.name, '$' + highestPriced3.price);

// Strategy 2D: Just return the price value, not the object
const highestPrice = groceries.reduce((acc, current) => {
    return current.price > acc ? current.price : acc;
}, 0);
console.log('Strategy 2D (price only):', '$' + highestPrice);

// ============================================================================
// 3. LOWEST PRICED ITEM - Multiple Strategies
// ============================================================================
console.log('\n3. LOWEST PRICED ITEM');
console.log('-'.repeat(30));

// Strategy 3A: With initial value (use a very high number)
const lowestPriced1 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
}, { price: Infinity }); // Start with impossibly high price
console.log('Strategy 3A (with Infinity):', lowestPriced1.name, '$' + lowestPriced1.price);

// Strategy 3B: No initial value
const lowestPriced2 = groceries.reduce((acc, current) => {
    return current.price < acc.price ? current : acc;
});
console.log('Strategy 3B (no initial):', lowestPriced2.name, '$' + lowestPriced2.price);

// Strategy 3C: Ternary with detailed comparison
const lowestPriced3 = groceries.reduce((acc, current) =>
    (current.price < acc.price) ? current : acc
);
console.log('Strategy 3C (ternary):', lowestPriced3.name, '$' + lowestPriced3.price);

// ============================================================================
// 4. COUNT ORGANIC ITEMS - Multiple Strategies
// ============================================================================
console.log('\n4. COUNT ORGANIC ITEMS');
console.log('-'.repeat(30));

// Strategy 4A: Traditional if statement
const organicCount1 = groceries.reduce((acc, item) => {
    if (item.organic === true) {
        return acc + 1;
    }
    return acc;
}, 0);
console.log('Strategy 4A (if statement):', organicCount1);

// Strategy 4B: Ternary operator
const organicCount2 = groceries.reduce((acc, item) => {
    return item.organic ? acc + 1 : acc;
}, 0);
console.log('Strategy 4B (ternary):', organicCount2);

// Strategy 4C: One-liner ternary
const organicCount3 = groceries.reduce((acc, item) =>
    item.organic ? acc + 1 : acc, 0
);
console.log('Strategy 4C (one-liner):', organicCount3);

// Strategy 4D: Using addition with boolean conversion
const organicCount4 = groceries.reduce((acc, item) => acc + (item.organic ? 1 : 0), 0);
console.log('Strategy 4D (boolean math):', organicCount4);

// Strategy 4E: Even more compact boolean math
const organicCount5 = groceries.reduce((acc, item) => acc + item.organic, 0);
console.log('Strategy 4E (direct boolean):', organicCount5);

// ============================================================================
// 5. COUNT UNIQUE CATEGORIES - Multiple Strategies
// ============================================================================
console.log('\n5. COUNT UNIQUE CATEGORIES');
console.log('-'.repeat(30));

// Strategy 5A: Using Set to track unique categories
const uniqueCategories1 = groceries.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
}, new Set());
console.log('Strategy 5A (Set):', uniqueCategories1.size, 'categories');
console.log('Categories:', Array.from(uniqueCategories1));

// Strategy 5B: Using array with includes check
const uniqueCategories2 = groceries.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
}, []);
console.log('Strategy 5B (array):', uniqueCategories2.length, 'categories');
console.log('Categories:', uniqueCategories2);

// Strategy 5C: Using object as counter
const categoryCount = groceries.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.log('Strategy 5C (object counter):', Object.keys(categoryCount).length, 'categories');
console.log('Category breakdown:', categoryCount);

// Strategy 5D: Ternary with includes
const uniqueCategories3 = groceries.reduce((acc, item) =>
    acc.includes(item.category) ? acc : [...acc, item.category], []
);
console.log('Strategy 5D (ternary spread):', uniqueCategories3.length, 'categories');

// ============================================================================
// 6. BONUS: COMPLEX REDUCE EXAMPLES
// ============================================================================
console.log('\n6. BONUS EXAMPLES');
console.log('-'.repeat(30));

// Group items by category
const itemsByCategory = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
}, {});
console.log('Items by category:', itemsByCategory);

// Calculate total value including quantity
const totalInventoryValue = groceries.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
}, 0);
console.log('Total inventory value: $' + totalInventoryValue.toFixed(2));

// Find most expensive category (average price)
const categoryAverages = groceries.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
    }
    acc[item.category].total += item.price;
    acc[item.category].count += 1;
    return acc;
}, {});

// Calculate averages
Object.keys(categoryAverages).forEach(category => {
    const avg = categoryAverages[category].total / categoryAverages[category].count;
    console.log(`${category} average: $${avg.toFixed(2)}`);
});

console.log('\n' + '='.repeat(60));
console.log('KEY TAKEAWAYS:');
console.log('• Initial value (0, [], {}) vs no initial value');
console.log('• Ternary operators make code more compact');
console.log('• Accumulator can be number, object, array, or Set');
console.log('• Always return the accumulator!');
console.log('='.repeat(60));