import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Learn from './pages/Learn'
import Dashboard from './pages/Dashboard'
import Timeline from './pages/Timeline'

function App() {
  return (
    <BrowserRouter>
      {/* The Navbar stays here so it shows up on all pages */}
      <Navbar />

      {/* Routes handle which page content to show below the Navbar */}
      <Routes>
        <Route path="/" element={<Learn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App