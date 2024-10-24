`SORTING`

#### Use `-` as Prefix Before the field for descending order

#### For Ascending Order don`t add a prefix

- **URL**: `BASE_URL/qna?sort=-votes`

- **Description**: Retrieves questions sorted by votes in descending order.

- **URL**: `BASE_URL/qna?sort=votes`

- **Description**: Retrieves questions sorted by votes in ascending order.

#### Filtering with Comparison Operators

### Use [gt], [lt], [gte], [lte] for greater than, less than, greater than or equal, and less than or equal

- **Greater than**:
- **URL**:
  ```
  BASE_URL/qna?votes[gt]=10
  ```
- **Description**: Retrieves questions with votes greater than 10.
- **Less than**:
- **URL**:
  ```
  BASE_URL/qna?votes[lt]=100
  ```
- **Description**: Retrieves questions with votes less than 100.
- **Greater than or equal**:
- **URL**:
  ```
  BASE_URL/qna?votes[gte]=50
  ```
- **Description**: Retrieves questions with votes greater than or equal to 50.
- **Less than or equal**:
- **URL**:
  ```
  BASE_URL/qna?votes[lte]=75
  ```
- **Description**: Retrieves questions with votes less than or equal to 75.

#### Fetch Specific Fields

### Use fields to retrieve only specific fields in the response

- **URL**: `BASE_URL/qna?fields=questionText,description`

- **Description**: Retrieves only `questionText` and `description` fields for each question.
- **NOTE**: all word have to be separate by coma

#### Pagination

### Use page for page number and limit for number of items per page

- **URL**:`BASE_URL/api/qna?page=1&limit=10`

- **Description**: Retrieves the second page of results with a limit of 10 questions per page.

### Example Requests

#### Axios - Fetch Sorted Questions

```javascript
const fetchSortedQuestions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/questions?sort=-votes"
    );
    console.log("Sorted Questions:", response.data);
  } catch (error) {
    console.error("Error fetching sorted questions:", error);
  }
};
```

### examples

## Axios - Fetch Filtered Questions with Comparison Operators

```javascript
const fetchFilteredQuestions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/questions?votes[gt]=10"
    );
    console.log("Filtered Questions:", response.data);
  } catch (error) {
    console.error("Error fetching filtered questions:", error);
  }
};
```

## Axios - Fetch Specific Fields

```javascript
const fetchSpecificFields = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/questions?fields=questionText,description"
    );
    console.log("Questions with specific fields:", response.data);
  } catch (error) {
    console.error("Error fetching specific fields:", error);
  }
};
```

## Axios - Paginate Results

```javascript
const fetchPaginatedQuestions = async (page = 2, limit = 10) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/questions?page=${page}&limit=${limit}`
    );
    console.log("Paginated Questions:", response.data);
  } catch (error) {
    console.error("Error fetching paginated questions:", error);
  }
};
```

sorting

`sort`: Specifies the field to sort by, with - indicating descending order.

Example: `?sort=-votes`

Filtering with Comparison Operators

`gt`: Greater than.

Example: `?votes[gt]=10`

`lt`: Less than.

Example: `?votes[lt]=100`

`gte`: Greater than or equal.

Example: `?votes[gte]=50`

`lte`: Less than or equal.

Example: `?votes[lte]=75`

Field Limiting

`fields`: Comma-separated list of fields to include in the response.

Example: `?fields=questionText,description`

`Pagination`

    `page`: Page number for pagination.

Example: `?page=2`

    `limit`: Number of items per page.

Example: `?limit=10`

#

`THIS FEATURE WORKS FOR QUIZZES TO `
