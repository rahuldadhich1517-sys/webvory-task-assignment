const statusStyles = {
  Pending: 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-sky-100 text-sky-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Blocked: 'bg-rose-100 text-rose-700',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}
