import React from "react";
import { FiSun } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import GolfGuidersLogo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { FaRegMoon, FaRegUserCircle } from "react-icons/fa";
import { setAppMode } from "../../redux/features/userSlice";

interface NavbarProps {
  userDetailsModel: boolean;
  setUserDetailsModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetailsModel, setUserDetailsModel } = props;
  const isSidebarOpen = useSelector((state: any) => state.user.isSidebarOpen);

  // const UserData = jwtDecode(Cookies.get("token")).email;
  // console.log(JSON.parse(Cookies.get("token")).email);
  const UserData = "Mudassar";

  const Links = [
    {
      name: "Profile",
      path: "/",
      icon: <FaRegUserCircle className="text-xl text-center my-auto" />,
      funq: () => {
        setUserDetailsModel((toggle) => !toggle);
      },
    },
    {
      name: "Settings",
      path: "/",
      icon: <MdOutlineSettings className="text-xl text-center my-auto" />,
      func: () => {
        setUserDetailsModel((toggle) => !toggle);
      },
    },
    {
      name: "Log out",
      path: "/login",
      icon: <HiOutlineLogout className="text-xl text-center my-auto" />,
      func: () => {
        setUserDetailsModel((toggle) => !toggle);
        // Cookies.remove("token");
        Navigate("/auth/login");
      },
    },
  ];

  return (
    <div
      className={`shadow-md bg-theme-primaryBg !w-full py-3 px-2 sm:px-8 absolute sm:fixed top-0 transition-all duration-300 ease-in-out pl-16 z-50 ${
        isSidebarOpen ? "md:pl-72" : "sm:pl-24"
      }`}
    >
      <div className={`flex items-center ${!isSidebarOpen ? " justify-between " : " justify-end "}`}>
        {!isSidebarOpen && (
          <>
            <img
              src={GolfGuidersLogo}
              alt="golfguiders logo"
              className="w-10 h-10"
            />

            <h1 className="text-theme-primary font-bold text-xl">
              GolfGuiders
            </h1>
          </>
        )}

        <div
          className="cursor-pointer flex items-center"
          onClick={() => setUserDetailsModel((toggle) => !toggle)}
        >
          <p className="text-center mx-2 my-auto text-theme-primary hidden sm:block">
            Welcome <b>{UserData}!</b>
          </p>
          <FaUserCircle size={32} className="text-theme-btnBgText" />
          {/* <img
            src={UserImage}
            alt="user-profile"
            className="rounded-full w-10 h-10 z-30"
          /> */}
        </div>

        {/* Modal  */}

        {userDetailsModel && (
          <div className="absolute right-6 md:right-14 top-20 px-4 py-4 bg-theme-primaryBg rounded-xl w-64 border border-theme-primaryBorder shadow-lg z-50">
            {/* user name and image  */}
            <div className="flex gap-2">
              <span className="text-center my-auto">
                {/* <img
                  src={UserImage}
                  alt="user"
                  width={40}
                  className="rounded-full"
                /> */}
              </span>

              <span className="text-sm text-theme-secondary overflow-hidden">
                <b className="text-theme-btnBgText">{"Muhammad Mudassar"}</b>
                <p className="text-theme-tertiary ">{UserData}</p>
              </span>
            </div>

            <div className="border border-dashed border-theme-primaryBorder mt-4"></div>

            {/* Links  */}
            {Links.map((item) => (
              <div
                key={item.name}
                onClick={item.func}
                className="flex text-theme-secondary my-3 mx-2 rounded-md py-2 px-3 hover:bg-theme-secondaryBg hover:text-theme-primary hover:cursor-pointer hover:scale-105 animation ease-in-out duration-200"
              >
                {item.icon}
                <p className="px-3 font-semibold text-sm"> {item.name}</p>
              </div>
            ))}
            {/* Links ended */}

            <div className="border border-dashed border-theme-primaryBorder mt-4"></div>

            <p className="text-theme-primary font-bold text-sm mt-2">Mode</p>

            {/* Dark and light mode button */}
            <div className="grid justify-stretch grid-cols-2 gap-2">
              <button
                onClick={() => {
                  document.documentElement.classList.add("dark");
                  dispatch(setAppMode("dark"));
                }}
                className="px-3 py-1 rounded-md flex text-sm text-gray-200 font-semibold border border-gray-200 bg-black hover:bg-stone-900 mt-2  justify-center"
              >
                <FaRegMoon className="text-md text-gray-200  my-auto mr-2" />
                <p>Dark</p>
              </button>

              <button
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                  dispatch(setAppMode("light"));
                }}
                className="px-3 py-1 rounded-md flex text-sm text-stone-700 font-semibold border border-gray-200 bg-white hover:bg-stone-100 mt-2 justify-center"
              >
                <FiSun className="text-md text-stone-700 my-auto mr-2" />
                <p>Light</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
