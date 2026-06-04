import React, { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, index, onSave, onDelete }) {

  var [editing, setEditing] = useState(false)
  var [value, setValue] = useState(task)

  function startEdit() {
    setValue(task)
    setEditing(true)
  }

  function save() {
    if (value.trim() == '') return
    onSave(index, value.trim())
    setEditing(false)
  }

  return (
    <li>
      {editing
        ? <input className="edit-input" value={value} autoFocus onChange={function(e) { setValue(e.target.value) }} />
        : <span>{task}</span>}

      <div className="buttons">
        {editing
          ? <button className="edit-btn" onClick={save}>Save</button>
          : <button className="edit-btn" onClick={startEdit}>Edit</button>}
        <button className="delete-btn" onClick={function() { onDelete(index) }}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem
