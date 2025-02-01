
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search/Search";

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
          { path: '/', element: <Home /> },
          { path: '/search', element: <Search /> },
        //   { path: '/auction', element: <Auction /> },
        ],
      },
]);
