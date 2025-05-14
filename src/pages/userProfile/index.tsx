import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useParams().userId;
  const ProfileData = location?.state?.profileData;
  console.log(userId, ProfileData);

  useEffect(() => {
    !userId && navigate("/users");
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-left">
        Profile
      </h1>
      <div className="max-w-4xl border border-theme-primaryBorder rounded-xl mb-4 p-4 bg-theme-primaryBg  text-center mx-auto">
        <img
          className="w-full max-h-72 object-cover "
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        />
        <img
          src={ProfileData.profilePicture}
          className="rounded-full h-36 w-36 mx-auto -mt-16"
        />

        <section className="space-y-4">
          <h3 className="text-theme-primary text-3xl font-bold mt-3">
            {ProfileData.name}
          </h3>

          <div className=" flex gap-x-8 justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-theme-primary text-lg font-semibold">
                {ProfileData.followers}
              </p>
              <p className="text-theme-secondary">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-theme-primary text-lg font-semibold">
                {ProfileData.following}
              </p>
              <p className="text-theme-secondary">Following</p>
            </div>
          </div>

          <p className="text-theme-secondary text-lg font-semibold">
            {ProfileData.bio}
          </p>
        </section>

        <section className="text-start">
          <p className="text-theme-primary text-lg font-semibold mb-">
            Friends
          </p>

          <div className="flex gap-6 px-4 mt-2">
            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>

            <div className="flex flex-col  gap-x-4 mb-4">
              <img
                src={
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80"
                }
                className="rounded-md w-16 h-16"
              />
              <p className="text-theme-primary text-sm font-semibold">
                {"John Doe"}
              </p>
            </div>
          </div>
        </section>

        <section className="text-start">
          <p className="text-theme-primary text-lg font-semibold mb-">
            Posts
          </p>

          
        </section>
      </div>
    </>
  );
};

export default UserProfile;
