import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import TasksPage from './components/TasksPage/TasksPage'

function App() {

  var [page, setPage] = useState('home')
  var [darkMode, setDarkMode] = useState(false)
  var [user, setUser] = useState(function() {
    var saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : { firstName: 'Karthik', lastName: '', email: '', password: '' }
  })

  useEffect(function() {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(function() {
    if (darkMode) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [darkMode])

  return (
    <div>
      <Navbar
        page={page}
        setPage={setPage}
        darkMode={darkMode}
        toggleTheme={function() { setDarkMode(!darkMode) }}
        user={user}
        setUser={setUser}
      />
      <div className="page-wrapper">
        {page == 'home' ? <HomePage setPage={setPage} /> : <TasksPage />}
      </div>
    </div>
  )
}

export default App
