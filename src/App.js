import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Edit from './components/Edit'
import Home from './components/Home'
import { CrudProvider } from './context/CrudContext'


const App = () => {
  return (
    <CrudProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </CrudProvider>
  )
}

export default App
