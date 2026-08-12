export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60 ${className}`} {...props}>
      {children}
    </button>
  )
}
