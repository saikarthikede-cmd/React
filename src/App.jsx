import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import TasksPage from './components/TasksPage/TasksPage'

function App() {

  var [page, setPage] = useState("home")
  var [darkMode, setDarkMode] = useState(false)

  useEffect(function() {
    if (darkMode) document.body.classList.add("dark")
    else document.body.classList.remove("dark")
  }, [darkMode])

  function toggleTheme() {
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <Navbar page={page} setPage={setPage} darkMode={darkMode} toggleTheme={toggleTheme} />
      {page == "home" ? <HomePage setPage={setPage} /> : <TasksPage />}
    </div>
  )
}

export default App
