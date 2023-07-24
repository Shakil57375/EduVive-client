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
          fetch(`http://localhost:5000/collegesDetails/${params.id}`),
      },
      {
        path: "/popularcollegedetails/:id",
        element: <PopularCollegeDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/popularcolleges/${params.id}`),
      },
      {
        path: "/admissionPage",
        element : <AdmissionPage/>
      },
      {
        path : "/admissionForm/:id",
        element : <AdmissionForm/>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/collegesDetails/${params.id}`),
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
