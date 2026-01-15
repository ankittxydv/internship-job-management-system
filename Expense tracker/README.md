# Expense Tracker Application

A production-ready, full-stack Expense Tracker application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to monitor their spending habits, categorize expenses, and visualize monthly trends through an intuitive dashboard.

## 🚀 Features

- **Authentication**: Secure JWT-based signup and login with password hashing (bcrypt).
- **Expense Management**: Complete CRUD operations (Create, Read, Update, Delete) for personal expenses.
- **Categorization**: Organize spending into categories (Food, Travel, Rent, Shopping, Other).
- **Analytics Dashboard**:
  - **Category Distribution**: Visualized with a doughnut chart.
  - **Monthly Trends**: Bar chart showing spending patterns across the year.
  - **Summary Cards**: Quick view of total balance, monthly spending, and transaction count.
- **Responsive Design**: Fully mobile-friendly UI built with Tailwind CSS.
- **Protected Routes**: Ensuring data privacy by restricting access to authenticated users only.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS (v4)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT)
- **Charts**: Chart.js, React-Chartjs-2
- **Icons**: Lucide React

## 📦 Project Structure

```text
expense-tracker/
├── backend/
│   ├── controllers/    # API logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth and error handlers
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Application pages
    │   ├── context/    # State management (Auth)
    │   ├── services/   # API communication (Axios)
    │   └── App.jsx     # Routing
    └── tailwind.config.js
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 📝 License
This project is open-source and available under the [ISC License](LICENSE).
