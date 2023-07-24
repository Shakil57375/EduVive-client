import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const Research = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["researchpaper"],
    queryFn: async () => {
      const res = await axios.get("https://collage-booking-server-six.vercel.app/research");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container padding-u-d">
      <SectionTitle title={"Research History"} subTitle={""}></SectionTitle>
      <div className="grid grid-cols-1  lg:mt-12 mt-7 md:grid-cols-2 lg:grid-cols-3  padding-r-l gap-10">
        {data?.map((research) => (
          <div
            key={research._id}
            className="card w-full h-full bg-base-100 shadow-xl overflow-y-auto"
          >
            <div className="card-body">
              <h2 className="lg:text-3xl text-xl  font-bold text-center">
                {research.collegeName}
              </h2>
              <p className="text-[16px]  text-center font-Poppins text-gray-600">
                {research.researchHistory}
              </p>
              <p className=" text-lg  text-center text-sky-600">
                <a target="_blank" className="underline" href={research.researchLink} rel="noreferrer">explore research topic</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;
