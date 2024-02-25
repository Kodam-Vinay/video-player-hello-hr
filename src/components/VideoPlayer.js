import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import useDeviceCheck from "../hooks/useDeviceCheck";
import SettingsLogo from "./SettingsLogo";
import VideoPlayerButtons from "./VideoPlayerButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  storeIndexValue,
  storePresentVideo,
  storeRemainingVideos,
} from "../store/slices/videoPlayerSlice";
import { generateRandomNum, getIndex } from "../constants/constants";
import { changePageNo } from "../store/slices/VideoSlice";
import PlayForVideo from "../svgs/PlayForVideo";
import PauseForVideo from "../svgs/PauseForVideo";
import LikedIcon from "../svgs/LikedIcon";
import BackButton from "../svgs/BackButton";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceCheck();
  const navigate = useNavigate();
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const index = useSelector((store) => store?.player?.index);

  const pageNo = useSelector((store) => store?.video?.pageNo);

  const videosList = useSelector(
    (store) => store?.player?.remainaingVideosList
  );

  const originalVideosList = useSelector((store) => store?.video?.videosList);
  const presentVideo = useSelector((store) => store?.player?.presentVideo);

  const [qualityUrl, setQualityUrl] = useState(
    presentVideo?.videos?.large?.url
  );

  const get = getIndex(originalVideosList, presentVideo);

  useEffect(() => {
    dispatch(storeIndexValue(get));
  }, [get !== -1]);

  useEffect(() => {
    setQualityUrl(presentVideo?.videos?.large?.url);
  }, [presentVideo]);

  useEffect(() => {
    const filterVideos = originalVideosList?.filter(
      (each) => each?.id !== presentVideo?.id
    );
    dispatch(storeRemainingVideos(filterVideos));
  }, [originalVideosList]);

  if (!Object.keys(presentVideo).length > 0) {
    const randomNum = generateRandomNum(0, originalVideosList?.length - 1);
    if (randomNum) {
      const presentVideo = originalVideosList[randomNum];
      dispatch(storePresentVideo(presentVideo));
      const filterVideos = originalVideosList?.filter(
        (each) => each?.id !== presentVideo?.id
      );
      dispatch(storeRemainingVideos(filterVideos));
    }
  }

  const onClickPreviousButton = () => {
    if (index > 0 && index < videosList?.length - 1) {
      dispatch(storeIndexValue(index - 1));
      dispatch(storePresentVideo(videosList[index]));
      setIsSettingsClicked(false);
    }
  };

  const onClickNextButton = () => {
    if (index % 17 === 0) {
      dispatch(changePageNo(pageNo + 1));
    }

    if (index < videosList?.length - 1) {
      dispatch(storeIndexValue(index + 1));
      dispatch(storePresentVideo(videosList[index]));
      setIsSettingsClicked(false);
    }
  };

  const minSwipeDistance = 30;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;
    if (isSwipeUp || isSwipeDown) {
      if (isSwipeUp) {
        onClickNextButton();
      } else {
        onClickPreviousButton();
      }
    }
  };

  //controls for react player
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [videoCurrentDuration, setCurrentVideoDuration] = useState(0);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(() => {
    setPlaying(false);
  }, [Math.floor(videoCurrentDuration) === presentVideo?.duration]);

  return (
    <div
      className="h-[99vh] w-full overflow-hidden flex flex-col"
      onTouchMove={isMobile ? onTouchMove : ""}
      onTouchStart={isMobile ? onTouchStart : ""}
      onTouchEnd={isMobile ? onTouchEnd : ""}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          className="text-white mr-2 rounded-full hover:bg-gray-400 -mt-2"
        >
          <BackButton />
        </button>

        <h1 className="text-xl font-bold mx-auto text-center italic text-white mb-4">
          Video Player
        </h1>
      </div>
      <div className="w-full h-full">
        <p className="text-white mb-3">{presentVideo?.tags}</p>
        <div className="w-full h-44 xs:h-52 mxs:h-72 sm:h-96 md:h-[450px] lg:h-[540px]">
          <ReactPlayer
            ref={playerRef}
            url={qualityUrl}
            playing={playing}
            volume={volume}
            onProgress={(e) => setCurrentVideoDuration(e.playedSeconds)}
            controls={false}
            width="100%"
            height="100%"
          />
        </div>
        <div className="flex flex-col bottom-0 absolute mb-5 w-[98%] min-h-14">
          {showOptions && (
            <>
              <button
                onClick={() => setIsLikeClicked(!isLikeClicked)}
                className="text-white sm:ml-4 px-2 fxs:hidden"
              >
                <LikedIcon color={isLikeClicked ? "#ffff" : ""} />
              </button>
              <div className="flex items-center justify-between px-2 sm:px-16 md:px-8">
                <div className="flex items-center -ml-1">
                  <button onClick={handlePlayPause} className="text-white mr-2">
                    {playing ? <PauseForVideo /> : <PlayForVideo />}
                  </button>

                  {!isMobile && (
                    <VideoPlayerButtons
                      onClickPreviousButton={onClickPreviousButton}
                      onClickNextButton={onClickNextButton}
                    />
                  )}
                  <button
                    onClick={() => setIsLikeClicked(!isLikeClicked)}
                    className="text-white -ml-1 sm:ml-4 hidden fxs:block"
                  >
                    <LikedIcon color={isLikeClicked ? "#ffff" : ""} />
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    className="w-14 sm:w-20 md:w-28"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <SettingsLogo
                    videos={presentVideo?.videos}
                    setIsSettingsClicked={setIsSettingsClicked}
                    isSettingsClicked={isSettingsClicked}
                    setQualityUrl={setQualityUrl}
                  />
                </div>
              </div>
              <input
                className="w-[96%] flex flex-col self-center"
                type="range"
                value={videoCurrentDuration / presentVideo?.duration}
                min={0}
                max={1}
                step={0.01}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
