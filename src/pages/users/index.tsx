import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { UsersData } from "../../data/usersData";
import DataTable from "../../components/dataTable";
import { GET_ALL_USER } from "../../redux/features/queries";
import { FaUserCircle } from "react-icons/fa";
import LoadingScreen from "../../components/loadingScreen";

const Users = () => {
  const navigate = useNavigate();
  const [userPage, setUserPage] = useState(1);
  const [allUserDataArr, setAllUsersDataArr] = useState([]);
  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersErrors,
    refetch: nextUsersData,
  } = useQuery(GET_ALL_USER, {
    variables: {
      page: userPage,
    },
  });

  useEffect(() => {
    setAllUsersDataArr(allUsersData?.getAllUsers);
  }, [allUsersData]);
  console.log(
    "Respone from users apiiiiiiiiiiiiiiiiiiiiiiiiii",
    allUsersData,
    allUsersLoading,
    allUsersErrors
  );

  const UsersTableHeadings = [
    {
      name: "Profile Pic",
      sortable: true,
      selector: (row: any) =>
        !row.photo_profile ? (
          <FaUserCircle size={38} className="bg-theme-primaryBg" />
        ) : (
          <img
            src={row.photo_profile}
            className="rounded-full h-10 w-10 object-cover"
          />
        ),
    },
    {
      name: "Full Name",
      sortable: true,
      selector: (row: any) => row?.first_name + row?.last_name,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row: any) => row.email,
    },
    {
      name: "Country",
      sortable: true,
      selector: (row: any) => row?.country,
    },
    {
      name: "State",
      sortable: true,
      selector: (row: any) => row?.state,
    },
    {
      name: "City",
      sortable: true,
      selector: (row: any) => row?.city,
    },
    {
      name: "Joining Date",
      sortable: true,
      selector: (row: any) => row.joinDate,
    },

    // <p className="rounded-full bg-theme-btnBg font-semibold text-sm text-theme-btnColor p-2 px-4 flex w-max">
    //       Gold
    //     </p>
    // {
    //   name: "Actions",
    //   sortable: true,
    //   selector: () => (
    //     <span className="relative">
    //       <HiDotsVertical
    //         size={34}
    //         onClick={() => setShowActionMenu(!showActionMenu)}
    //         className="text-theme-primary hover:bg-theme-secondaryBg p-1 cursor-pointer rounded-lg"
    //       />
    //       <div>{showActionMenu && <ActionMenu />}</div>
    //     </span>
    //   ),
    // },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Users
      </h1>

      <div className="flex flex-col items-center justify-center">
        {allUsersLoading && <LoadingScreen />}
        <div className=" w-full">
          <DataTable
            pagination={true}
            selectableRows={true}
            allData={allUserDataArr}
            userCursorPointer={true}
            // totalRows={UsersData.length}
            tableHeadings={UsersTableHeadings}
            onRowClicked={(rowData: any) =>
              navigate("/userProfile/" + rowData.id, {
                state: {
                  profileData: {
                    email: rowData.email,
                    userId: rowData.userid,
                  },
                },
              })
            }
            onChangePage={() => nextUsersData({ page: userPage + 1 })}
            //   expandableRows,
            //   isOverflowVisible,
            //   ExpandedComponent,
            // onChangeRowsPerPage,
            //   selectableRowDisabled,
            //   handleSelectedRowsChange,
          />
        </div>
      </div>
    </>
  );
};

export default Users;
