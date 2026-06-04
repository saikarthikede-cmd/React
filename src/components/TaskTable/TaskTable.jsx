import React from 'react'
import TaskRow from '../TaskRow/TaskRow'
import './TaskTable.css'

function TaskTable({ tasks, onSave, onDelete }) {

  if (tasks.length == 0) {
    return (
      <div className="table-wrapper">
        <p className="empty-row">No tasks found</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr><th>Key</th><th>Name</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tasks.map(function(task) {
            return <TaskRow key={task.id} task={task} onSave={onSave} onDelete={onDelete} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable
