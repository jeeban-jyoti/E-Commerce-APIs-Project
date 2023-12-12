
# E-Commerce API Project

Welcome to the documentation for the E-Commerce API Project. In this project I built API endpoinst for a few methods that are listed below. ANd all the APIs are tested with the help of Postman.\
\
This project provides the a simple user (seller or buyer) registration and details fetching system, i.e. catalogs and orders.

## Authentication End Points

### 1. Register New User as Seller/Buyer
Create a new user in MongoDB.

Endpoint: POST /api/auth/register

#### request:
```json
{
    "username": "username",
    "password": "password",
    "usertype": "seller/buyer"
}

```

### 2. LogIN Existing User

Endpoint: POST /api/auth/login

#### request:
```json
{
    "authToken": "authToken",
    "username": "username",
    "password": "password",
    "usertype": "seller/buyer"
}

```

## Buyers End Points

### 1. Get a list of Existing Sellers

Endpoint: GET /api/buyer/list-of-sellers

### 2. Get the Catalog of a Seller

Endpoint: GET /api/buyer/seller-catalog/:seller_id

seller_id -> username of the seller

### 3. Create an Order

Endpoint: POST /api/buyer/create-order/:seller_id

#### request:
```json
{
    "buyer": "buyer username",
    "orders": [list of orders]
}

```

## Seller End Points

### 1. Create the catalog of a seller

Endpoint: POST /api/seller/create-catalog

#### request:
```json
{
    "authToken": "authToken of seller",
    "products_list": [ list of products ]
}

```

### 2. LogIN Existing User

Endpoint: POST /api/seller/orders?seller_id=

Here, in query 'seller_id' is the username of the seller

## Installation
1. Download the Github Repository
2. Go inside the folder and type the below command to install all the required modules
```bash
npm i
```
Then all the above endpoints can be accessed through the below address.
```
localhost:8000
```


## Authors

- [Jeeban Jyoti Patra](https://github.com/jeeban-jyoti)

