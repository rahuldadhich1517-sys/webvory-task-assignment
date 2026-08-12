import Button from './Button.jsx'
import Modal from './Modal.jsx'

export default function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <div className="flex justify-end gap-3">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={onCancel}>
            Cancel
          </button>
          <Button className="bg-rose-600 hover:bg-rose-500" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
    </Modal>
  )
}
