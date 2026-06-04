import React, { useState, useEffect } from 'react'
import TaskTable from '../TaskTable/TaskTable'
import './TasksPage.css'

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
  var [search, setSearch]       = useState('')
  var [showForm, setShowForm]   = useState(false)
  var [newName, setNewName]     = useState('')
  var [newStatus, setNewStatus] = useState('todo')

  useEffect(function() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('nextId', nextId)
  }, [tasks, nextId])

  function addTask() {
    if (newName.trim() == '') { alert('Enter a task name'); return }
    setTasks([...tasks, { id: nextId, key: 'TSK-' + nextId, name: newName.trim(), status: newStatus }])
    setNextId(nextId + 1)
    setNewName(''); setNewStatus('todo'); setShowForm(false)
  }

  function deleteTask(id) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id != id) updated.push(tasks[i])
    }
    setTasks(updated)
  }

  function saveEdit(id, name, status) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) updated.push({ ...tasks[i], name: name, status: status })
      else updated.push(tasks[i])
    }
    setTasks(updated)
    return true
  }

  // filter tasks
  var filtered = []
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i]
    if ((activeTab == 'all' || t.status == activeTab) && t.name.toLowerCase().includes(search.toLowerCase())) {
      filtered.push(t)
    }
  }

  // count done
  var doneCount = 0
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'done') doneCount++
  }

  return (
    <div className="tasks-page">
      <div className="tasks-card">

        <div className="tasks-header">
          <div>
            <h2>Tasks</h2>
            <p className="task-count">{tasks.length} tasks &nbsp;·&nbsp; {doneCount} done</p>
          </div>
          <div className="tabs">
            <button className={activeTab == 'all'         ? 'tab active' : 'tab'} onClick={function() { setActiveTab('all') }}>All</button>
            <button className={activeTab == 'in-progress' ? 'tab active' : 'tab'} onClick={function() { setActiveTab('in-progress') }}>In Progress</button>
            <button className={activeTab == 'todo'        ? 'tab active' : 'tab'} onClick={function() { setActiveTab('todo') }}>Todo</button>
            <button className={activeTab == 'done'        ? 'tab active' : 'tab'} onClick={function() { setActiveTab('done') }}>Done</button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-bar">
            <span>&#128269;</span>
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

        <TaskTable tasks={filtered} onSave={saveEdit} onDelete={deleteTask} />

      </div>
    </div>
  )
}

export default TasksPage
