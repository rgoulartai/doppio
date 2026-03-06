import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing'
import Learn from './pages/Learn'
import Complete from './pages/Complete'
import { IOSInstallBanner } from './components/IOSInstallBanner'
import { AndroidInstallBanner } from './components/AndroidInstallBanner'
import { getOrCreateAnonUser } from './lib/auth'
import { syncFromSupabase } from './lib/progress'
import { usePageTracking } from './hooks/usePageTracking'

function AppRoutes() {
  usePageTracking()
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
      {/* PWA install banners — platform-detected, shown after 5s delay */}
      <IOSInstallBanner />
      <AndroidInstallBanner />
    </>
  )
}

function App() {
  // Initialize anonymous auth + background Supabase sync on mount
  useEffect(() => {
    void getOrCreateAnonUser()
    void syncFromSupabase()
  }, [])

  // Re-sync when user returns to the tab (e.g., after using a Try-it tool in a new tab)
  useEffect(() => {
    const handleFocus = () => { void syncFromSupabase() }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
