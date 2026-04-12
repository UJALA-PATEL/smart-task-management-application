# 🚀 Smart Task Manager (MERN Stack)

A full-stack Task Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows users to efficiently manage tasks with authentication, role-based access, analytics, calendar view, voice input, and dark mode support.

---

## 🌟 Features

### 🔐 Authentication System
- User Signup & Login  
- JWT-based authentication  
- Password encryption using bcryptjs  
- Protected routes (frontend + backend)  

---

### ✅ Task Management
- Create tasks with title, description, due date  
- Assign tasks to users via email  
- Update task status (Todo / In Progress / Done)  
- Delete tasks (only by creator)  
- Role-based task access control  

---

### 👥 Task Roles

#### 👨‍💼 Creator
- Create tasks  
- Edit task details  
- Delete tasks  
- Assign tasks to users  

#### 👤 Assignee
- Can only update task status  
- Cannot edit task details  

---

## 📊 Analytics Dashboard
- Task status visualization using Chart.js  
- Productivity tracking  
- Filter tasks (All / Week / Month)  
- Performance insights with graphs  

---

## 📅 Calendar View
- Interactive task calendar  
- Due date tracking  
- Color-coded tasks:  
  - 🔴 Todo  
  - 🟡 In Progress  
  - 🟢 Done  

---

## 👥 Team Collaboration
- View tasks assigned by you  
- View tasks assigned to you  
- Workspace-style task tracking  

---

## ⚙ Settings Panel
- User profile display  
- Account information  
- Dark / Light mode toggle  
- Persistent theme using localStorage  

---

## 🌙 Dark Mode
- Global dark/light theme system  
- Works across all pages  
- Saves user preference automatically  
- Smooth UI transitions  

---

## 🎤 Voice Task Feature
- Create tasks using voice commands  
- Speech Recognition API integration  

Example:  
"Add task title Buy Milk priority high due 2026-03-20"

---

## 🔍 Extra Features
- Task search & filter  
- Priority levels (Low / Medium / High)  
- Deadline alerts (Due Today / Overdue)  
- Responsive UI design  
- Smooth animations  
- Clean modern interface  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Bootstrap  
- Chart.js  
- Framer Motion  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### Authentication
- JWT (JSON Web Token)  
- bcryptjs  

---

## 📁 Project Structure

smart-task-manager/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── api.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js

---

## 🚀 Setup Instructions

### Backend
cd backend  
npm install  
npm start  

### Frontend
cd frontend  
npm install  
npm start  

---

## 🌐 Environment Variables

### Backend (.env)
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
FRONTEND_URL=http://localhost:3000  

### Frontend (.env)
REACT_APP_API_URL=http://localhost:5000  

---

## 🏆 Highlights
- Full MERN Stack Project  
- Role-based Task System  
- Calendar + Analytics Dashboard  
- Voice-enabled task creation  
- Dark mode support  
- Team collaboration system  
- Professional UI/UX  

---

## 👨‍💻 Author
Built for learning and mastering full-stack development using MERN stack.

---

⭐ If you like this project, don't forget to star the repository!