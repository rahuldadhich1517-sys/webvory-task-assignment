export default function Select({ label, error, children, ...props }) {
  return (
    <label className="block space-y-2 text-sm text-slate-700">
      {label && <span className="font-medium">{label}</span>}
      <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900" {...props}>
        {children}
      </select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  )
}
