import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";

const CollegePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await axios.get("https://collage-booking-server-six.vercel.app/popularCollage");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      {console.log(data)}

      <div className="container  padding-r-l grid grid-cols-1 lg:mt-16 lg:mb-16  mt-8 mb-9 md:mt-10 md:mb-10 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((popular) => (
          <div key={popular._id} className="card full bg-base-100 shadow-xl">
            <figure>
              <img
                src={popular.collegeImage}
                className="w-full h-60"
                alt="PopularCollege"
              />
            </figure>
            <div className="card-body l">
              <p className="lg:text-lg text-justify font-medium font-mono">
                Name : {popular.collegeName}
              </p>
              <p className="lg:text-lg text-justify font-medium font-mono">
                Admission Date : {popular.admissionDate}
              </p>
              <p className="lg:text-lg text-justify font-medium font-mono">
                College Rating : {popular.rating} star
              </p>
              <p className="lg:text-lg text-justify font-medium font-mono">
                Number Of Research : {popular.researchNumber} research
              </p>

              <div className="card-actions w-full justify-center mt-2">
                <button className="my-btn">
                  <Link to={`/collageDetails/${popular._id}`}>
                    College Details
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegePage;
