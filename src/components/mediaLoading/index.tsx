import { useQuery } from "@apollo/client";
import React from "react";
import { GET_POST_MEDIA_BY_POSTID } from "../../redux/features/queries";
import Spinner from "../spinner";

interface MediaLoadingProps {
  postId: string;
}

const MediaLoading: React.FC<MediaLoadingProps> = (props) => {
  const { postId } = props;
  postId;
  const {
    data: postMediaData,
    loading: postMediaLoading,
    error: postMediaError,
  } = useQuery(GET_POST_MEDIA_BY_POSTID, {
    variables: { postId: postId },
  });

  //   console.log("post media dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", postMediaData);

  const MediaFunc = () => {
    if (postMediaLoading)
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner size="w-10 h-10" />
        </div>
      );
    if (postMediaError)
      return (
        <div className="text-center text-theme-secondary text-sm font-semibold p-4">
          An error occurred
        </div>
      );
    if (postMediaData)
      if (postMediaData.getPostMediaByPostId[0]?.mime_type === "video/mp4") {
        return (
          <video
            src={postMediaData.getPostMediaByPostId[0]?.url}
            className="object-cover"
          />
        );
      } else if (
        postMediaData.getPostMediaByPostId[0]?.mime_type === "image/jpeg"
      ) {
        return (
          <img
            src={postMediaData.getPostMediaByPostId[0]?.url}
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://www.fg-a.com/backgrounds/black-planet-surface-1920.jpg";
            }}
          />
        );
      }
  };

  return MediaFunc();
};

export default MediaLoading;
