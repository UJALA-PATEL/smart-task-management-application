# 🚀 Smart Task Manager (MERN)

A full-stack Task Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This application allows users to manage personal and assigned tasks with secure authentication and role-based access control.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

---

### ✅ Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks

---

### 📋 Task Fields
- Title
- Description
- Status (Todo / In Progress / Done)
- Due Date

---

### 👥 Task Types

#### 1. Personal Tasks
- Created by user
- Visible only to creator
- Fully editable

#### 2. Assigned Tasks
- Assign tasks to other users
- Visible to both assigner & assignee

---

### 🔒 Role-Based Permissions

#### Assignee:
- Can update only **task status**
- Cannot edit title, description, or due date

#### Assigner:
- Can update **due date**
- Can view progress
- Cannot update task status

---

### 🛡 Security
- Users cannot access tasks they are not related to
- API-level authorization checks implemented

---

## 🌟 Extra Features (Added Beyond Requirements)

👉 These features were implemented to enhance usability and user experience:

- 🎤 Voice-based task creation (Speech Recognition)
- 📊 Task analytics with Pie Chart (status-based visualization)
- 🔍 Search & filter tasks (by status & keyword)
- 🌙 Dark mode toggle for better UI experience
- 🏷 Task tags & points system
- ⚠ Deadline alerts (Due Today / Overdue)
- 📱 Clean and responsive UI

---

## 🖥 Tech Stack

### Frontend:
- React.js
- Bootstrap
- Chart.js

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

### Authentication:
- JWT (JSON Web Token)
