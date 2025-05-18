import {
  DELETE_USER,
  GET_USER_PROFILE,
  GET_ALL_POST_OF_SINGLE_USER,
  GET_USER_FRIEND_LIST,
} from "../../redux/features/queries";
import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import { ALL_POSTS_DATA } from "../../data/posts";
import CustomModal from "../../components/customModal";
import { useMutation, useQuery } from "@apollo/client";
import { MdOutlineDeleteForever } from "react-icons/md";
import PostComponent from "../../components/postComponent";
import { useLocation, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useParams().userId;
  const ProfileData = location?.state?.profileData;
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  useEffect(() => {
    !userId && navigate("/users");
  }, []);

  // user profile detials api call
  const {
    data: userProfileDetails,
    loading: profileDetailsLoading,
    error: profileDetailsError,
  } = useQuery(GET_USER_PROFILE, {
    variables: {
      userId: ProfileData?.userId,
      email: ProfileData?.email,
    },
  });

  //user friend get api call
  const {
    data: userFriendData,
    loading: userFriendLoading,
    error: userFriendError,
  } = useQuery(GET_USER_FRIEND_LIST, {
    variables: {
      pageState: 1,
    },
  });

  // console.log(
  //   "Response from user friend apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
  //   userFriendData?.getUserFriendList.values,
  //   userFriendError,
  //   userFriendLoading
  // );

  // user post get api call
  const {
    data: userPostData,
    loading: userPostLoading,
    error: userPostError,
  } = useQuery(GET_ALL_POST_OF_SINGLE_USER, {
    variables: {
      userId: userProfileDetails?.getUser[0]?.userid,
      page: 1,
    },
  });

  // delete User api call
  const [deleteUser, { loading: DeleteLoading }] = useMutation(DELETE_USER, {
    variables: {
      type: userProfileDetails?.getUser[0]?.type,
    },
    onCompleted: (e) => {
      e.deleteUser
        ? (navigate("/users"), toast.success("User Deleted Successfully"))
        : toast.error("Error deleting user"),
        setShowDeleteProfileModal(false);
    },
    onError: () => {
      toast.error("Error Deleting User"), setShowDeleteProfileModal(false);
    },
  });

  return (
    <>
      {profileDetailsError && (
        <p className="p-12 text-red-600 bg-red-100 border-red-600 rounded-md font-semibold text-lg">
          Failed to get User Profile details
        </p>
      )}
      {profileDetailsLoading ? (
        <div className="flex w-full h-screen justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
              Profile
            </h1>

            <span className="flex gap-2">
              <TbEdit
                size={38}
                className="text-theme-btnColor bg-theme-btnBg hover:bg-theme-btnColorHover p-1 rounded-sm cursor-pointer"
              />
              <MdOutlineDeleteForever
                size={38}
                onClick={() => setShowDeleteProfileModal(true)}
                className="text-theme-btnColor bg-red-600 hover:bg-red-700 p-1 rounded-sm cursor-pointer"
              />
            </span>
          </div>
          <div className="max-w-7xl border border-theme-primaryBorder rounded-xl mb-4 p-4 bg-theme-primaryBg  text-center mx-auto">
            <img
              className="w-full max-h-72 object-cover rounded-xl shadow-md"
              src={userProfileDetails?.getUser[0]?.photo_cover}
              alt="Profile Picture"
              // src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
            <img
              src={userProfileDetails?.getUser[0]?.photo_profile}
              className="rounded-full h-36 w-36 mx-auto -mt-16"
            />

            <section className="space-y-2">
              <h3 className="text-theme-primary text-3xl font-bold mt-3">
                {userProfileDetails?.getUser[0]?.first_name +
                  " " +
                  userProfileDetails?.getUser[0]?.last_name}
              </h3>

              <p className="text-theme-secondary text-lg font-semibold">
                {userProfileDetails?.getUser[0]?.bio}
              </p>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-2">
                Status
              </p>

              <p className="rounded-full bg-theme-btnBg font-semibold text-md text-theme-btnColor p-2 px-4 flex items-center w-max">
                {userProfileDetails?.getUser[0]?.status}
              </p>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-2">
                Type
              </p>

              <p className="rounded-full bg-theme-btnBg font-semibold text-md text-theme-btnColor p-2 px-4 flex items-center w-max">
                {userProfileDetails?.getUser[0]?.type}
              </p>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-2">
                Details
              </p>

              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">Email : </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.email || "N/A"}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">
                  Phone Number :{" "}
                </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.phone || "N/A"}
                </p>
              </div>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-2">
                Address
              </p>
              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">Country : </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.country || "N/A"}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">State : </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.state || "N/A"}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">City : </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.city || "N/A"}
                </p>
              </div>

              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">Address : </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.address || "N/A"}
                </p>
              </div>

              <div className="flex flex-row items-center space-x-2 px-2">
                <p className="font-semibold text-theme-primary">
                  Postal Code :{" "}
                </p>
                <p className="text-theme-secondary font-semibold">
                  {userProfileDetails?.getUser[0]?.postalcode || "N/A"}
                </p>
              </div>
            </section>

            <section className="text-start mt-6">
              <p className="text-theme-primary text-lg font-semibold mb-4">
                Friends 
              </p>

              <div className="flex gap-6 px-4 mt-2 flex-wrap">
                {userFriendData?.getUserFriendList.values?.map(
                  (item: any, index: number) => (
                    <div key={index} className="rounded-full w-24 h-auto border-2 border-theme-primaryBorder p-4">
                      <p className="text-xs"> {JSON.stringify(item?.friend_user_id)}</p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-4">
                Posts
              </p>
              {userPostError && (
                <div className="flex w-full justify-center items-center">
                  <Spinner />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
                {userPostData?.getPostsByUserId?.values.map(
                  (item: any, index: number) => (
                    <PostComponent
                      data={item}
                      iconsSize={18}
                      textSize={"sm"}
                      showIconNames={false}
                      key={item?.caption + index + 1}
                    />
                  )
                )}
              </div>
            </section>

            <CustomModal
              modelSize="max-w-md"
              buttonText={"Delete"}
              heading={"Delete Profile ?"}
              buttonFunc={() => deleteUser()}
              buttonLoading={DeleteLoading}
              buttonStyles={"!bg-red-600 hover:bg-red-700 rounded-sm"}
              isOpen={showDeleteProfileModal}
              icon={
                <MdOutlineDeleteForever
                  size={60}
                  className="bg-red-600 rounded-full text-theme-btnColor p-2"
                />
              }
              toggle={() => setShowDeleteProfileModal(!showDeleteProfileModal)}
              description={
                <p className="text-theme-secondary text-md font-semibold">
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </p>
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
