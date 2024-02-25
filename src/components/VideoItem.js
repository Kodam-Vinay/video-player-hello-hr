import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../constants/constants";
import PlayIcon from "../svgs/PlayIcon";
import { Link } from "react-router-dom";
import {
  storePresentVideo,
  storeRemainingVideos,
} from "../store/slices/videoPlayerSlice";

const VideoItem = ({ videoDetails, setActivePlayIconItem, isActive }) => {
  const videosList = useSelector((store) => store?.video?.videosList);
  const dispatch = useDispatch();
  const { picture_id, id } = videoDetails;

  const onClickVideoItem = () => {
    dispatch(storePresentVideo(videoDetails));
    const filterVideos = videosList?.filter((each) => each?.id !== id);
    dispatch(storeRemainingVideos(filterVideos));
  };

  return (
    <div className="p-1 cursor-pointer m-2" onClick={() => onClickVideoItem()}>
      <Link to={`/video/${id}`}>
        <img
          onMouseEnter={() => setActivePlayIconItem(id)}
          onMouseLeave={() => setActivePlayIconItem()}
          src={IMAGE_URL + picture_id}
          alt="video_image"
          className={`w-56 h-40 rounded-md ${isActive ? "opacity-70" : ""}`}
        />
        {isActive && (
          <div className="-mt-24 ml-20 mb-14">
            <PlayIcon />
          </div>
        )}
      </Link>
    </div>
  );
};

export default VideoItem;
