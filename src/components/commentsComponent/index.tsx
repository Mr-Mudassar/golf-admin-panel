import { CommentsData } from "../../data/commentsData";

const CommentsComponent = () => {
  return (
    <div>
      {CommentsData.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 mb-4">
          <img
            src={item?.user?.profilePicture}
            alt={item?.user?.profilePicture}
            className="rounded-full w-12 h-12"
          />
          <div>
            <div className="bg-theme-secondaryBg rounded-lg p-3 ml-4 ">
              <p className="text-theme-primary text-lg font-semibold">
                {item?.user?.name}
              </p>
              <p className="text-theme-secondary">{item?.comment}</p>
            </div>
            <div className="ml-4 flex justify-around text-xs text-theme-secondary font-semibold">
              <p>{"2 days ago"}</p>
              <button onClick={() => window.alert("Like")}>Like</button>
              <button onClick={() => window.alert("Reply")}>Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsComponent;
