import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export function StatsContainer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  const menu = [
    {
      title: "View 1st Owners",
      pathTest: (pathname) =>
        pathname === "/stats" || pathname === "/stats/first-owners",
      onClick: () => {
        console.log("___");
        navigate("/stats/first-owners");
      },
      shape: "l",
    },
    {
      title: "History",
      pathTest: () => pathname === "/stats/readings-history",
      onClick: () => {
        console.log("___");
        navigate("/stats/readings-history");
      },
      shape: "m",
    },
    {
      title: "Genre Stats",
      pathTest: () => pathname === "/stats/genre-stats",
      onClick: () => {
        console.log("___");
        navigate("/stats/genre-stats");
      },
      shape: "r",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center py-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {menu.map((option) => {
            return (
              <button
                key={option.title}
                type="button"
                className={`
                  py-2
                  px-4
                  text-sm
                  font-medium
                  text-gray-900
                  ${option.shape === "l" && "rounded-l-lg"}
                  ${option.shape === "r" && "rounded-r-lg"}
                  ${option.shape === "m" && ""}
                  border
                  border-gray-200
                  hover:bg-gray-100
                  hover:text-blue-700
                  focus:z-10
                  focus:ring-2
                  focus:ring-blue-700
                  focus:text-blue-700
                  ${
                    option.pathTest(pathname)
                      ? `
                      dark:text-white
                      dark:hover:text-white
                      dark:hover:bg-gray-600
                      dark:focus:ring-blue-500
                      dark:focus:text-white
                      dark:bg-gray-700
                      dark:border-gray-600`
                      : `
                      text-black
                      focus:ring-blue-500
                      focus:text-white
                      dark:bg-white-700
                      dark:border-gray-600`
                  }
                `}
                onClick={option.onClick}
              >
                {option.title}
              </button>
            );
          })}
        </div>
      </div>

      <Outlet />
    </>
  );
}
