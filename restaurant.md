1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.

db.users.find(
  { name: { $regex: ".*Reg.*", $options: "i" } },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

This query uses the $regex operator to perform a case-insensitive regular expression match on the name field. The .*Reg.* pattern matches any substring that contains 'Reg' as three letters. The $options: "i" option ensures the search is case-insensitive.

The projection { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } specifies which fields to include in the result. The value 1 indicates the field should be included, while 0 would exclude it.


2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.

db.users.find(
  { 
    borough: "Bronx",
    $or: [
      { cuisine: "American" },
      { cuisine: "Chinese" }
    ]
  }
)

This query uses the find method to search for documents that meet the specified criteria. The $or operator is used to match restaurants that have either "American" or "Chinese" as their cuisine. The borough field is matched against the value "Bronx".


3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.

db.users.find(
  { 
    borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

This query uses the $in operator to match the borough field against an array of borough names: "Staten Island", "Queens", "Bronx", and "Brooklyn". It retrieves the restaurant Id, name, borough, and cuisine using the projection { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }.


4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.

db.users.find(
  { 
    borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] }
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

This query uses the $nin operator to exclude documents with borough values "Staten Island", "Queens", "Bronx", and "Brooklyn" from the results. It retrieves the restaurant Id, name, borough, and cuisine using the projection { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }.

db.users.find(
  { 
    "grades.score": { $lte: 10 }
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

This query uses the $lte operator to match documents where the score field within the grades array is less than or equal to 10. It retrieves the restaurant Id, name, borough, and cuisine using the projection { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }.


6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.


db.users.find(
  { 
    $or: [
      { cuisine: { $nin: ['American', 'Chinese'] } },
      { name: { $regex: '^Wil', $options: 'i' } }
    ]
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

This query uses the $or operator to match restaurants that satisfy either of the two conditions. The first condition checks if the cuisine is not 'American' or 'Chinese' using the $nin operator. The second condition uses the $regex operator to check if the name starts with 'Wil' (case-insensitive match using the $options: 'i' option).

The projection { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } specifies which fields to include in the result.

7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..

db.users.find(
  { 
    "grades.grade": "A",
    "grades.score": 11,
    "grades.date": ISODate("2014-08-11T00:00:00Z")
  },
  { restaurant_id: 1, name: 1, grades: 1 }
)

This query searches for documents where the grades field contains an object with a grade of "A", score of 11, and date matching the specified ISODate.

The projection { restaurant_id: 1, name: 1, grades: 1 } specifies which fields to include in the result.


8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

db.users.find(
  {
    "grades.1.grade": "A",
    "grades.1.score": 9,
    "grades.1.date": ISODate("2014-08-11T00:00:00Z")
  },
  { restaurant_id: 1, name: 1, grades: 1 }
)

This query uses the dot notation (grades.1.grade, grades.1.score, grades.1.date) to target the specific elements within the grades array. It checks if the 2nd element of the array has a grade of "A", a score of 9, and a date matching the specified ISODate.

The projection { restaurant_id: 1, name: 1, grades: 1 } specifies which fields to include in the result.


9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..


db.users.find(
  {
    "address.coord.1": { $gt: 42, $lte: 52 }
  },
  { restaurant_id: 1, name: 1, address: 1, "address.coord": 1 }
)

This query targets the coord array within the address field. It checks if the 2nd element (coord.1) is greater than 42 and less than or equal to 52.

The projection { restaurant_id: 1, name: 1, address: 1, "address.coord": 1 } specifies which fields to include in the result. It includes the restaurant Id, name, address, and the coord array.


10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.

db.users.find({}, { _id: 0 }).sort({ name: 1 })

This query retrieves all documents from the restaurants collection using an empty filter {}. The projection { _id: 0 } excludes the _id field from the result. The sort({ name: 1 }) part of the query sorts the restaurants based on the name field in ascending order (1 indicates ascending order).


11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.

db.users.find({}, { _id: 0 }).sort({ name: -1 })

This query retrieves all documents from the restaurants collection using an empty filter {}. The projection { _id: 0 } excludes the _id field from the result. The sort({ name: -1 }) part of the query sorts the restaurants based on the name field in descending order (-1 indicates descending order).


12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.

db.users.find({}, { _id: 0 }).sort({ cuisine: 1, borough: -1 })

This query retrieves all documents from the restaurants collection using an empty filter {}. The projection { _id: 0 } excludes the _id field from the result. The sort({ cuisine: 1, borough: -1 }) part of the query sorts the restaurants first based on the cuisine field in ascending order (1), and within each cuisine, it sorts the borough in descending order (-1).


13. Write a MongoDB query to know whether all the addresses contains the street or not.

db.users.aggregate([
  {
    $match: {
      "address.street": { $exists: false }
    }
  },
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
])

This aggregation query first uses the $match stage to filter the documents where the address.street field does not exist ($exists: false).

Then, it applies the $group stage to group the matching documents. In this case, we group by null since we want to aggregate all the results together. The $sum operator is used to count the number of documents that match the condition.

The result will be a single document with the count of documents where the address does not contain the street field. If the count is 0, it means that all the addresses contain the street.









