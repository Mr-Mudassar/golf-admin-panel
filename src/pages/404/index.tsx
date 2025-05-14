import CustomBtn from "../../components/customBtn";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="border border-theme-primaryBorder rounded-xl mb-4 p-4 bg-theme-primaryBg space-y-6 w-max text-center">
        <h1 className="text-2xl font-semibold text-theme-btnBgText mb-4 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-theme-secondary">
          The page you are looking for does not exist.
        </p>

        <CustomBtn
          type="button"
          text={"Go to Home Page"}
          className="font-semibold px-4"
          handleOnClick={() => (window.location.href = "/")}
        />
      </div>
    </div>
  );
};

export default NotFound;
