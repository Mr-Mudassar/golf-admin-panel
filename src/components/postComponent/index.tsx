import { useState } from "react";
import ActionMenu from "../actionMenu";
import CustomModal from "../customModal";
import { useNavigate } from "react-router";
import { VscComment } from "react-icons/vsc";
import { IoMdShareAlt } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import CommentsComponent from "../commentsComponent";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface PostComponentProps {
  data: any;
  textSize?: string;
  showIconNames?: boolean;
  iconsSize?: number;
}

const PostComponent: React.FC<PostComponentProps> = (props) => {
  const navigate = useNavigate();
  const [likedPost, setLikedPost] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const toggleCommentsModal = () => setShowCommentsModal(!showCommentsModal);
  const { data, iconsSize = 22, textSize = "sm", showIconNames = true } = props;

  const ActionOnPosts = [
    {
      name: "Like",
      icon: likedPost ? (
        <GoHeartFill size={iconsSize} className="text-theme-primary" />
      ) : (
        <GoHeart size={iconsSize} className="text-theme-secondary" />
      ),
      cout: 2 + (likedPost ? 1 : 0),
      border: true,
      action: () => {
        setLikedPost(!likedPost);
        console.log("Like action");
      },
    },
    {
      name: "Comment",
      icon: <VscComment size={iconsSize} className="text-theme-secondary" />,
      cout: "2",
      border: true,
      action: () => {
        toggleCommentsModal();
        console.log("Comment action");
      },
    },
    {
      name: "Share",
      icon: <IoMdShareAlt size={iconsSize} className="text-theme-primary" />,
      cout: "2",
      border: false,
      action: () => {
        console.log("Share action");
      },
    },
  ];

  return (
    <div className="border border-theme-primaryBorder rounded-xl mb-4 bg-theme-primaryBg flex flex-col h-full">
      <div>
        <div className="flex justify-between items-center m-4">
          <span
            className="flex gap-2 cursor-pointer"
            onClick={() =>
              navigate(`/userProfile/${data?.user?.id}`, {
                state: { profileData: data?.user },
              })
            }
          >
            <img
              src={data?.user?.profilePicture}
              alt={data?.user?.profilePicture}
              className="rounded-full"
            />
            <span>
              <h1 className="text-md text-theme-primary font-semibold">
                {data?.user?.name}
              </h1>
              <p className="text-theme-secondary text-sm">1 day ago</p>
            </span>
          </span>

          <div className="relative">
            <HiDotsVertical
              size={34}
              onClick={() => setShowActionMenu(!showActionMenu)}
              className="text-theme-primary hover:bg-theme-secondaryBg p-1 cursor-pointer rounded-lg"
            />
            {showActionMenu && <ActionMenu />}
          </div>
        </div>

        <p className="text-md text-theme-primary font-semibold px-4 mb-2">
          {data.caption}
        </p>
      </div>
      <img src={data.image} alt={data.caption} className="mb-auto" />

      {/* Like, Comment, and Share buttons */}
      <div className="grid grid-cols-3 border-t border-theme-primaryBorder">
        {ActionOnPosts.map((item, index) => (
          <div
            key={index + 2}
            className={`flex items-center justify-center cursor-pointer py-4 gap-2 ${
              item.border ? "border-r border-theme-primaryBorder" : ""
            }`}
            onClick={item.action}
          >
            <span className="flex justify-center items-center">
              {item.icon}
              <p className="text-sm text-theme-secondary">({item.cout})</p>
            </span>
            {showIconNames && (
              <p className={`text-${textSize} text-theme-secondary`}>
                {item.name}
              </p>
            )}
          </div>
        ))}
      </div>

      <CustomModal
        rounded="rounded-xl"
        heading={"All comments"}
        isOpen={showCommentsModal}
        toggle={toggleCommentsModal}
        description={<CommentsComponent />}
        modelSize="w-[80%] md:w-[60%] lg:w-[40%]"
      />

     
    </div>
  );
};

export default PostComponent;
