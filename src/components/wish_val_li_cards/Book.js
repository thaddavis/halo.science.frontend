import get from "lodash.get";

export function BookCard(item, LLButtonAction, LRButtonAction) {
  return (
    <li
      key={item.id}
      className={`
        col-span-1
        divide-y
        divide-gray-200
        rounded-lg
        ${!get(item, "owned", false) ? "bg-white" : "bg-gray-500"}
        shadow-lg
      `}
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h2 className="truncate text-lg font-medium text-gray-900">
              {get(item, "wish_val.book.title", null)}
            </h2>
            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {get(item, "wish_type", null)}
            </span>
          </div>
          <p
            className={`
            mt-1
            truncate
            text-sm
            
            ${!get(item, "owned", false) ? "text-gray-500" : "text-white"}
          `}
          >
            by {get(item, "wish_val.author.first_name", null)}{" "}
            {get(item, "wish_val.author.last_name", null)}
          </p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              type="button"
              onClick={LLButtonAction}
              className={`
                relative
                -mr-px
                inline-flex
                w-0
                flex-1
                items-center
                justify-center
                rounded-bl-lg
                border
                border-transparent
                py-4
                text-sm
                font-medium
                ${!get(item, "owned", false) ? "text-gray-700" : "text-red-200"}
                hover:text-gray-500
              `}
            >
              {!get(item, "owned", false) ? "I Own This" : "Not Anymore!"}
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              onClick={LRButtonAction}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-red-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
