interface SpinnerProps {
  size?: string;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { size = "h-16 w-16" } = props;
  return (
    <div className="relative">
      <div
        className={`${size} rounded-full border-t-8 border-b-8 border-gray-200`}
      ></div>
      <div
        className={`absolute top-0 left-0 rounded-full border-t-8 border-b-8 border-[#059669] animate-spin ${size}`}
      ></div>
    </div>
  );
};

export default Spinner;
