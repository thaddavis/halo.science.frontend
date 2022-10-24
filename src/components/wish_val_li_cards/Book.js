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
        border
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
                ${
                  !get(item, "owned", false)
                    ? "text-gray-500"
                    : "text-orange-300"
                }

                ${
                  !get(item, "owned", false)
                    ? "hover:text-gray-700"
                    : "hover:text-orange-400"
                }
              `}
            >
              {!get(item, "owned", false) ? "I Own This" : "Not Anymore!"}
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              onClick={LRButtonAction}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-red-300 hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
