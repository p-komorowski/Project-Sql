# Project-sql

The Project-sql API description

## Version: 1.0

### /auth/register

#### POST

##### Summary

Register User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description          |
| ---- | -------------------- |
| 201  | User registration.   |
| 401  | User already exists. |

### /auth/login

#### POST

##### Summary

Log user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description          |
| ---- | -------------------- |
| 200  | User Login.          |
| 401  | Invalid credentials. |

### /books

#### GET

##### Summary

Get all products.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| page | query      |             | Yes      | number |
| take | query      |             | Yes      | number |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | Getting all products. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

#### POST

##### Summary

Insert product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 201  | Insert product.     |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |
| bearer          |        |

### /books/{IBSN}

#### DELETE

##### Summary

Delete product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| IBSN | path       |             | Yes      | string |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Product deleted.    |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |
| bearer          |        |

### /books/price/{IBSN}

#### PATCH

##### Summary

Change price of book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| IBSN | path       |             | Yes      | string |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Price Changed.      |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |
| bearer          |        |

### /books/review

#### POST

##### Summary

Place review for book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Review placed.      |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |
| bearer          |        |

### /books/review/{IBSN}

#### DELETE

##### Summary

Delete review for book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| IBSN | path       |             | Yes      | string |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Review deleted.     |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |
| bearer          |        |

### /basket/add

#### POST

##### Summary

Insert product in basket

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description                 |
| ---- | --------------------------- |
| 200  | Product inserted in basket. |
| 401  | User not logged in.         |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

### /basket

#### GET

##### Summary

Get all baskets

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description          |
| ---- | -------------------- |
| 201  | show list of baskets |
| 401  | User not logged in.  |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

### /basket/{IBSN}

#### DELETE

##### Summary

Delete product from basket

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| IBSN | path       |             | Yes      | string |

##### Responses

| Code | Description                  |
| ---- | ---------------------------- |
| 200  | Product deleted from basket. |
| 401  | User not logged in.          |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

#### PATCH

##### Summary

Update count of book in user basket

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| IBSN | path       |             | Yes      | string |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | Count of book changed |
| 401  | User not logged in.   |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

### /basket/books

#### GET

##### Summary

Show all book in user basket

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | show list           |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

### /order

#### POST

##### Summary

Create order for logged user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Order created.      |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

#### GET

##### Summary

Show list of placed orders

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Order list shown    |
| 401  | User not logged in. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearer          |        |

### Models

#### RegisterDto

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| email    | string | email       | Yes      |
| password | string | password    | Yes      |
| name     | string | name        | Yes      |

#### LoginDto

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| email    | string | email       | Yes      |
| password | string | password    | Yes      |

#### BookDto

| Name   | Type   | Description    | Required |
| ------ | ------ | -------------- | -------- |
| IBSN   | number | IBSN           | Yes      |
| title  | string | Title of book  | Yes      |
| price  | number | price of book  | Yes      |
| author | string | Name of author | Yes      |
| count  | number | count of book  | Yes      |

#### BookPriceDto

| Name  | Type   | Description   | Required |
| ----- | ------ | ------------- | -------- |
| price | number | price of book | Yes      |

#### ReviewDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### DeleteReviewDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### BasketBook

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### BasketDto

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| basketId | string | Basket_id   | Yes      |
| userId   | string | User_id     | Yes      |

#### BasketBookDto

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| id    | string | id          | Yes      |
| count | string | Count       | Yes      |
