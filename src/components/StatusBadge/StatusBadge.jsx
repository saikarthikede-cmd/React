import React from 'react'
import './StatusBadge.css'

function StatusBadge({ status }) {
  var label = status == 'todo' ? 'To Do' : status == 'in-progress' ? 'In Progress' : 'Done'
  return <span className={'badge badge-' + status}>{label}</span>
}

export default StatusBadge
