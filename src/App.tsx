import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Home from './pages/home'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/dashboard'
import InstagramCallback from './components/InstagramCallback'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" />
            </SignedIn>
            <SignedOut>
              <Home />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/auth/callback" element={<InstagramCallback />} />
    </Routes>
  )
}

export default App