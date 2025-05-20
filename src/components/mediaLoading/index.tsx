import Spinner from "../spinner";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POST_MEDIA_BY_POSTID } from "../../redux/features/queries";
import CustomModal from "../customModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MediaLoadingProps {
  postId: string;
}

const MediaLoading: React.FC<MediaLoadingProps> = ({ postId }) => {
  const [showMediaDetailsModal, setShowMediaDetailsModal] = useState(false);
  const [selectedMediaIdx, setSelectedMediaIdx] = useState(0);

  const {
    data: postMediaData,
    loading: postMediaLoading,
    error: postMediaError,
  } = useQuery(GET_POST_MEDIA_BY_POSTID, {
    variables: { postId },
  });

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

  const mediaList = postMediaData?.getPostMediaByPostId || [];

  // Always show grid, even for one item, but clicking opens modal
  return (
    <>
      <div
        className={`grid ${
          mediaList.length > 1 ? "grid-cols-2 md:grid-cols-3 gap-2 p-2" : ""
        }`}
      >
        {mediaList.map((item: any, idx: number) => {
          if (item?.mime_type === "video/mp4") {
            return (
              <video
                key={idx}
                src={item?.url}
                className={`object-cover w-full cursor-pointer ${
                  mediaList.length > 1 ? "1h-[40px]" : "!h-[300px]"
                }`}
                onClick={() => {
                  setSelectedMediaIdx(idx);
                  setShowMediaDetailsModal(true);
                }}
                controls
              />
            );
          } else if (
            item?.mime_type === "image/jpeg" ||
            item?.mime_type === "image/png"
          ) {
            return (
              <img
                key={idx}
                src={item?.url}
                className={`object-cover w-full cursor-pointer ${
                  mediaList.length > 1 ? "1h-[40px]" : "!h-[300px]"
                }`}
                alt="media"
                onClick={() => {
                  setSelectedMediaIdx(idx);
                  setShowMediaDetailsModal(true);
                }}
              />
            );
          } else {
            return (
              <div
                key={idx}
                className="flex items-center justify-center w-full bg-gray-100 rounded text-theme-secondary text-xs font-semibold cursor-pointer"
                onClick={() => {
                  setSelectedMediaIdx(idx);
                  setShowMediaDetailsModal(true);
                }}
              >
                Different type media
              </div>
            );
          }
        })}
      </div>
      <CustomModal
        heading={""}
        isOpen={showMediaDetailsModal}
        modelSize={"w-[90%] md:w-[60%]"}
        toggle={() => setShowMediaDetailsModal(false)}
        description={
          <div className="relative flex flex-col items-center justify-center bg-theme-secondaryBg">
            <div className="flex items-center justify-center w-full rounded min-h-[200px] md:min-h-[350px]">
              {/* Left arrow, only if more than 1 */}
              {mediaList.length > 1 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-theme-primaryBg"
                  onClick={() =>
                    setSelectedMediaIdx((prev) =>
                      prev === 0 ? mediaList.length - 1 : prev - 1
                    )
                  }
                >
                  <FaChevronLeft size={24} />
                </button>
              )}
              {/* Media */}
              {(() => {
                const item = mediaList[selectedMediaIdx];
                if (item?.mime_type === "video/mp4") {
                  return (
                    <video
                      src={item?.url}
                      className="object-contain w-full h-[65vh] rounded"
                      controls
                      autoPlay
                    />
                  );
                } else if (
                  item?.mime_type === "image/jpeg" ||
                  item?.mime_type === "image/png"
                ) {
                  return (
                    <img
                      src={item?.url}
                      className="object-contain w-full h-[65vh] rounded"
                      alt="media"
                    />
                  );
                } else {
                  return (
                    <div className="flex items-center justify-center w-full h-[65vh] bg-theme-primaryBg rounded text-theme-secondary text-xs font-semibold">
                      Different type media
                    </div>
                  );
                }
              })()}
              {/* Right arrow, only if more than 1 */}
              {mediaList.length > 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-theme-primaryBg rounded-full p-2"
                  onClick={() =>
                    setSelectedMediaIdx((prev) =>
                      prev === mediaList.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <FaChevronRight size={24} />
                </button>
              )}
            </div>
            <div className="mt-2 text-center text-theme-secondary text-xs">
              {selectedMediaIdx + 1} / {mediaList.length}
            </div>
          </div>
        }
      />
    </>
  );
};

export default MediaLoading;
