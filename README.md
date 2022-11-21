# Requirements

### 1) Install:

- NodeJS: v16+
- NPM: v8+

### 2) Install dependencies:

> npm i

### 3) Execute project:

> npm run start

### 4) Execute tests cases:

> npm run _nombre_del_test_

Tests avaliable:

- test-admin
- test-car
- test-client
- test-comment
- test-advertisement

Example:

> npm run test-car

Run all avaliable tests

- npm run test

# Trabajo Integrador TP2 - Grupo 1

## Goal

### The project consists of a web application oriented to the sale of cars. The main objective is that the company who manages the application, publishes cars on a daily basis, incorporating the whole vehicle information. Customers will have users through whom they will be able to search for cars by model, year, brand or price. They will also be able to sign the car and then proceed with the purchase of it on the premises. In addition, once logged in, users will be able to make queries on the advertisement comments, which will be answered by the company administrative users.

## Entities

###

- Car
- Client
- Admin
- Comment
- Advertisement

**Car**

```
- licensePlate
- brand 
- model 
- year
- price 
- description
- image
- color
- doors
- fuel
- milage
```

**Client**

```
- email
- password
- role
- name
- surname
- dni
- historyOfSearch
- favorite
- downPaymentCars
```

**Admin**

```
- email
- password
- role
```

**Comment**

```
- advertisementId
- baseComment
```

**Advertisement**

```
- car
- date
- paid
- comments
- title
- description
- location
```
