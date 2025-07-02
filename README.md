# Smart Doctor Appointment System 🩺

A full-stack web application that allows patients to book appointments with doctors, and doctors to manage their schedules via a dedicated dashboard. Built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Features

### 👨‍⚕️ For Doctors
- Register and log in as a doctor
- View upcoming appointments
- Access a personalized doctor dashboard

### 🧑‍💻 For Patients
- Register and log in as a patient
- View available doctors
- Book an appointment with selected date and time
- View and manage your bookings

### 🔐 Authentication
- Role-based login for doctors and patients
- Protected routes using `localStorage` state

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | React.js + Tailwind CSS |
| Backend     | Node.js, Express.js  |
| Database    | MongoDB (Mongoose)   |
| Auth        | bcryptjs, JWT        |
| Deployment  | Vercel (Frontend), Render (Backend) |

---


---

## ⚙️ Installation

### 🔧 Prerequisites
- Node.js v16+
- MongoDB Atlas (or local MongoDB)

### 1. Clone the repo

2. Setup Backend
cd backend
npm install
touch .env

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run backend:

node server.js



Setup Frontend

cd client
npm install

npm run dev


Author
Kabir
Enterprise Application Development — Spring 2025

✅ Future Improvements

Add calendar view for doctors/patients

Email/SMS appointment notifications

Admin dashboard

Doctor availability configuration







