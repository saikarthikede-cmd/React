import React, { useState, useEffect } from 'react'
import './Navbar.css'

function getInitials(first, last) {
  var f = first ? first.trim()[0].toUpperCase() : ''
  var l = last  ? last.trim()[0].toUpperCase()  : ''
  return f + l || 'U'
}

function Navbar({ page, setPage, darkMode, toggleTheme, user, setUser }) {

  var [showPanel, setShowPanel] = useState(false)
  var [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })

  useEffect(function() {
    if (showPanel) setForm({ ...user })
  }, [showPanel])

  function saveProfile() {
    if (!form.firstName.trim()) { alert('First name is required'); return }
    setUser({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email, password: form.password })
    setShowPanel(false)
  }

  return (
    <>
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
          <button className="theme-btn" onClick={toggleTheme}>{darkMode ? '☀ Light' : '☾ Dark'}</button>
          <div className="profile" onClick={function() { setShowPanel(true) }}>
            <div className="avatar">{getInitials(user.firstName, user.lastName)}</div>
            <span>{user.firstName}</span>
          </div>
        </div>

      </div>

      {showPanel && <div className="overlay" onClick={function() { setShowPanel(false) }}></div>}

      <div className={'panel' + (showPanel ? ' open' : '')}>

        <div className="panel-head">
          <div className="panel-avatar">{getInitials(user.firstName, user.lastName)}</div>
          <div>
            <p className="panel-name">{user.firstName} {user.lastName}</p>
            <p className="panel-sub">Edit your profile</p>
          </div>
          <button className="panel-close" onClick={function() { setShowPanel(false) }}>✕</button>
        </div>

        <div className="panel-body">
          <label>First Name</label>
          <input placeholder="First name" value={form.firstName} onChange={function(e) { setForm({ ...form, firstName: e.target.value }) }} />

          <label>Last Name</label>
          <input placeholder="Last name"  value={form.lastName}  onChange={function(e) { setForm({ ...form, lastName: e.target.value }) }} />

          <label>Email</label>
          <input placeholder="Email" type="email" value={form.email} onChange={function(e) { setForm({ ...form, email: e.target.value }) }} />

          <label>Password</label>
          <input placeholder="Password" type="password" value={form.password} onChange={function(e) { setForm({ ...form, password: e.target.value }) }} />

          <div className="avatar-preview">
            <span>Avatar preview</span>
            <div className="avatar">{getInitials(form.firstName, form.lastName)}</div>
          </div>

          <button className="save-btn"   onClick={saveProfile}>Save</button>
          <button className="cancel-btn" onClick={function() { setShowPanel(false) }}>Cancel</button>
        </div>

      </div>
    </>
  )
}

export default Navbar
