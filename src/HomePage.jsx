import React from 'react'

function HomePage({ setPage }) {
  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <p>A simple way to add, track and manage your daily tasks.</p>
      <button className="get-started-btn" onClick={function() { setPage("tasks") }}>
        Get Started
      </button>
    </div>
  )
}

export default HomePage
