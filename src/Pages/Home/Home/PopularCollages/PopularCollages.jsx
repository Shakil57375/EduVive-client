import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";

const PopularCollege = () => {
  const [datas, setDatas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["popularCollage"],
    queryFn: async () => {
      const res = await axios.get(
        "https://collage-booking-server-six.vercel.app/popularCollage"
      );
      return res.data;
    },
  });

  // Use useEffect to update the datas state when data changes
  useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);
  // console.log(datas)

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://collage-booking-server-six.vercel.app/collegeName/${searchText}`
      );
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <SectionTitle
        title={"Best Universities"}
        subTitle={"Best universities around the glove."}
      ></SectionTitle>

      <div className="relative flex justify-between lg:w-[500px] w-full h-12 rounded-xl shadow-lg focus-within:shadow-lg border border-cyan-500  z-30 mx-auto">
        <input
          className=" h-full  outline-none text-sm rounded-s-xl pl-6 text-gray-700 "
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          id="search"
          placeholder="Search Collage"
        />
        {/* <div onClick={handleSearch} className="grid place-items-center h-full w-12 text-cyan-600 cursor-pointer"> */}
        <button
          onClick={handleSearch}
          className="grid place-items-center h-full w-12 text-cyan-600 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 padding-r-l lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {datas.slice(0, 3).map((popular) => (
          <div key={popular._id} className="card  pb-6 bg-base-100 shadow-2xl">
            <figure className="relative">
              <img
                src={popular.collegeImage}
                className="w-96 rounded-2xl h-60 m-6 "
                alt="PopularCollege"
              />
            </figure>
            <div className="flex flex-col px-6 space-y-3 ">
              <p className="lg:text-3xl  text-center font-bold font-Marcellus">
                {popular.collegeName}
              </p>
              <p className="lg:text-lg absolute lg:top-[12.5rem] top-[13rem] rounded-se-2xl rounded-es-2xl  bg-cyan-600 text-white p-3 left-[0px] lg:left-[28px]  ">
                Admission - {popular.admissionDate}
              </p>
              <p className=" ">
                <span className="text-[16px] font-medium">Events :</span>
                <span className="text-sm text-gray-600 ml-2">
                  {popular.events.map(
                    (event, index) =>
                      (index !== 0 ? ", " : "") + event.eventName
                  )}
                </span>
              </p>
              <p className=" ">
              <span className="text-[16px] font-medium"> Research History : </span>
               
                              <span className="text-sm text-gray-600 ml-2">
              {popular.researchHistory}
                              </span>
              </p>
              <p className="">
                <span className="text-[16px] font-medium">Sports :</span>
                <span className="text-sm text-gray-600 ml-2">
                  {popular.sports.map(
                    (sport, index) =>
                      (index !== 0 ? ", " : "") + sport.sportName
                  )}
                </span>
              </p>

              <div className="card-actions w-full justify-center mt-2">
                <button className="my-btn">
                  <Link to={`/popularcollegedetails/${popular._id}`}>
                    Details
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

export default PopularCollege;
