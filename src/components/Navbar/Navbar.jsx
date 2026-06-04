import React from 'react'
import './Navbar.css'

function Navbar({ page, setPage }) {
  return (
    <div className="navbar">

      <div className="nav-left">
        <div className="logo">T</div>
        <span className="site-name">TaskTodo</span>
      </div>

      <div className="nav-middle">
        <button className={page == 'home'  ? 'nav-btn active' : 'nav-btn'} onClick={function() { setPage('home') }}>Home</button>
        <button className={page == 'tasks' ? 'nav-btn active' : 'nav-btn'} onClick={function() { setPage('tasks') }}>Tasks</button>
      </div>

      <div className="nav-right">
        <div className="profile">
          <div className="avatar">K</div>
          <span>Karthik</span>
        </div>
      </div>

    </div>
  )
}

export default Navbar
