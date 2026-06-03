import React, { useState } from 'react'

function Navbar({ page, setPage }) {
  return (
    <div className="navbar">

      <div className="nav-left">
        <div className="logo">T</div>
        <span className="site-name">TaskTodo</span>
      </div>

      <div className="nav-middle">
        <button
          className={page == "home" ? "nav-btn active" : "nav-btn"}
          onClick={function() { setPage("home") }}
        >
          Home
        </button>
        <button
          className={page == "tasks" ? "nav-btn active" : "nav-btn"}
          onClick={function() { setPage("tasks") }}
        >
          Tasks
        </button>
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
      <p>A simple way to add, edit and manage your daily tasks.</p>
      <button className="get-started-btn" onClick={function() { setPage("tasks") }}>
        Get Started
      </button>
    </div>
  )
}

function TasksPage() {

  var [tasks, setTasks] = useState([])
  var [input, setInput] = useState("")
  var [editIndex, setEditIndex] = useState(null)
  var [editValue, setEditValue] = useState("")

  function addTask() {
    if (input.trim() == "") {
      alert("please type something")
      return
    }
    setTasks([...tasks, input])
    setInput("")
  }

  function deleteTask(index) {
    var newTasks = tasks.filter(function(t, i) {
      return i != index
    })
    setTasks(newTasks)
  }

  function startEdit(index) {
    setEditIndex(index)
    setEditValue(tasks[index])
  }

  function saveEdit(index) {
    if (editValue.trim() == "") return
    var newTasks = [...tasks]
    newTasks[index] = editValue
    setTasks(newTasks)
    setEditIndex(null)
    setEditValue("")
  }

  return (
    <div className="container">
      <h1>My Task List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={input}
        onChange={function(e) { setInput(e.target.value) }}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(function(task, index) {
          return (
            <li key={index}>
              {editIndex == index ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editValue}
                  onChange={function(e) { setEditValue(e.target.value) }}
                />
              ) : (
                <span>{task}</span>
              )}
              <div className="buttons">
                {editIndex == index ? (
                  <button className="edit-btn" onClick={function() { saveEdit(index) }}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={function() { startEdit(index) }}>Edit</button>
                )}
                <button className="delete-btn" onClick={function() { deleteTask(index) }}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function App() {
  var [page, setPage] = useState("home")

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page == "home" ? <HomePage setPage={setPage} /> : <TasksPage />}
    </div>
  )
}

export default App
