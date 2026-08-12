export default function ErrorState({ message = 'Something went wrong.' }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
