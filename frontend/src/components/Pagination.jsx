export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
      <span>{`Page ${page} of ${totalPages}`}</span>
      <div className="flex items-center gap-2">
        <button className="rounded-lg border border-slate-300 bg-white px-3 py-1 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50" disabled={prevDisabled} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <button className="rounded-lg border border-slate-300 bg-white px-3 py-1 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50" disabled={nextDisabled} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
