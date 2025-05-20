import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import DataTable from "../../components/dataTable";
import { GET_ALL_USER } from "../../redux/features/queries";

const Users = () => {
  const pageSize = 10;
  const navigate = useNavigate();

  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersErrors,
    refetch: refetchUsersData,
  } = useQuery(GET_ALL_USER, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handlePageChange = (page: number) => {
    refetchUsersData({ page: page });
  };

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
            alt="Profile"
          />
        ),
    },
    {
      name: "Full Name",
      sortable: true,
      selector: (row: any) => `${row?.first_name} ${row?.last_name}`,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row: any) => row.email || "N/A",
    },
    {
      name: "Country",
      sortable: true,
      selector: (row: any) => row?.country || "N/A",
    },
    {
      name: "State",
      sortable: true,
      selector: (row: any) => row?.state || "N/A",
    },
    {
      name: "City",
      sortable: true,
      selector: (row: any) => row?.city || "N/A",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Users
      </h1>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <DataTable
            totalRows={100}
            pagination={true}
            selectableRows={true}
            userCursorPointer={true}
            loading={allUsersLoading}
            tableHeadings={UsersTableHeadings}
            allData={allUsersData?.getAllUsers}
            onRowClicked={(rowData: any) =>
              navigate(`/userProfile/${rowData.userid}`, {
                state: {
                  profileData: {
                    email: rowData.email,
                    userId: rowData.userid,
                  },
                },
              })
            }
            onChangePage={(e) => handlePageChange(e)}
            paginationPerPage={pageSize}
            // handlePreviousPageClick={() => {
            //   dispatch(setAllUserPage(allUserPage - 1));
            //   refetchUsersData({ page: allUserPage - 1 });
            // }}
          />

          {allUsersErrors && (
            <div className="text-center py-4 text-red-500">
              Error loading users: {allUsersErrors.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
