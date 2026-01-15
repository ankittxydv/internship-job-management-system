# Internship & Job Management System

A production-ready MERN stack application designed for students to find opportunities and recruiters to manage talent.

## 🚀 Features

### For Students
- **Browse & Search**: Find internships and jobs based on title or description.
- **Job Filtering**: Filter by location, industry, and salary.
- **Easy Application**: Apply to jobs with a single click.
- **Application Tracking**: View the status of all your applied jobs in a personal dashboard.

### For Recruiters
- **Company Management**: Register and manage multiple company profiles.
- **Job Posting**: Create, edit, and delete job listings.
- **Applicant Review**: View all candidates who applied for a job and update their application status (Pending, Accepted, Rejected).
- **Dashboard Stats**: See applicant counts at a glance.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React, Axios, React Router Dom
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcryptjs, Cookie Parser
- **Design**: Premium glassmorphism effects and responsive layouts.

## 📂 Project Structure

```text
internship-job-management/
├── backend/            # Express server and MongoDB models
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth and validation
│   └── utils/          # DB connection and helpers
└── frontend/           # React frontend
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page-level components
    │   ├── context/    # Auth state management
    │   └── utils/      # Constants and helpers
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Backend Setup
1. Navigate to `backend`: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_uri
   SECRET_KEY=your_secret_key
   ```
4. Start the server: `npm run dev` (or `node index.js`)

### Frontend Setup
1. Navigate to `frontend`: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Access at: `http://localhost:5173`

## 🔒 Role-Based Access
- **Students**: Can access job board, job details, and their own profile.
- **Recruiters**: Can access admin dashboards, post jobs, and manage applicants. Restricted from browsing student-focused views if needed.
