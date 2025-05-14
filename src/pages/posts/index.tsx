import { ALL_POSTS_DATA } from "../../data/posts";
import PostComponent from "../../components/postComponent";

const Posts = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Posts
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-3xl ">
          {ALL_POSTS_DATA.map((item, index) => (
            <div key={index}>
              <PostComponent data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
