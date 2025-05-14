import {
  MdOutlineDashboardCustomize,
  MdKeyboardDoubleArrowRight,
  MdOutlineGolfCourse,
} from "react-icons/md";
import { useEffect } from "react";
import { LiaComments } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { AiOutlinePicture } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { setIsSidebarOpen } from "../../redux/features/userSlice";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: any) => state.user.isSidebarOpen);

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
        <MdOutlineDashboardCustomize
          size={24}
          className=" text-center my-auto"
        />
      ),
    },
    {
      name: "Posts",
      path: "/posts",
      icon: <AiOutlinePicture size={22} className=" text-center my-auto" />,
    },
    {
      name: "Comments",
      path: "/comments",
      icon: <LiaComments size={24} className=" text-center my-auto" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <PiUsersThree size={24} className=" text-center my-auto" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <CgProfile size={22} className=" text-center my-auto" />,
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
            <MdOutlineGolfCourse
              size={34}
              className="bg-theme-btnBg my-auto text-white p-1 rounded"
            />

            <h1 className="text-theme-primary font-bold text-xl">
              Golfguider
            </h1>
          </>
        )}

        <div
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
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
              ? "bg-theme-secondaryBg !text-theme-btnBgText shadow-md scale-105"
              : ""
          } hover:bg-theme-secondaryBg hover:text-theme-primary hover:scale-105 animation ease-in-out duration-200`}
        >
          {item.icon}
          {isSidebarOpen && <p className="px-3 font-semibold"> {item.name}</p>}
        </Link>
      ))}

      {isSidebarOpen && (
        <div className="absolute bottom-3 left-1">
          <span className="text-xs text-theme-secondary font-semibold mx-2">
            Visit our app
          </span>
          <div>
            <Link
              to={"https://google.com"}
              className="text-md font-semibold mx-2 text-theme-btnBgText"
            >
              Golfguider
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
