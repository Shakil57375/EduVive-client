import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { data, isLoading } = useQuery({
    queryKey: ["colleges", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://collage-booking-server-six.vercel.app/studentInfo/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  console.log(data);
  return (
    <div className="mt-52">
      {data?.map((student) => (
        <div key={student._id}>
          <div className="bg-white my-10 rounded-lg p-6 shadow-lg max-w-xs mx-auto mt-10 h-full">
            <div className="relative">
              {/* User Image */}
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={student.studentImage}
                  alt="User"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            {/* User Info */}
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-center text-gray-800">
                {student.studentName}
              </h2>
              <div className="my-5 space-y-3 ">
                <p className="text-lg text-gray-600">
                   {student.studentEmail}
                </p>
                <p className="text-lg text-gray-600">
                  {student.collageName}
                </p>
                <p className="text-lg text-gray-600">
                  {student.address}
                </p>
              </div>
            </div>
            {/* Edit Button */}
            <div className="mt-10 w-full mx-auto">
              <Link to={`/updateProfile/${student._id}`} className="my-btn ">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
