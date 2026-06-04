import React, { useState } from 'react'
import StatusBadge from '../StatusBadge/StatusBadge'
import './TaskRow.css'

function TaskRow({ task, onSave, onDelete }) {

  var [editing, setEditing] = useState(false)
  var [name, setName] = useState(task.name)
  var [status, setStatus] = useState(task.status)

  function startEdit() {
    setName(task.name)
    setStatus(task.status)
    setEditing(true)
  }

  function save() {
    if (name.trim() == '') return
    var ok = onSave(task.id, name.trim(), status)
    if (ok) setEditing(false)
  }

  return (
    <tr>
      <td className="key-col">{task.key}</td>

      <td>
        {editing
          ? <input className="edit-input" value={name} autoFocus onChange={function(e) { setName(e.target.value) }} />
          : task.name}
      </td>

      <td>
        {editing
          ? <select className="edit-select" value={status} onChange={function(e) { setStatus(e.target.value) }}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          : <StatusBadge status={task.status} />}
      </td>

      <td>
        {editing ? (
          <div className="action-col">
            <button className="save-row-btn" onClick={save}>Save</button>
            <button className="cancel-row-btn" onClick={function() { setEditing(false) }}>Cancel</button>
          </div>
        ) : (
          <div className="action-col">
            <button className="edit-row-btn" onClick={startEdit}>Edit</button>
            <button className="delete-row-btn" onClick={function() { onDelete(task.id) }}>Delete</button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default TaskRow
