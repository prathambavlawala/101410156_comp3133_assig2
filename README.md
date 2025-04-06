# 🧑‍💼 Employee Management System (COMP3133)

A full-stack Employee Management System built using:

- 🌐 **Angular** (Standalone Components, Material UI, Apollo Client)
- 🚀 **Node.js + Express** backend with **GraphQL**
- 🛢️ **MongoDB Atlas** for data storage
- 🔐 JWT-based Authentication
- 📦 Deployed on **Vercel**

---


## 🚀 Live Demo

| Platform | Link |
|---------|------|
| 🔧 Frontend | https://101410156-comp3133-assig2.vercel.app/login |
| 📡 Backend | https://pratham-comp3133-101410156-assignment1.onrender.com/ |

---

## 🔐 Features

- ✅ User Signup & Login (JWT authentication)
- 📋 Add, View, Update, Delete Employees
- 🔍 Search by Department / Designation
- 🧠 GraphQL API with queries & mutations
- 🧪 Tested using Postman
- 🎨 Angular Material UI

---

## 📦 Installation

### 🖥️ Backend

```bash
cd backend
npm install
```

> Create a `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

```bash
node server.js
```

### 🌐 Frontend

```bash
cd frontend
npm install
ng serve
```

---

## 🧪 GraphQL API Testing (Postman)

### 🛠 Setup
- Endpoint: `http://localhost:5000/graphql`
- Method: `POST`
- Headers:
  ```
  Content-Type: application/json
  ```

### ✅ Examples

#### ➕ Signup
```json
{
  "query": "mutation { signup(username: \"user1\", email: \"user1@example.com\", password: \"password123\") { id username email } }"
}
```

#### 🔐 Login
```json
{
  "query": "query { login(email: \"user1@example.com\", password: \"password123\") { id email token } }"
}
```

#### ➕ Add Employee
```json
{
  "query": "mutation { addEmployee(first_name: \"Johnny\", last_name: \"Liver\", email: \"johnny1@example.com\", gender: \"Male\", designation: \"Developer\", salary: 5000, date_of_joining: \"2024-05-01\", department: \"IT\") { id first_name } }"
}
```

#### ❌ Error Example (Missing Field)
```json
{
  "query": "mutation { addEmployee(first_name: \"John\") { id } }"
}
```

## Screenshots

![image](https://github.com/user-attachments/assets/5256c7d5-449c-4645-948a-fc35a6f012c8)
![image](https://github.com/user-attachments/assets/1cc1b730-1613-4a91-a242-abdb053dd75e)

![image](https://github.com/user-attachments/assets/20737d66-3c77-4f77-9a22-c80d0375cf48)
![image](https://github.com/user-attachments/assets/c30877d6-feef-46ae-88ed-3ccae7c01e6d)
![image](https://github.com/user-attachments/assets/cb98f0f2-2175-4694-9fae-feb9cc54d37a)
![image](https://github.com/user-attachments/assets/64591e46-5660-4f9a-89f8-15328f34e130)









## 🧑‍🎓 Author

**Pratham Bavlawala**  
Student ID: `101410156`  
COMP3133 - Web Frameworks

---

## 📜 License

This project is licensed under the MIT License.
