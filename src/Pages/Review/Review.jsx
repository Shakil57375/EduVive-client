import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Review = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get("https://collage-booking-server-six.vercel.app/reviews");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container padding-r-l my-5">
      <SectionTitle title={"Colleges Review's"}></SectionTitle>

      <p className="max-w-3xl mx-2 md:mx-auto md:text-lg   md:text-center mb-5 md:mb-6 lg:mb-8">
        Explore illuminating student and alumni reviews showcasing
        transformative experiences and vibrant college communities, revealing
        the lasting impact of education at each college.
      </p>

      <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((review) => (
          <div key={review._id} className="px-5 bg-base-100 shadow-2xl">
            <figure>
              <img
                src={review.collageImage}
                className="w-full rounded-2xl h-60"
                alt="PopularCollege"
              />
            </figure>
            <div className="card-body space-y-4">
              <p className="text-2xl font-bold font-Montserrat text-center  ">
                {review.collageName}
              </p>
              <p className="text-[16px] text-center text-gray-600 font-Poppins ">
                {review.feedback}
              </p>
              <div>
                <Rating style={{ maxWidth: 150 }} className="w-full mx-auto text-center" value={review.ratings}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
