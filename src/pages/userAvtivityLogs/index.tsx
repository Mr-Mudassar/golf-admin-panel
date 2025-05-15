import React from "react";
import CustomDropdown from "../../components/customDropdown";
import { UserNames } from "../../data/userNamesForActivityLogs";
import { ActivityLogsData } from "../../data/activityLogsData";

const UserActivityLogs = () => {
  const [selectedUser, setSelectedUser] = React.useState<string | number>("");

  return (
    <div>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl font-semibold text-theme-btnBgText text-left">
          User Activities
        </h1>

        <CustomDropdown
          name="user"
          Options={[{ label: "All Users", value: "" }, ...UserNames]}
          value={selectedUser}
          placeholder="Filter by User"
          onChangeHandle={(e) => setSelectedUser(e.target.value)}
        />
      </div>

      <div className=" bg-theme-primaryBg border border-theme-primaryBorder rounded-xl mb-4 p-4 w-full">
        {ActivityLogsData.map((item, index) => (
          <div
            key={index + item.profilePicture}
            className="flex flex-col sm:flex-row gap-2 mb-4"
          >
            <img
              src={item?.profilePicture}
              alt={item?.profilePicture}
              className="rounded-full w-12 h-12"
            />
            <div>
              <div className="bg-theme-secondaryBg rounded-lg p-3 ml-4 ">
                <div className="flex items-center gap-4">
                  <p className="text-theme-primary text-lg font-semibold">
                    {item?.user}
                  </p>  
                  <p className="text-sm text-theme-secondary font-semibold">
                    at {item?.timestamp}
                  </p>
                </div>
                <p className="text-md text-theme-secondary font-semibold">{item?.activity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityLogs;
