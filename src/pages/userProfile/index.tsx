import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import { ALL_POSTS_DATA } from "../../data/posts";
import CustomModal from "../../components/customModal";
import { MdOutlineDeleteForever } from "react-icons/md";
import PostComponent from "../../components/postComponent";
import { useLocation, useNavigate, useParams } from "react-router";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useParams().userId;
  const ProfileData = location?.state?.profileData;
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  useEffect(() => {
    !userId && navigate("/users");
  }, []);

  return (
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
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        />
        <img
          src={ProfileData.profilePicture}
          className="rounded-full h-36 w-36 mx-auto -mt-16"
        />

        <section className="space-y-4">
          <h3 className="text-theme-primary text-3xl font-bold mt-3">
            {ProfileData.name}
          </h3>

          <div className=" flex gap-x-8 justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-theme-primary text-lg font-semibold">
                {ProfileData.followers}
              </p>
              <p className="text-theme-secondary">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-theme-primary text-lg font-semibold">
                {ProfileData.following}
              </p>
              <p className="text-theme-secondary">Following</p>
            </div>
          </div>

          <p className="text-theme-secondary text-lg font-semibold">
            {ProfileData.bio}
          </p>
        </section>

        <section className="text-start mt-4">
          <p className="text-theme-primary text-lg font-semibold mb-2">Role</p>

          <p className="rounded-full bg-theme-btnBg font-semibold text-lg text-theme-btnColor p-2 px-8 flex items-center w-max">
            Gold
          </p>
        </section>

        <section className="text-start mt-4">
          <p className="text-theme-primary text-lg font-semibold mb-2">
            Permissions
          </p>

          <p className="rounded-full bg-theme-btnBg font-semibold text-md text-theme-btnColor p-2 px-4 flex items-center w-max">
            Post, Comment, Like, Share, Follow, Unfollow, Edit Profile
          </p>
        </section>

        <section className="text-start mt-6">
          <p className="text-theme-primary text-lg font-semibold mb-4">
            Friends
          </p>

          <div className="flex gap-6 px-4 mt-2">
            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>
          </div>
        </section>

        <section className="text-start mt-4">
          <p className="text-theme-primary text-lg font-semibold mb-4">Posts</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
            {ALL_POSTS_DATA.map((item, index) => (
              <PostComponent
                key={item.caption + index}
                data={item}
                iconsSize={18}
                textSize={"sm"}
                showIconNames={false}
              />
            ))}
          </div>
        </section>

        <CustomModal
          modelSize="max-w-md"
          buttonText={"Delete"}
          heading={"Delete Profile ?"}
          buttonStyles={"bg-red-600 hover:bg-red-700 rounded-sm"}
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
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          }
        />
      </div>
    </>
  );
};

export default UserProfile;
