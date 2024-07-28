# Daily Expenses Sharing Application

This project is a backend service for a daily-expenses sharing application. The application allows users to add expenses and split them using three different methods: `exact amounts`, `percentages`, and `equal splits`. The backend manages user details, validates inputs, and generates downloadable `balance sheets`.

## Features

- User Management
  - Create `user`
  - Retrieve `user details`

- Expense Management
  - Add expense
  - Retrieve `individual` user expenses
  - Retrieve `overall` expenses

- Balance Sheet
  - Show `individual` expenses
  - Show `overall expenses` for all users
  - Provide a feature to download the `balance sheet`

- Authentication and Authorization
  - Only let `authorized` users to access `protected` features

- Error Handling and input validation
  - `Validate` user inputs
  - Ensure percentages in the `percentage split` method add up to 100%.
  - Ensure total amount owed to each participant in `exact split` method adds upto the total amount  
## Project Structure

```txt
 daily-expenses-sharing-app
 
├── 📂controllers
    └──📜 balanceSheetController.js
    └──📜 expenseController.js
    └──📜 userController.js
├── 📂middlewatres
    └── 📜auth.js
├── 📂models
    └── 📜expenseModel.js
    └── 📜userModel.js
├── 📂routes
    └── 📜balanceSheetRoutes.js
    └── 📜expenseRoutes.js
    └── 📜userRoutes.js
├── 📂utils
    └── 📜csvGenerator.js
    └── 📜dataValidator.js
├── .env
├── 📜app.js
├── package-lock.json
├── package.json
├── Readme.md
├── .gitignore

```

## Requirements

- Node.js
- MongoDB

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/hdksrma/daily-expenses-sharing-app.git
cd daily-expenses-sharing-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup MongoDB

#### Option 1: Install MongoDB Locally

- [Download MongoDB](https://www.mongodb.com/try/download/community) and follow the installation instructions for your operating system.

- Start the MongoDB server:

```sh
mongod
```

- Open another terminal and run the following command to start the MongoDB shell:

```sh
mongo
```

  - In the MongoDB shell, run the following commands to create a database and collection:

```sh
use expensesDB
db.createCollection("users")
db.createCollection("expenses")
```

#### Option 2: Use MongoDB Atlas

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster.

- Get the connection string for your cluster and replace the `<username>`, `<password>`, and `<cluster-url>` placeholders with your actual details.

- Update the connection string in your `.env` file (see below).

### 4. Configure Environment Variables

If you are using MongoDB locally, Create a `.env` file in the root of the project with the following content:

```env
MONGO_URI = mongodb://localhost:27017/expensesDB
PORT = 3000
JWT_SECRET = your_jwt_secret_key
```

If you are using MongoDB Atlas, replace `mongodb://localhost:27017/expensesDB` with your Atlas connection string.

### 5. Run the Application

```sh
npm run dev
```

The server will start on `http://localhost:3000`.




# API Reference

## User Endpoints

| Method | Endpoint         | Description                                | Authorization     | Headers                        | Request Body                                                                                          | Response Body                                                   |
|--------|------------------|--------------------------------------------|-------------------|--------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| POST   | `/api/register`  | Register a new user in the system.         | No                | `Content-Type: application/json` | `{ "email": "user@example.com", "name": "John Doe", "mobile": "1234567890", "password": "securepassword" }` | `{ "token": "your_jwt_token" }`                                 |
| POST   | `/api/login`     | Authenticate a user and provide a JWT token. | No                | `Content-Type: application/json` | `{ "email": "user@example.com", "password": "securepassword" }`                                     | `{ "token": "your_jwt_token" }`                                 |
| GET    | `/api/profile`   | Retrieve the profile of the authenticated user. | Yes               | `Authorization: Bearer <token>`  | None                                                                                                  | `{ "_id": "user_id", "email": "user@example.com", "name": "John Doe", "mobile": "1234567890" }` |

## Expense Endpoints

| Method | Endpoint                  | Description                                     | Authorization     | Headers                            | Request Body                                                                                                              | Response Body                                     |
|--------|---------------------------|-------------------------------------------------|-------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| POST   | `/api/expenses`           | Add a new expense entry with details.          | Yes               | `Authorization: Bearer <token>`, `Content-Type: application/json` | `{ "description": "Dinner", "amount": 100, "splitMethod": "equal", "participants": [{ "userId": "user_id" }], "createdBy": "user_id" }` | `{ "expense": "expense_object" }`                  |
| GET    | `/api/expenses/user/:userId` | Get all expenses associated with a specific user. | Yes               | `Authorization: Bearer <token>`    | None                                                                                                                      | `[ { "expense": "expense_object" } ]`            |
| GET    | `/api/expenses`           | Retrieve all expenses in the system.           | Yes               | `Authorization: Bearer <token>`    | None                                                                                                                      | `[ { "expense": "expense_object" } ]`            |

## Balance Sheet Endpoints

| Method | Endpoint                 | Description                                 | Authorization     | Headers                            | Request Body | Response Body | 
|--------|--------------------------|---------------------------------------------|-------------------|------------------------------------|--------------|---------------| 
| GET    | `/api/balance-sheet`     | Download the balance sheet as a CSV file.   | Yes               | `Authorization: Bearer <token>`    | None         | CSV file      | 


# Balance Sheet CSV Sample

### Transactions
- Dinner (`equal`): 
   - Amount: `3000`
   - Participants: 
     - Hardik Sharma
     - Smriti Ojha
     - Geeta Sharma


- Shopping (`exact`): 
   - Amount: `10000`
   - Participants: 
     - Hardik Sharma (`5000`) 
     - Smriti Ojha (`3000`) 
     - Geeta Sharma (`2000`)


- Property Purchase (`percentage`): 
   - Amount: `10000`
   - Participants: 
     - Hardik Sharma (`50`) 
     - Smriti Ojha (`30`) 
     - Geeta Sharma (`20`)
- Movie (`equal`): 
   - Amount: `10000`
   - Participants: 
     - Hardik Sharma  
     - Smriti Ojha
       
### Balance Sheet

| Description  | Participant   | Amount Owed |
|--------------|---------------|-------------|
| Dinner       | Hardik Sharma | 1000.00     |
| Dinner       | Smriti Ojha   | 1000.00     |
| Dinner       | Geeta Sharma  | 1000.00     |
| Shopping     | Hardik Sharma | 5000.00     |
| Shopping     | Smriti Ojha   | 3000.00     |
| Shopping     | Geeta Sharma  | 2000.00     |
| Shopping     | Hardik Sharma | 5000.00     |
| Shopping     | Smriti Ojha   | 3000.00     |
| Shopping     | Geeta Sharma  | 2000.00     |
| Movie Date   | Hardik Sharma | 250.00      |
| Movie Date   | Smriti Ojha   | 250.00      |

### Overall Expenses

| Participant   | Total Owed  |
|---------------|-------------|
| Hardik Sharma | 34250.00    |
| Smriti Ojha   | 7750.00     |
| Geeta Sharma  | 5000.00     |
