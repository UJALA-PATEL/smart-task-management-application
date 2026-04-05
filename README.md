# Smart Task Manager

Smart Task Manager is a full-stack web application designed to help users efficiently manage their daily tasks. It allows task creation, editing, deletion, completion tracking, and provides visual analytics for productivity.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Task Types](#task-types)
4. [Technologies Used](#technologies-used)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [Project Flow](#project-flow)
8. [Screenshots](#screenshots)
9. [Installation](#installation)
10. [Deployment](#deployment)
11. [License](#license)

---

## Project Overview
Smart Task Manager helps users organize their tasks with priority, points, due dates, and tags. It includes:
- Task management (CRUD operations)
- Productivity analytics using charts
- Voice-based task input
- Dark/Light mode toggle
- Search and filter tasks

---

## Features
- **Task Management:** Add, edit, delete, and complete tasks  
- **Priority Levels:** Low, Medium, High  
- **Points System:** Assign points to tasks  
- **Due Dates:** Track deadlines  
- **Productivity Analytics:** Visual charts showing Completed vs Pending vs High Priority tasks  
- **Search & Filter:** Quickly find tasks  
- **Dark/Light Mode:** Switch interface theme  
- **Voice Input:** Add tasks using natural language commands

---

## Task Types
- **Low Priority:** Tasks with low urgency  
- **Medium Priority:** Tasks with moderate urgency  
- **High Priority:** Critical tasks  
- **Completed:** Tasks marked as finished  
- **Pending:** Tasks still in progress

---

## Technologies Used

### Frontend
- React.js with Hooks  
- React Router DOM (routing)  
- Axios (API requests)  
- Bootstrap (UI styling)  
- Chart.js (productivity analytics)  

### Backend
- Node.js + Express.js (server)  
- MongoDB with Mongoose (database)  
- JWT (authentication)  
- RESTful API endpoints  

---

## Frontend
- **Login Page:** User authentication  
- **Signup Page:** User registration  
- **Dashboard:** Add, edit, delete, complete tasks; view productivity analytics  
- **Charts:** Visual representation of tasks by status using Chart.js  
- **Dark/Light Mode:** LocalStorage-based theme toggle  
- **Voice Task Input:** Add task using microphone  

---

## Backend
- **Auth Routes:** `/api/auth/login`, `/api/auth/signup`  
- **Task Routes:** `/api/tasks` for CRUD operations  
- **MongoDB Collections:** `users`, `tasks`  
- **JWT Authentication:** Secure user data and task operations  

---

## Project Flow
1. User Signup / Login  
2. Redirect to Dashboard  
3. Add tasks with title, description, priority, points, due date, and tags  
4. Mark tasks as completed or edit/delete tasks  
5. Dashboard updates productivity chart automatically  
6. Use search/filter to find tasks  
7. Optional: Add tasks via voice input  
8. Toggle Dark/Light mode  

---



**Chart Visualization:**  
- Orange → Pending  
- Green → Completed  
- Red → High Priority  

---

## Installation
1. Clone repository:
```bash
git clone <your-repo-link>