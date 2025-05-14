import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { useState, type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const isSidebarOpen = useSelector((state: any) => state.user.isSidebarOpen);
  const [userDetailsModel, setUserDetailsModel] = useState(false);

  return (
    <div className="bg-theme-secondaryBg">
      <Navbar
        userDetailsModel={userDetailsModel}
        setUserDetailsModel={setUserDetailsModel}
      />
      <Sidebar />
      <div
        // onClick={() => setUserDetailsModel(false)}
        className={`mt-[66px] ml-14 p-6 ${
          isSidebarOpen ? "md:ml-[258px]" : "ml-14"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
