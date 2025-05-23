import {
  DELETE_USER,
  GET_USER_PROFILE,
  GET_USER_FRIEND_LIST,
  GET_ALL_POST_OF_SINGLE_USER,
} from "../../redux/features/queries";
import toast from "react-hot-toast";
import { TbEdit } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import CustomBtn from "../../components/customBtn";
import CustomModal from "../../components/customModal";
import { useMutation, useQuery } from "@apollo/client";
import PostComponent from "../../components/postComponent";
import { useLocation, useNavigate, useParams } from "react-router";
import { MdExpandMore, MdOutlineDeleteForever } from "react-icons/md";
import UpdateUserProfileForm from "../../components/forms/updateUserProfileForm";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [postPage, setPostPage] = useState(1);
  const ProfileData = location?.state?.profileData;
  const [allPostData, setAllPostsData] = useState<any[]>([]);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  useEffect(() => {
    !userId && navigate("/users");
  }, []);

  // user profile detials api call
  const {
    data: userProfileDetails,
    loading: profileDetailsLoading,
    error: profileDetailsError,
    refetch: RefetchUserProfileDetails,
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

  // user post get api call
  const {
    data: userPostData,
    loading: userPostLoading,
    error: userPostError,
    refetch: loadMorePosts,
  } = useQuery(GET_ALL_POST_OF_SINGLE_USER, {
    variables: {
      userId: userProfileDetails?.getUser[0]?.userid,
      page: 1,
    },
  });

  const handleLoadMorePosts = (postPage: number) => {
    if (postPage === 1) {
      setAllPostsData(userPostData?.getPostsByUserId?.values);
    } else {
      loadMorePosts({ page: postPage });
      setAllPostsData((prev) => {
        const newPosts = userPostData?.getPostsByUserId?.values || [];
        const filteredPosts = newPosts.filter(
          (newPost: any) =>
            !prev.some(
              (existingPost: any) => existingPost.postid === newPost.postid
            )
        );
        return [...prev, ...filteredPosts];
      });
      setPostPage(postPage);
    }
  };

  useEffect(() => {
    handleLoadMorePosts(postPage);
  }, [userPostData]);

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

  const DeletePostFromLocalState = (postid: string) => {
    setAllPostsData((prev) => prev.filter((post) => post.postid !== postid));
  };

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
                onClick={() => setShowUpdateProfileModal(true)}
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
            />
            <img
              src={userProfileDetails?.getUser[0]?.photo_profile}
              className="rounded-full h-36 w-36 mx-auto -mt-16 border border-theme-primaryBorder"
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
                {userFriendLoading && (
                  <div className="flex w-full justify-center items-center">
                    <Spinner />
                  </div>
                )}

                {userFriendError && (
                  <div className="flex justify-center items-center py-6">
                    <p className="text-red-600 text-lg">Failed to load posts</p>
                  </div>
                )}

                {userFriendData?.getUserFriendList.values?.map(
                  (item: any, index: number) => (
                    <span
                      key={index}
                      className="text-center cursor-pointer"
                      onClick={() => {
                        setAllPostsData([]);
                        navigate(`/userProfile/${item?.userInfo?.userid}`, {
                          state: {
                            profileData: {
                              userId: item?.userInfo?.userid,
                            },
                          },
                        });
                      }}
                    >
                      <img
                        src={item?.userInfo?.photo_profile}
                        className="w-24 h-24 object-cover rounded-full border border-theme-primaryBorder"
                      />
                      <p className="text-sm break-words font-semibold text-theme-primary">
                        {item?.userInfo?.first_name +
                          " " +
                          item?.userInfo?.last_name}
                      </p>
                    </span>
                  )
                )}
              </div>
            </section>

            <section className="text-start mt-4">
              <p className="text-theme-primary text-lg font-semibold mb-4">
                Posts
              </p>
              {userPostLoading && (
                <div className="flex w-full justify-center items-center">
                  <Spinner />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                {allPostData?.map((item: any, index: number) => (
                  <PostComponent
                    data={item}
                    iconsSize={18}
                    textSize={"sm"}
                    showIconNames={false}
                    key={item?.caption + index + 1}
                    refetch={DeletePostFromLocalState}
                  />
                ))}
              </div>

              {userPostError && (
                <div className="flex justify-center items-center py-6">
                  <p className="text-red-600 text-lg">Failed to load posts</p>
                </div>
              )}

              {!userPostError &&
              userPostData?.getPostsByUserId?.values.length === 10 ? (
                <div className="flex justify-center">
                  <CustomBtn
                    type="button"
                    text="Load more"
                    isLoading={userPostLoading}
                    icon={<MdExpandMore size={24} />}
                    className="text-sm !rounded-3xl m-6"
                    handleOnClick={() => {
                      handleLoadMorePosts(postPage + 1);
                    }}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center py-8">
                  <p className="text-theme-secondary">
                    No more posts by this user
                  </p>
                </div>
              )}
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

            <CustomModal
              isOpen={showUpdateProfileModal}
              modelSize="w-full md:w-[60%]"
              heading={"Update User Profile"}
              icon={
                <GrUpdate
                  size={60}
                  className="bg-theme-btnBg rounded-full text-theme-btnColor p-2"
                />
              }
              toggle={() => setShowUpdateProfileModal(!showUpdateProfileModal)}
              description={
                <UpdateUserProfileForm
                  userProfileDetails={userProfileDetails}
                  setShowUpdateProfileModal={setShowUpdateProfileModal}
                  RefetchUserProfileDetails={RefetchUserProfileDetails}
                />
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
