import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111827',
            color: '#f8fafc',
            border: '1px solid rgba(99, 102, 241, 0.45)',
            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.32)',
            borderRadius: '14px',
            padding: '0.8rem 1rem',
            fontSize: '0.95rem',
          },
          success: {
            style: {
              borderColor: 'rgba(34, 197, 94, 0.65)',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#f8fafc',
            },
          },
          error: {
            style: {
              borderColor: 'rgba(239, 68, 68, 0.7)',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f8fafc',
            },
          },
        }}
      />
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
