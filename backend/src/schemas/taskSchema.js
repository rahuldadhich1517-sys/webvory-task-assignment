const validStatuses = ['Pending', 'In Progress', 'Completed', 'Blocked']
const validPriorities = ['Low', 'Medium', 'High', 'Urgent']

export function validateTask(task, isUpdate = false) {
  const errors = []
  if (!task.title || !task.title.trim()) {
    errors.push('Title is required')
  }
  if (!isUpdate && !task.status) {
    errors.push('Status is required')
  }
  if (task.status && !validStatuses.includes(task.status)) {
    errors.push('Invalid status')
  }
  if (!isUpdate && !task.priority) {
    errors.push('Priority is required')
  }
  if (task.priority && !validPriorities.includes(task.priority)) {
    errors.push('Invalid priority')
  }
  if (!isUpdate && !task.assigned_to) {
    errors.push('Assigned user is required')
  }
  if (task.assigned_to && Number.isNaN(Number(task.assigned_to))) {
    errors.push('Assigned user must be a valid ID')
  }
  if (task.due_date && Number.isNaN(Date.parse(task.due_date))) {
    errors.push('Due date must be valid')
  }
  return { valid: !errors.length, errors }
}
