import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Learn from './pages/Learn'
import Complete from './pages/Complete'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
