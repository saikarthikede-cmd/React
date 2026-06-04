import React, { useState, useEffect } from 'react'
import StatusBadge from './StatusBadge'

function TasksPage() {

  var [tasks, setTasks] = useState(function() {
    var saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  var [nextId, setNextId] = useState(function() {
    var saved = localStorage.getItem('nextId')
    return saved ? parseInt(saved) : 1
  })

  var [activeTab, setActiveTab] = useState('all')
  var [search, setSearch] = useState('')
  var [showForm, setShowForm] = useState(false)
  var [newName, setNewName] = useState('')
  var [newStatus, setNewStatus] = useState('todo')
  var [editId, setEditId] = useState(null)
  var [editName, setEditName] = useState('')
  var [editStatus, setEditStatus] = useState('todo')

  useEffect(function() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('nextId', nextId)
  }, [tasks, nextId])

  function addTask() {
    if (newName.trim() == '') { alert('Enter a task name'); return }
    setTasks([...tasks, { id: nextId, key: 'TSK-' + nextId, name: newName, status: newStatus }])
    setNextId(nextId + 1)
    setNewName('')
    setNewStatus('todo')
    setShowForm(false)
  }

  function deleteTask(id) {
    setTasks(tasks.filter(function(t) { return t.id != id }))
  }

  function startEdit(task) {
    setEditId(task.id)
    setEditName(task.name)
    setEditStatus(task.status)
  }

  function saveEdit(id) {
    if (editName.trim() == '') return
    setTasks(tasks.map(function(t) {
      return t.id == id ? { ...t, name: editName, status: editStatus } : t
    }))
    setEditId(null)
  }

  var filtered = tasks.filter(function(t) {
    return (activeTab == 'all' || t.status == activeTab) &&
           t.name.toLowerCase().includes(search.toLowerCase())
  })

  var doneCount = tasks.filter(function(t) { return t.status == 'done' }).length

  return (
    <div className="tasks-page">
      <div className="tasks-card">

        <div className="tasks-header">
          <div>
            <h2>Tasks</h2>
            <p className="task-count">{tasks.length} tasks &nbsp;·&nbsp; {doneCount} done</p>
          </div>
          <div className="tabs">
            <button className={activeTab == 'all' ? 'tab active' : 'tab'} onClick={function() { setActiveTab('all') }}>All</button>
            <button className={activeTab == 'in-progress' ? 'tab active' : 'tab'} onClick={function() { setActiveTab('in-progress') }}>In Progress</button>
            <button className={activeTab == 'todo' ? 'tab active' : 'tab'} onClick={function() { setActiveTab('todo') }}>Todo</button>
            <button className={activeTab == 'done' ? 'tab active' : 'tab'} onClick={function() { setActiveTab('done') }}>Done</button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-bar">
            <span className="search-icon">&#128269;</span>
            <input type="text" placeholder="Search tasks..." value={search} onChange={function(e) { setSearch(e.target.value) }} />
          </div>
          <button className="add-task-btn" onClick={function() { setShowForm(!showForm) }}>+ Add Task</button>
        </div>

        {showForm && (
          <div className="add-form">
            <input type="text" placeholder="Task name" value={newName} autoFocus
              onChange={function(e) { setNewName(e.target.value) }}
              onKeyDown={function(e) { if (e.key == 'Enter') addTask() }}
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

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function(task) {
                var isEditing = editId == task.id
                return (
                  <tr key={task.id}>

                    <td className="key-col">{task.key}</td>

                    <td>
                      {isEditing
                        ? <input className="edit-name-input" value={editName} autoFocus onChange={function(e) { setEditName(e.target.value) }} />
                        : task.name}
                    </td>

                    <td>
                      {isEditing
                        ? <select className="edit-status-select" value={editStatus} onChange={function(e) { setEditStatus(e.target.value) }}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        : <StatusBadge status={task.status} />}
                    </td>
                    
                    <td className="action-col">
                      {isEditing ? (
                        <div>
                          <button className="save-row-btn" onClick={function() { saveEdit(task.id) }}>Save</button>
                          <button className="cancel-row-btn" onClick={function() { setEditId(null) }}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button className="edit-row-btn" onClick={function() { startEdit(task) }}>Edit</button>
                          <button className="delete-row-btn" onClick={function() { deleteTask(task.id) }}>Delete</button>
                        </div>
                      )}
                    </td>

                  </tr>
                )
              })}
              {filtered.length == 0 && (
                <tr><td colSpan="4" className="empty-row">No tasks found</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default TasksPage
