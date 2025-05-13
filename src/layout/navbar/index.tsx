import React from "react";
// import Cookies from "js-cookie";
// import { motion } from "framer-motion";
// import useStore from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
// import ThemesData from "../data/themeColorsData.json";
// import UserImage from "../assests/navbar/user-img.png";
// import { jwtDecode } from "jwt-decode";

//  importing icons
// import { FiSun } from "react-icons/fi";
// import { FaRegMoon } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { useSelector } from "react-redux";

interface NavbarProps {
  userDetailsModel: boolean;
  setUserDetailsModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { userDetailsModel, setUserDetailsModel } = props;
  const isSidebarOpen = useSelector((state: any) => state.user.isSidebarOpen);
  // const setAppMode = useStore((state) => state.setAppMode);
  // const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  // const appThemeColor = useStore((state) => state.appThemeColor);
  // const setAppThemeColor = useStore((state) => state.setAppThemeColor);

  const Navigate = useNavigate();

  // const UserData = jwtDecode(Cookies.get("token")).email;
  // console.log(JSON.parse(Cookies.get("token")).email);
  const UserData = "mudassarmuhammad776@gmail.com";

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
      <div className="flex justify-between">
        <input
          className="border border-theme-primaryBorder rounded-md p-2 bg-theme-secondaryBg text-theme-primary"
          type="search"
          placeholder="Search"
        />

        <div
          className="flex cursor-pointer"
          onClick={() => setUserDetailsModel((toggle) => !toggle)}
        >
          <p className="text-center mx-2 my-auto text-theme-primary hidden sm:block">
            Welcome <b>{UserData}!</b>
          </p>
          {/* <img
            src={UserImage}
            alt="user-profile"
            className="rounded-full w-10 h-10 z-30"
          /> */}
        </div>

        {/* Modal  */}

        {userDetailsModel && (
          <div className="absolute right-6 md:right-14 top-16 px-4 py-4 bg-theme-primaryBg rounded-xl w-64 shadow-lg z-50">
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
                className="flex text-theme-secondary my-3 mx-2 rounded-md py-2 px-3 hover:bg-theme-secondaryBg hover:text-theme-primary hover:cursor-pointer "
              >
                {item.icon}
                <p className="px-3 font-semibold text-sm"> {item.name}</p>
              </div>
            ))}
            {/* Links ended */}

            <div className="border border-dashed border-theme-primaryBorder mt-4"></div>

            <p className="text-theme-primary font-bold text-sm my-2">Color</p>

            {/* Theme different colors button */}
            {/* <div className="grid justify-stretch gap-2 grid-cols-2">
              {ThemesData.themeColors.map((items : any) => (
                <button
                  key={items.name}
                  disabled={appThemeColor === items.colorValue}
                  onClick={() => {
                    if (appThemeColor !== "") {
                      document.documentElement.classList.remove(
                        "redish",
                        "bluish",
                        "yellowish",
                        "orangish",
                        "greenish",
                        "violetish"
                      );
                    }
                    setAppThemeColor(items.colorValue);
                  }}
                  className="px-3 py-1 rounded-md flex text-sm text-theme-tertiary font-semibold border border-gray-200 hover:bg-theme-secondaryBg "
                >
                  <div
                    className={`rounded-full mr-1 w-5 h-5 ${
                      items.color === "bg-red-600"
                        ? "bg-red-600"
                        : items.color === "bg-blue-600"
                        ? "bg-blue-600"
                        : items.color === "bg-yellow-500"
                        ? "bg-yellow-500"
                        : items.color === "bg-orange-600"
                        ? "bg-orange-600"
                        : items.color === "bg-green-600"
                        ? "bg-green-600"
                        : items.color === "bg-violet-600"
                        ? "bg-violet-600"
                        : ""
                    } `}
                  ></div>
                  <p>{items.name}</p>
                </button>
              ))}
            </div> */}
            {/* Theme different colors button ended */}

            <div className="border border-dashed border-theme-primaryBorder mt-4"></div>

            <p className="text-theme-primary font-bold text-sm mt-2">Mode</p>

            {/* Dark and light mode button */}
            {/* <div className="grid justify-stretch grid-cols-2 gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  document.documentElement.classList.add("dark");
                  setAppMode("dark");
                }}
                className="px-3 py-1 rounded-md flex text-sm text-gray-200 font-semibold border border-gray-200 bg-black hover:bg-stone-900 mt-2  justify-center"
              >
                <FaRegMoon className="text-md text-gray-200  my-auto mr-2" />
                <p>Dark</p>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                  setAppMode("light");
                }}
                className="px-3 py-1 rounded-md flex text-sm text-stone-700 font-semibold border border-gray-200 bg-white hover:bg-stone-100 mt-2 justify-center"
              >
                <FiSun className="text-md text-stone-700 my-auto mr-2" />
                <p>Light</p>
              </motion.button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
