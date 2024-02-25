import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";
import ErrorPage from "./components/ErrorPage";
import useGetData from "./hooks/useGetData";

const RenderLayout = () => {
  useGetData();
  return (
    <div className="p-1 bg-black min-h-screen w-full">
      <Outlet />
    </div>
  );
};

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RenderLayout />,
      children: [
        {
          path: "/video",
          element: <VideoList />,
        },
        {
          path: "/video/:id",
          element: <VideoPlayer />,
        },
        {
          path: "/error",
          element: <ErrorPage />,
        },
        {
          path: "/",
          element: <VideoList />,
        },
        {
          path: "*",
          element: <VideoList />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouter} />;
}

export default App;
