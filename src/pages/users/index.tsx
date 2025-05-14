import { useState } from "react";
import { useNavigate } from "react-router";
import { HiDotsVertical } from "react-icons/hi";
import { UsersData } from "../../data/usersData";
import DataTable from "../../components/dataTable";
import ActionMenu from "../../components/actionMenu";

const Users = () => {
  const navigate = useNavigate();
  const [showActionMenu, setShowActionMenu] = useState(false);

  const UsersTableHeadings = [
    {
      name: "Profile Pic",
      sortable: true,
      selector: (row: any) => (
        <img src={row.profilePicture} className="rounded-full" />
      ),
    },
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row?.name,
    },
    {
      name: "Biography",
      sortable: true,
      selector: (row: any) => row.bio,
    },
    {
      name: "Followers",
      sortable: true,
      selector: (row: any) => row.followers,
    },
    {
      name: "Following",
      sortable: true,
      selector: (row: any) => row.following,
    },
    {
      name: "Joining Date",
      sortable: true,
      selector: (row: any) => row.joinDate,
    },
    {
      name: "Actions",
      sortable: true,
      selector: () => (
        <span className="relative">
          <HiDotsVertical
            size={34}
            onClick={() => setShowActionMenu(!showActionMenu)}
            className="text-theme-primary hover:bg-theme-secondaryBg p-1 cursor-pointer rounded-lg"
          />
          <div>{showActionMenu && <ActionMenu />}</div>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Users
      </h1>

      <div className="flex flex-col items-center justify-center">
        <div className=" w-full">
          <DataTable
            pagination={true}
            allData={UsersData}
            selectableRows={true}
            totalRows={UsersData.length}
            tableHeadings={UsersTableHeadings}
            onRowClicked={(rowData: any) =>
              navigate("/userProfile/" + rowData.id, {state : {profileData : rowData}} )
            }
            //   onChangePage,
            //   expandableRows,
            //   isOverflowVisible,
            //   ExpandedComponent,
            //   onChangeRowsPerPage,
            //   selectableRowDisabled,
            //   userCursorPointer = false,
            //   handleSelectedRowsChange,
          />
        </div>
      </div>
    </>
  );
};

export default Users;
