const priorityStyles = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-orange-100 text-orange-700',
  Urgent: 'bg-rose-100 text-rose-700',
}

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority] || 'bg-slate-100 text-slate-700'}`}>
      {priority}
    </span>
  )
}
