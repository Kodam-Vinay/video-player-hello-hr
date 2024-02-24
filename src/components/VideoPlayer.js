import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import useDeviceCheck from "../hooks/useDeviceCheck";
import SettingsLogo from "./SettingsLogo";
import VideoPlayerButtons from "./VideoPlayerButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  storePresentVideo,
  storeRemainingVideos,
} from "../store/slices/videoPlayerSlice";
import { generateRandomNum } from "../constants/constants";
import { changePageNo } from "../store/slices/VideoSlice";
import PlayForVideo from "../svgs/PlayForVideo";
import PauseForVideo from "../svgs/PauseForVideo";
import LikeIcon from "../svgs/LikeIcon";
import LikedIcon from "../svgs/LikedIcon";

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceCheck();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const pageNo = useSelector((store) => store?.video?.pageNo);

  const videosList = useSelector(
    (store) => store?.player?.remainaingVideosList
  );

  const originalVideosList = useSelector((store) => store?.video?.videosList);
  const presentVideo = useSelector((store) => store?.player?.presentVideo);
  const [qualityUrl, setQualityUrl] = useState(
    presentVideo?.videos?.large?.url
  );

  useEffect(() => {
    setQualityUrl(presentVideo?.videos?.large?.url);
  }, [presentVideo]);

  if (!Object.keys(presentVideo).length > 0) {
    const randomNum = generateRandomNum(0, originalVideosList?.length);
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
    const findIndex = videosList?.findIndex(
      (each) => each?.id === presentVideo?.id
    );

    if (findIndex > 0) {
      dispatch(storePresentVideo(videosList[findIndex - 1]));
      setIsSettingsClicked(false);
    }
  };

  const onClickNextButton = () => {
    const findIndex = videosList?.findIndex(
      (each) => each?.id === presentVideo?.id
    );
    if (findIndex % 17 === 0) {
      if (pageNo < 10) dispatch(changePageNo(pageNo + 1));
    }
    dispatch(storePresentVideo(videosList[findIndex + 1]));
    setIsSettingsClicked(false);
  };

  const minSwipeDistance = 50;

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
      className="h-full w-full"
      onTouchMove={isMobile ? onTouchMove : ""}
      onTouchStart={isMobile ? onTouchStart : ""}
      onTouchEnd={isMobile ? onTouchEnd : ""}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <h1 className="text-xl font-bold text-center italic text-white mb-4">
        Video Player
      </h1>
      <div className="w-full h-full">
        <p className="text-white mb-3">{presentVideo?.tags}</p>
        <div className="flex flex-col lg:h-[85%] lg:w-screen">
          <ReactPlayer
            ref={playerRef}
            url={qualityUrl} // replace with your video URL
            playing={playing}
            volume={volume}
            onProgress={(e) => setCurrentVideoDuration(e.playedSeconds)}
            controls={false} // Disable default controls
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
