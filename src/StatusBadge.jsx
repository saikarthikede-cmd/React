import React from 'react'

function StatusBadge({ status }) {

  var label = ""
  var className = "badge"

  if (status == "in-progress") {
    label = "In Progress"
    className = "badge badge-in-progress"
  } else if (status == "todo") {
    label = "To Do"
    className = "badge badge-todo"
  } else {
    label = "Done"
    className = "badge badge-done"
  }

  return <span className={className}>{label}</span>
}

export default StatusBadge
