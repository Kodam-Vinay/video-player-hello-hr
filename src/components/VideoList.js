import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoItem from "./VideoItem";
import { v4 as uuidV4 } from "uuid";
import { useSelector } from "react-redux";

const VideoList = () => {
  const navigate = useNavigate();
  const [activePlayIconItem, setActivePlayIconItem] = useState({});
  const videoList = useSelector((store) => store?.video?.videosList);
  const isError = useSelector((store) => store?.error?.isError);
  if (isError) navigate("/error");
  return (
    <div className="">
      <h1 className="text-xl font-bold text-center italic">text-white</h1>
      <div className="px-4 py-2 flex flex-wrap justify-center">
        {videoList?.length > 0 &&
          videoList?.map((each) => (
            <VideoItem
              key={uuidV4()}
              videoDetails={each}
              isActive={activePlayIconItem === each?.id}
              setActivePlayIconItem={setActivePlayIconItem}
            />
          ))}
      </div>
    </div>
  );
};

export default VideoList;
