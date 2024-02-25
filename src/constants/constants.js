export const API_URL = `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_MY_API_KEY}&q=&pretty=true&page=`;
export const IMAGE_URL = `https://i.vimeocdn.com/video/`;
export const generateRandomNum = (startIndex, listLength) => {
  const randomNum = Math.floor(
    Math.random() * (listLength - startIndex + 1 + startIndex)
  );
  return randomNum;
};

export const getIndex = (originalVideosList, presentVideo) => {
  const findIndex = originalVideosList?.findIndex(
    (each) => each?.id === presentVideo?.id
  );
  return findIndex;
};
