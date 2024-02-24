import SettingsIcon from "../svgs/SettingsIcon";

const SettingsLogo = ({
  videos,
  setIsSettingsClicked,
  isSettingsClicked,
  setQualityUrl,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="hover:bg-opacity-40 rounded-full hover:bg-gray-500 cursor-pointer self-end"
        onClick={() => setIsSettingsClicked((prev) => !prev)}
      >
        <SettingsIcon className="px-2 py-1" />
      </button>
      {isSettingsClicked && (
        <div className="quality border border-black w-fit rounded-sm bg-gray-200 fixed -ml-32 -mt-40">
          <p className="text-center underline">Change Quality</p>
          {Object.keys(videos).map((each, index) => (
            <div
              key={index}
              className="border-b-2 border-black px-4 flex items-center cursor-pointer py-1"
              onClick={() => {
                setQualityUrl(videos[each]?.url);
                setIsSettingsClicked(false);
              }}
            >
              <p className="opacity-85">
                {each}:{" "}
                <span>
                  {videos?.[each]?.width}x{videos?.[each]?.height}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsLogo;
