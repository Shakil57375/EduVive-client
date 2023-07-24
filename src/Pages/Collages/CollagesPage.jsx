import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

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
    <div className=" mt-52">
      {console.log(data)}

      <div className="container  padding-r-l grid grid-cols-1 lg:mt-16 lg:mb-16  mt-8 mb-9 md:mt-10 md:mb-10 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((popular) => (
          <div key={popular._id} className="card h-auto pb-6 bg-base-100 shadow-xl">
            <figure className="relative">
              <img
                src={popular.collegeImage}
                className=" w-96 rounded-2xl h-60 m-6"
                alt="PopularCollege"
              />
            </figure>
            <div className="flex flex-col px-6 space-y-3">
              <p className="lg:text-3xl  text-center font-bold font-Marcellus ">
               {popular.collegeName}
              </p>
              <p className="lg:text-lg absolute lg:top-[12.5rem] top-[12.8rem] rounded-se-2xl rounded-es-2xl  bg-cyan-600 text-white p-3 left-[0px] lg:left-[28px] " >
                Admission - {popular.admissionDate}
              </p>
              <p className="lg:text-lg   font-medium ">
                <Rating style={{ maxWidth: 150 }} readOnly className="w-full mx-auto text-center" value={popular.ratings}/>
              </p>
              <p className="text-[16px] text-gray-600 text-center ">
                {popular.researchNumber} research completed by {popular.collegeName}
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
