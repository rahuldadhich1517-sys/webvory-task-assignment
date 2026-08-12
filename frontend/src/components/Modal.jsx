export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          </div>
          <button className="text-slate-500 transition hover:text-slate-900" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
