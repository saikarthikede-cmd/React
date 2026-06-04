import React, { useState } from 'react'
import TaskItem from '../TaskItem/TaskItem'
import './TasksPage.css'

function TasksPage() {

  var [tasks, setTasks] = useState([])
  var [input, setInput] = useState('')

  function addTask() {
    if (input.trim() == '') { alert('Please type something'); return }
    setTasks([...tasks, input.trim()])
    setInput('')
  }

  function deleteTask(index) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (i != index) updated.push(tasks[i])
    }
    setTasks(updated)
  }

  function saveTask(index, value) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (i == index) updated.push(value)
      else updated.push(tasks[i])
    }
    setTasks(updated)
  }

  return (
    <div className="container">
      <h1>My Task List</h1>

      <input type="text" placeholder="Enter task" value={input} onChange={function(e) { setInput(e.target.value) }} />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(function(task, index) {
          return <TaskItem key={index} task={task} index={index} onSave={saveTask} onDelete={deleteTask} />
        })}
      </ul>
    </div>
  )
}

export default TasksPage
