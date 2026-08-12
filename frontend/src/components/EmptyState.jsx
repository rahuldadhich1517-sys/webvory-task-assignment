export default function EmptyState({ message = 'No items found.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
