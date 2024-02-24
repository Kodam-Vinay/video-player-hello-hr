import LeftArrow from "../svgs/LeftArrow";
import RightArrow from "../svgs/RightArrow";

const VideoPlayerButtons = ({ onClickPreviousButton, onClickNextButton }) => {
  return (
    <div className="buttons flex items-center">
      <button
        className="hover:bg-opacity-40 rounded-full hover:bg-gray-500 cursor-pointer"
        onClick={onClickPreviousButton}
      >
        <LeftArrow className="px-2 py-1" />
      </button>

      <button
        className="hover:bg-opacity-40 rounded-full hover:bg-gray-500 cursor-pointer"
        onClick={onClickNextButton}
      >
        <RightArrow className="px-2 py-1" />
      </button>
    </div>
  );
};

export default VideoPlayerButtons;
