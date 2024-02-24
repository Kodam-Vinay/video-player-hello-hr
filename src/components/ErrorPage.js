import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const onClickGoBack = () => {
    navigate("/video");
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl my-20 text-white">Something, Error</h1>
      <button
        className="border px-4 py-2 text-white"
        onClick={() => onClickGoBack()}
      >
        GO Back
      </button>
    </div>
  );
};

export default ErrorPage;
