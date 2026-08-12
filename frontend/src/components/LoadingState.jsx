export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
      <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
