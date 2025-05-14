import React from "react";
import CommentsComponent from "../../components/commentsComponent";

const Comments = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Comments
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="border border-theme-primaryBorder rounded-xl mb-4 p-4 bg-theme-primaryBg max-w-3xl w-full">
          <CommentsComponent />
        </div>
      </div>
    </>
  );
};

export default Comments;
