export default function TreeSelect({
  data = [],
  value,
  onChange,
  disabledIds = [],
}) {
  const render = (items, level = 0) =>
    items.map((item) => {
      const disabled = disabledIds.includes(item.id);

      return (
        <div key={item.id}>
          <label
            className={`flex items-center px-2 py-1 rounded
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"}
            `}
            style={{ paddingLeft: `${level * 16}px` }}
          >
            <input
              type="radio"
              disabled={disabled}
              checked={value === item.id}
              onChange={() => onChange(item.id)}
              className="mr-2"
            />
            {item.name}
          </label>

          {item.children?.length > 0 &&
            render(item.children, level + 1)}
        </div>
      );
    });

  return (
    <div className="border rounded p-2 max-h-64 overflow-y-auto">
      <label className="flex items-center px-2 py-1 cursor-pointer">
        <input
          type="radio"
          checked={value === null}
          onChange={() => onChange(null)}
          className="mr-2"
        />
        Danh mục gốc
      </label>

      {render(data)}
    </div>
  );
}
