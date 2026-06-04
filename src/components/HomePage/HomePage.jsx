import React from 'react'
import './HomePage.css'

function HomePage({ setPage }) {
  return (
    <div className="home-container">
      <h1>Welcome to TaskTodo</h1>
      <p>Manage your tasks easily</p>
      <button className="get-started-btn" onClick={function() { setPage('tasks') }}>
        Get Started
      </button>
    </div>
  )
}

export default HomePage
