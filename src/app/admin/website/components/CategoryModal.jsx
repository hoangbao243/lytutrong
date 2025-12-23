import { useEffect, useState } from "react";
import TreeSelect from "./TreeSelect";

export default function CategoryModal({
  open,
  onClose,
  onSubmit,
  categories = [],
  category = null, // null = add | object = edit
}) {
  const isEdit = Boolean(category);

  const [name, setName] = useState("");
  const [parent, setParent] = useState(null);

  // lấy id của chính nó + con để disable
  const collectIds = (item) => {
    let ids = [item.id];
    item.children?.forEach((c) => {
      ids = ids.concat(collectIds(c));
    });
    return ids;
  };

  const disabledIds = category ? collectIds(category) : [];

  useEffect(() => {
    if (category) {
      setName(category.name);
      setParent(category.parent ?? null);
      console.log(category);
      
    } else {
      setName("");
      setParent(null);
    }
  }, [category, open]);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Tên không được trống");

    onSubmit({
      id: category?.id,
      name,
      parent,
    });
  };

  useEffect(()=>{
console.log("parent......",parent);

  },[parent])
 if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Cập nhật danh mục" : "Thêm danh mục"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TreeSelect
            data={categories}
            value={parent}
            onChange={setParent}
            disabledIds={disabledIds}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
