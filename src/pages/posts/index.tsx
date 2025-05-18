import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setPosts } from "../../redux/features/userSlice";
import LoadingScreen from "../../components/loadingScreen";
import PostComponent from "../../components/postComponent";
import { GET_ALL_USER_POST } from "../../redux/features/queries";

const Posts = () => {
  const dispatch = useDispatch();
  const isFetching = useRef(false);
  // const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const page = useSelector((state: any) => state.user.page);
  const posts = useSelector((state: any) => state.user.posts);

  const { data: allPostData, loading: allPostLoading } = useQuery(
    GET_ALL_USER_POST,
    {
      variables: { page },
      fetchPolicy: "network-only",
    }
  );

  // Add new posts when data changes
  useEffect(() => {
    if (allPostData?.getAllUserPost?.values?.length > 0) {
      console.log(
        "length on each new fetchhhhhhhhhhhh",
        allPostData.getAllUserPost.values.length
      );

      const newPosts = allPostData.getAllUserPost.values.filter(
        (newPost: any) =>
          !posts.some(
            (existingPost: any) => existingPost.postid === newPost.postid
          )
      );
      dispatch(setPosts([...posts, ...newPosts]));
      if (allPostData.getAllUserPost.values.length < 10) setHasMore(false);
    }
    //  else if (page > 1) {
    //   setHasMore(false);
    // }
    isFetching.current = false;
  }, [allPostData, page]);

  console.log("Has moreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", hasMore, page, posts);

  // Simple scroll handler with flag
  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore &&
        !allPostLoading &&
        !isFetching.current &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100
      ) {
        isFetching.current = true;
        dispatch(setPage(page + 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, allPostLoading]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Posts
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
          {posts.map((item: any, index: number) => (
            <PostComponent
              key={index}
              data={item}
              iconsSize={18}
              textSize={"sm"}
              showIconNames={false}
            />
          ))}
        </div>
        {allPostLoading && <LoadingScreen />}
        {!hasMore && !allPostLoading && (
          <p className="text-theme-secondary m-24 font-semibold text-xl">
            No more posts to load.
          </p>
        )}
      </div>
    </>
  );
};

export default Posts;
