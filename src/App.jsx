import React, { useState } from 'react'

var initialTasks = [
  { id: 1, key: 'TSK-1', name: 'Usability Testing', status: 'in-progress' },
  { id: 2, key: 'TSK-2', name: 'Conduct User Research', status: 'in-progress' },
  { id: 3, key: 'TSK-3', name: 'Develop User Stories', status: 'todo' },
  { id: 4, key: 'TSK-4', name: 'Interactive Prototype', status: 'done' },
  { id: 5, key: 'TSK-5', name: 'User Journey Maps', status: 'todo' },
]

function Navbar({ page, setPage }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">T</div>
        <span className="site-name">TaskTodo</span>
      </div>
      <div className="nav-middle">
        <button
          className={page === 'home' ? 'nav-btn active' : 'nav-btn'}
          onClick={function() { setPage('home') }}
        >Home</button>
        <button
          className={page === 'tasks' ? 'nav-btn active' : 'nav-btn'}
          onClick={function() { setPage('tasks') }}
        >Tasks</button>
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

function HomePage({ setPage }) {
  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <p>A simple way to add, track and manage your daily tasks.</p>
      <button className="get-started-btn" onClick={function() { setPage('tasks') }}>
        Get Started
      </button>
    </div>
  )
}

function StatusBadge({ status }) {
  var label = status === 'in-progress' ? 'In Progress' : status === 'todo' ? 'To Do' : 'Done'
  return <span className={'badge badge-' + status}>{label}</span>
}

function TasksPage() {
  var [tasks, setTasks] = useState(initialTasks)
  var [activeTab, setActiveTab] = useState('all')
  var [search, setSearch] = useState('')
  var [showForm, setShowForm] = useState(false)
  var [newName, setNewName] = useState('')
  var [newStatus, setNewStatus] = useState('todo')
  var [nextId, setNextId] = useState(6)

  var tabs = [
    { key: 'all', label: 'All' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'todo', label: 'Todo' },
    { key: 'done', label: 'Done' },
  ]

  var filtered = tasks.filter(function(t) {
    var matchTab = activeTab === 'all' || t.status === activeTab
    var matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                      t.key.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  function addTask() {
    if (newName.trim() === '') {
      alert('Please enter a task name')
      return
    }
    var task = { id: nextId, key: 'TSK-' + nextId, name: newName, status: newStatus }
    setTasks([...tasks, task])
    setNextId(nextId + 1)
    setNewName('')
    setNewStatus('todo')
    setShowForm(false)
  }

  function deleteTask(id) {
    setTasks(tasks.filter(function(t) { return t.id !== id }))
  }

  return (
    <div className="tasks-page">
      <div className="tasks-card">

        <div className="tasks-header">
          <h2>Tasks</h2>
          <div className="tabs">
            {tabs.map(function(tab) {
              return (
                <button
                  key={tab.key}
                  className={activeTab === tab.key ? 'tab active' : 'tab'}
                  onClick={function() { setActiveTab(tab.key) }}
                >{tab.label}</button>
              )
            })}
          </div>
        </div>

        <div className="search-bar">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={function(e) { setSearch(e.target.value) }}
          />
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Status</th>
              <th>
                <button className="add-btn" onClick={function() { setShowForm(!showForm) }}>+</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(function(task) {
              return (
                <tr key={task.id}>
                  <td className="key-col">{task.key}</td>
                  <td>{task.name}</td>
                  <td><StatusBadge status={task.status} /></td>
                  <td>
                    <button className="delete-row-btn" onClick={function() { deleteTask(task.id) }}>&#10005;</button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-row">No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>

        {showForm && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Task name"
              value={newName}
              onChange={function(e) { setNewName(e.target.value) }}
              onKeyDown={function(e) { if (e.key === 'Enter') addTask() }}
              autoFocus
            />
            <select value={newStatus} onChange={function(e) { setNewStatus(e.target.value) }}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button className="form-add-btn" onClick={addTask}>Add</button>
            <button className="form-cancel-btn" onClick={function() { setShowForm(false) }}>Cancel</button>
          </div>
        )}

      </div>
    </div>
  )
}

function App() {
  var [page, setPage] = useState('home')
  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page === 'home' ? <HomePage setPage={setPage} /> : <TasksPage />}
    </div>
  )
}

export default App
