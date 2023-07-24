import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CollegePage from "../Pages/Collages/CollagesPage";
import CollegeDetails from "../Pages/CollageDetails/CollageDetails";
import PopularCollegeDetails from "../Pages/Home/Home/PopularCollages/PopularCollegeDetails";
import AdmissionPage from "../Pages/AdmissionPage/AdmissionPage";
import AdmissionForm from "../Pages/AdmissionForm/AdmissionForm";
import Profile from "../Pages/Profile/Profile";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import MyCollegePage from "../Pages/MyCollage/MyCollage";
import Feedback from "../Pages/Feedback/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/collages",
        element: <CollegePage />,
      },
      {
        path: "/collageDetails/:id",
        element: <CollegeDetails />,
        loader: ({ params }) =>
          fetch(`https://collage-booking-server-six.vercel.app/collegesDetails/${params.id}`),
      },
      {
        path: "/popularcollegedetails/:id",
        element: <PopularCollegeDetails />,
        loader: ({ params }) =>
          fetch(`https://collage-booking-server-six.vercel.app/popularcolleges/${params.id}`),
      },
      {
        path: "/admissionPage",
        element: <AdmissionPage />,
      },
      {
        path: "/admissionForm/:id",
        element: <AdmissionForm />,
        loader: ({ params }) =>
          fetch(`https://collage-booking-server-six.vercel.app/collegesDetails/${params.id}`),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/updateProfile/:id",
        element: <UpdateProfile />,
        loader: ({ params }) =>
          fetch(`https://collage-booking-server-six.vercel.app/studentAdmission/${params.id}`),
      },
      {
        path: "/myCollage",
        element: <MyCollegePage />,
      },
      {
        path: "/feedbacks/:id",
        element: <Feedback></Feedback>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
