import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import TasksPage from './components/TasksPage/TasksPage'

function App() {
  var [page, setPage] = useState('home')

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page == 'home' ? <HomePage setPage={setPage} /> : <TasksPage />}
    </div>
  )
}

export default App
