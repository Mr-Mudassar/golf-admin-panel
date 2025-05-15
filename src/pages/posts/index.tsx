import { useState, useEffect } from "react";
import { ALL_POSTS_DATA } from "../../data/posts";
import PostComponent from "../../components/postComponent";
import LoadingScreen from "../../components/loadingScreen"; // Import the LoadingScreen component

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]); // State to store loaded posts
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Whether more data is available
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const POSTS_PER_PAGE = 10; // Number of posts to load per page

  // Function to load posts
  const loadPosts = () => {
    setIsLoading(true); // Show loading screen
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    // Simulate fetching paginated data
    const newPosts = ALL_POSTS_DATA.slice(startIndex, endIndex);

    if (newPosts.length === 0) {
      setHasMore(false); // No more data to load
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }

    setIsLoading(false); // Hide loading screen
  };

  // Handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page when scrolled to bottom
    }
  };

  // Fetch posts when page changes
  useEffect(() => {
    if (hasMore) {
      loadPosts();
    }
  }, [page]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Posts
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
          {posts.map((item, index) => (
            <PostComponent
              key={index}
              data={item}
              iconsSize={18}
              textSize={"sm"}
              showIconNames={false}
            />
          ))}
        </div>
        {isLoading && <LoadingScreen />} {/* Show LoadingScreen when loading */}
        {!hasMore && !isLoading && (
          <p className="text-theme-secondary mt-4">No more posts to load.</p>
        )}
      </div>
    </>
  );
};

export default Posts;