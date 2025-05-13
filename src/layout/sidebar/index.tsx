import {
  MdOutlineDashboardCustomize,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useEffect } from "react";
import { LuStore } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { IoGiftOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state: any) => state.user.isSidebarOpen);
  const setIsSidebarOpen = useSelector((state: any) => state.setIsSidebarOpen);

  console.log(isSidebarOpen, "isSidebarOpen");

  useEffect(() => {
    CloseSidebarOnSmallDevices();
  });

  const CloseSidebarOnSmallDevices = () => {
    if (window.innerWidth < 620) {
      dispatch(setIsSidebarOpen(false));
    }
  };

  //  Links on sidebar
  const RoutesData = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <MdOutlineDashboardCustomize className="text-2xl text-center my-auto" />
      ),
    },
    {
      name: "Posts",
      path: "/posts",
      icon: <LuStore className="text-2xl text-center my-auto" />,
    },
    {
      name: "Comments",
      path: "/comments",
      icon: <IoGiftOutline className="text-2xl text-center my-auto" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <LuUser className="text-2xl text-center my-auto" />,
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-14"
      } h-full bg-theme-primaryBg absolute sm:fixed top-0 transition-all duration-300 ease-out z-50 shadow-lg`}
    >
      {/* First line of sidebar including toggle button*/}
      <div className="py-2 my-2 flex justify-around items-center">
        {isSidebarOpen && (
          <>
            <LuStore className="bg-theme-btnBg text-4xl my-auto text-white p-2 rounded" />

            <h1 className="text-theme-primary font-bold text-2xl">
              One's Store
            </h1>
          </>
        )}

        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="my-auto cursor-pointer rounded-md hover:bg-theme-secondaryBg mt-2"
        >
          {isSidebarOpen ? (
            <MdKeyboardDoubleArrowLeft
              size={30}
              className="text-4xl my-auto text-theme-tertiary"
            />
          ) : (
            <MdKeyboardDoubleArrowRight
              size={30}
              className="text-4xl my-auto text-theme-tertiary"
            />
          )}
        </div>
      </div>

      {/* Divider */}

      <div className="border border-dashed border-theme-primaryBorder mx-2"></div>

      {RoutesData.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex my-3  rounded-md p-2 hover:cursor-pointer text-theme-secondary ${
            isSidebarOpen ? "mx-4" : "mx-2"
          }  ${
            location.pathname === item.path
              ? "bg-theme-secondaryBg !text-theme-btnBgText shadow-md"
              : ""
          } hover:bg-theme-secondaryBg hover:text-theme-primary`}
        >
          {item.icon}
          {isSidebarOpen && <p className="px-3 font-semibold"> {item.name}</p>}
        </Link>
      ))}

      {isSidebarOpen && (
        <div className="absolute bottom-3 left-1">
          <span className="text-xs text-theme-secondary font-semibold mx-2">
            Developed by
          </span>
          <div>
            <Link
              to={"https://dev-mudassar-portfolio.pantheonsite.io/"}
              className="text-md font-semibold mx-2 text-theme-btnBgText"
            >
              Muhammad Mudassar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
