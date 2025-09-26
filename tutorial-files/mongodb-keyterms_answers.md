# MongoDB Terminology Worksheet
**Name: _________________________    Date: _____________**

---

## Instructions
Fill in the definitions and examples for each MongoDB concept. Use your own words to explain what each term means and how it's used.

---

## **1. `_id`**
**Definition:** ___________________________________________________________________________

**Example usage:**
```javascript
// Write an example of how _id appears in a MongoDB document

```

---

## **2. `ObjectId`**
**Definition:** ___________________________________________________________________________

**Why do we need to import it?** _____________________________________________________________

**Example usage:**
```javascript
// Write code showing how to convert a string ID to ObjectId

```

---

## **3. `$set`**
**Definition:** ___________________________________________________________________________

**What happens if you don't use $set?** _____________________________________________________

**Example usage:**
```javascript
// Write an update operation using $set

```

---

## **4. `toArray()`**
**Definition:** ___________________________________________________________________________

**Why is this needed with find() operations?** ______________________________________________

**Example usage:**
```javascript
// Write a find operation that converts results to array

```

---

## **5. `insertMany()` vs `insertOne()`**
**insertOne() is for:** ___________________________________________________________________

**insertMany() is for:** __________________________________________________________________

**Example of each:**
```javascript
// insertOne example:


// insertMany example:

```

---

## **6. `matchedCount` vs `modifiedCount`**
**matchedCount means:** ___________________________________________________________________

**modifiedCount means:** __________________________________________________________________

**Why might these numbers be different?** ___________________________________________________

---

## **7. `deleteMany({})`**
**What does the empty object {} mean?** _____________________________________________________

**Why is this dangerous?** ________________________________________________________________

**Safe example:**
```javascript
// Write a deleteMany operation that only deletes specific documents

```

---

## **8. `$gte`, `$lte` (Comparison Operators)**
**$gte means:** __________________________________________________________________________

**$lte means:** __________________________________________________________________________

**Example usage:**
```javascript
// Write a query to find students aged between 18 and 25

```

---

## **9. `returnDocument` Options**
**'after' returns:** _____________________________________________________________________

**'before' returns:** ____________________________________________________________________

**Example usage:**
```javascript
// Write a findOneAndUpdate that returns the updated document

```

---

## **10. `countDocuments()`**
**Definition:** ___________________________________________________________________________

**Why use this instead of find().toArray().length?** ____________________________________

**Example usage:**
```javascript
// Write code to count all students

```

---

## **11. Collection Names**
**Are collection names case-sensitive?** _____ (Yes/No)

**Example:** "students" vs "Students" - are these the same collection? _______ (Yes/No)

---

## **12. Filter Objects**
**Empty filter {} means:** ________________________________________________________________

**Filter with condition means:** ___________________________________________________________

**Examples:**
```javascript
// Find all documents:

// Find documents where name is "John":

// Find documents where age is greater than 18:

```

---

## **13. `replaceOne()` vs `updateOne()`**
**updateOne() does:** _____________________________________________________________________

**replaceOne() does:** ____________________________________________________________________

**Which is more dangerous and why?** ______________________________________________________

---

## **14. `stats()`**
**Definition:** ___________________________________________________________________________

**What kind of information does it return?** _______________________________________________

---

## **15. Query Parameters**
**In Express, req.query comes from:** ______________________________________________________

**Example:** If URL is `/search?min=20&max=30`, what is req.query? _________________________

**Converting to MongoDB query:**
```javascript
// Convert req.query.min and req.query.max to a MongoDB age range query

```

---

## **16. `insertedIds` vs `insertedId`**
**insertedId is returned by:** ____________________________________________________________

**insertedIds is returned by:** ___________________________________________________________

---

## **17. Async/Await**
**Are MongoDB operations synchronous or asynchronous?** ____________________________________

**What keyword must you use before MongoDB operations?** ___________________________________

**Example:**
```javascript
// Write an async function that finds all students

```

---

## **18. Error Types**
**List 3 different types of errors you might encounter:**

1. ________________________________________________________________________

2. ________________________________________________________________________

3. ________________________________________________________________________

---

## **19. Database vs Collection Selection**
**A database contains:** __________________________________________________________________

**A collection contains:** ________________________________________________________________

**Code example:**
```javascript
// Write code to select database "school" and collection "students"

```

---

## **20. `find({})` Pattern**
**find({}) returns:** _____________________________________________________________________

**find({name: "John"}) returns:** __________________________________________________________

**Examples:**
```javascript
// Find all students:

// Find students named Sarah:

// Find students older than 21:

```

---

## **Bonus Questions**

**21. SQL vs MongoDB equivalents:**
- SQL `SELECT *` = MongoDB _____________
- SQL `WHERE age > 18` = MongoDB _____________
- SQL `INSERT` = MongoDB _____________
- SQL `UPDATE SET` = MongoDB _____________
- SQL `DELETE WHERE` = MongoDB _____________

**22. What's the difference between these two operations?**
```javascript
// Operation A:
updateOne({ _id: id }, { name: "John", age: 25 })

// Operation B:
updateOne({ _id: id }, { $set: { name: "John", age: 25 } })
```

**Answer:** ___________________________________________________________________________

---

## **Answer Key Section**
*(Fold this section back or cover it while completing the worksheet)*

<details>
<summary>Click to reveal answers (for instructor use)</summary>

**Key answers for reference:**
- _id: MongoDB's automatic unique identifier for every document
- ObjectId: Special 12-byte format for MongoDB IDs, must convert strings
- $set: Update operator that modifies specific fields without replacing entire document
- toArray(): Converts MongoDB cursor to JavaScript array
- deleteMany({}): Deletes ALL documents because empty object matches everything
- $gte/$lte: "Greater than or equal" and "less than or equal" operators
- Case-sensitive: Yes, "students" ≠ "Students"
- Async: ALL MongoDB operations are asynchronous, require await
- Operation A vs B: A replaces entire document, B updates only specified fields

</details>

---
**Notes:*