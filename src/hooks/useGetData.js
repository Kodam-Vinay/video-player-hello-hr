import { useEffect } from "react";
import { API_URL } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { storeVideosList } from "../store/slices/VideoSlice";
import { toggleError } from "../store/slices/errorSlice";

const useGetData = () => {
  const dispatch = useDispatch();
  const pageNo = useSelector((store) => store?.video?.pageNo);
  const videosList = useSelector((store) => store?.video?.videosList);

  useEffect(() => {
    getData();
  }, [pageNo]);

  async function getData() {
    try {
      const response = await fetch(API_URL + pageNo);
      const data = await response.json();
      if (response?.ok) {
        dispatch(toggleError(false));
        if (videosList?.length > 0) {
          dispatch(storeVideosList([...videosList, ...data?.hits]));
        } else {
          dispatch(storeVideosList(data?.hits));
        }
      } else {
        dispatch(toggleError(true));
      }
    } catch (error) {
      dispatch(toggleError(true));
      console.log(error);
    }
  }
};

export default useGetData;
