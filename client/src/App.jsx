import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "landing",
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: dashboardLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <AddJob />, action: addJobAction },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "edit-job/:id",
        element: <EditJob />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
