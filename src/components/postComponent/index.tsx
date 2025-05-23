import { useState } from "react";
import ActionMenu from "../actionMenu";
import { GoHeart } from "react-icons/go";
import CustomModal from "../customModal";
import MediaLoading from "../mediaLoading";
import { useNavigate } from "react-router";
import { VscComment } from "react-icons/vsc";
import { IoMdShareAlt } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import CommentsComponent from "../commentsComponent";
import moment from "moment";

interface PostComponentProps {
  data: any;
  refetch: any;
  textSize?: string;
  iconsSize?: number;
  showIconNames?: boolean;
}

const PostComponent: React.FC<PostComponentProps> = (props) => {
  const navigate = useNavigate();
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const toggleCommentsModal = () => setShowCommentsModal(!showCommentsModal);
  const {
    data,
    refetch,
    iconsSize = 22,
    textSize = "sm",
    showIconNames = true,
  } = props;

  const ActionOnPosts = [
    {
      name: "Like",
      icon: <GoHeart size={iconsSize} className="text-theme-secondary" />,
      cout: data?.like_Count,
      border: true,
      action: () => {
        console.log("Like action");
      },
    },
    {
      name: "Comment",
      icon: <VscComment size={iconsSize} className="text-theme-secondary" />,
      cout: data?.comment_count,
      border: true,
      action: () => {
        toggleCommentsModal();
        console.log("Comment action");
      },
    },
    {
      name: "Share",
      icon: <IoMdShareAlt size={iconsSize} className="text-theme-primary" />,
      cout: data?.share_Count,
      border: false,
      action: () => {
        console.log("Share action");
      },
    },
  ];

  return (
    <div className="border border-theme-primaryBorder rounded-xl mb-4 bg-theme-primaryBg flex flex-col h-max ">
      <div>
        <div className="flex justify-between items-center m-4">
          <span
            className="flex gap-2 cursor-pointer"
            onClick={() =>
              navigate(`/userProfile/${data?.userInfo?.userid}`, {
                state: {
                  profileData: {
                    // email: data?.user?.email,
                    userId: data?.userInfo?.userid,
                  },
                },
              })
            }
          >
            {data?.userInfo?.photo_profile && (
              <img
                src={data?.userInfo?.photo_profile}
                alt={data?.userInfo?.photo_profile}
                className="rounded-full !w-14 !h-14 object-cover border border-theme-primaryBorder"
              />
            )}
            <span>
              <h1 className="text-md text-theme-primary font-semibold">
                {data?.userInfo?.first_name + " " + data?.userInfo?.last_name}
              </h1>
              <p className="text-theme-secondary text-sm">
                {moment(parseInt(data?.created)).fromNow()}
              </p>
            </span>
          </span>

          <div className="relative">
            <HiDotsVertical
              size={34}
              onClick={() => setShowActionMenu(!showActionMenu)}
              className="text-theme-primary hover:bg-theme-secondaryBg p-1 cursor-pointer rounded-lg"
            />
            {showActionMenu && (
              <ActionMenu
                postData={data}
                refetch={refetch}
                onClose={() => setShowActionMenu(false)}
              />
            )}
          </div>
        </div>

        <p className="text-md text-theme-primary font-semibold px-4 mb-2">
          {data?.description}
        </p>
      </div>
      {data?.has_media && (
        <div>
          <MediaLoading postId={data?.postid} />
        </div>
      )}
      <div className="mt-auto">
        <section className="grid grid-cols-3 border-t border-theme-primaryBorder ">
          {ActionOnPosts.map((item, index) => (
            <div
              key={index + 2}
              className={`flex items-center justify-center cursor-pointer py-2 gap-2 ${
                item.border ? "border-r border-theme-primaryBorder" : ""
              }`}
              onClick={item.action}
            >
              <span className="flex justify-center items-center">
                {item.icon}
                <p className="text-sm text-theme-secondary">
                  ({item?.cout || 0})
                </p>
              </span>
              {showIconNames && (
                <p className={`text-${textSize} text-theme-secondary`}>
                  {item.name}
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
      <CustomModal
        rounded="rounded-xl"
        heading={"All comments"}
        isOpen={showCommentsModal}
        toggle={toggleCommentsModal}
        description={<CommentsComponent postData={data} />}
        modelSize="w-[80%] md:w-[60%] lg:w-[40%]"
      />
    </div>
  );
};

export default PostComponent;
