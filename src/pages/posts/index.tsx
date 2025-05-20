import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import LoadingScreen from "../../components/loadingScreen";
import PostComponent from "../../components/postComponent";
import { GET_ALL_USER_POST } from "../../redux/features/queries";
import CustomBtn from "../../components/customBtn";
import { MdExpandMore } from "react-icons/md";

const Posts = () => {
  const [page, setPage] = useState(1);
  const [allPostsDataArr, setAllPostsDataArr] = useState<any[]>([]);

  const {
    data: allPostData,
    error: allPostError,
    loading: allPostLoading,
    refetch: refetchAllPosts,
  } = useQuery(GET_ALL_USER_POST, {
    variables: { page: page },
    fetchPolicy: "network-only", 
  });

  const handleLoadMorePosts = async (postPage: number) => {
    try {
      const { data } = await refetchAllPosts({ page: postPage });
      const newPosts = data?.getAllUserPost || [];
      setAllPostsDataArr((prev) => {
        const filteredPosts = newPosts.filter(
          (newPost: any) =>
            !prev.some(
              (existingPost: any) => existingPost.postid === newPost.postid
            )
        );
        return [...prev, ...filteredPosts];
      });
      setPage(postPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  useEffect(() => {
    if (page === 1 && allPostData?.getAllUserPost) {
      setAllPostsDataArr((prev) => {
        const filteredPosts = allPostData.getAllUserPost.filter(
          (newPost: any) =>
            !prev.some(
              (existingPost: any) => existingPost.postid === newPost.postid
            )
        );
        return [...prev, ...filteredPosts];
      });
    }
  }, [allPostData]);

  const DeletePostFromLocalState = (postid: string) => {
    setAllPostsDataArr((prev) => prev.filter((post) => post.postid !== postid));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Post Moderation
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 w-full">
          {allPostsDataArr?.map((item: any, index: number) => (
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
        {allPostLoading && <LoadingScreen />}
        {!allPostError && allPostData?.getAllUserPost.length >= 10 ? (
          <div className="flex justify-center">
            <CustomBtn
              type="button"
              text="Load more"
              isLoading={allPostLoading}
              icon={<MdExpandMore size={24} />}
              className="text-sm !rounded-3xl m-6"
              handleOnClick={() => {
                handleLoadMorePosts(page + 1);
              }}
            />
          </div>
        ) : (
          !allPostLoading && (
            <div className="flex justify-center items-center py-8">
              <p className="text-theme-secondary">No more posts to show</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Posts;
