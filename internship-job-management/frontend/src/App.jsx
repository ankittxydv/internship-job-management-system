import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Companies from './pages/admin/Companies'
import AdminJobs from './pages/admin/AdminJobs'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Applicants from './pages/admin/Applicants'
import MyApplications from './pages/MyApplications'
import ManageJobs from './pages/admin/ManageJobs'
import PostJob from './pages/admin/PostJob'
import RegisterCompany from './pages/admin/RegisterCompany'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/jobs',
    element: <Jobs />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/description/:id',
    element: <JobDetails />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/my-applications',
    element: <ProtectedRoute><MyApplications /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  // admin
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><RegisterCompany /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/admin/jobs/manage',
    element: <ProtectedRoute><ManageJobs /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  // 404 catch-all route
  {
    path: '*',
    element: <NotFound />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
