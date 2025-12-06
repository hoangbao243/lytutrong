"use client";

export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg animate-fade">
        <h2 className="text-lg font-semibold text-gray-800">
          Xác nhận xóa
        </h2>
        <p className="text-gray-600 mt-2">
          Bạn có chắc chắn muốn xóa không?
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
