interface SpinnerProps {
  size?: string;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { size = "h-16 w-16" } = props;
  return (
    <div
      className={`border-gray-300  animate-spin rounded-full border-4 border-t-green-600 m-2 ${size}`}
    />
  );
};

export default Spinner;
