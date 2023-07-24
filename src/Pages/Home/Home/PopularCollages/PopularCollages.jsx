import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
// import { useState } from "react";

const PopularCollege = () => {
//   const [serachText, setSearchText] = useState("");
//   const [collages, setCollages] = useState([])
  const { data, isLoading } = useQuery({
    queryKey: ["popularCollage"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/popularCollage");
      return res.data;
    },
  });

//     fetch("http://localhost:5000/popularCollage")
//     .then(res => res.json())
//     .then(data =>{
//         setCollages(data)
//     })

//   const handleSearch = () => {
//     fetch(`http://localhost:5000/CollageSearchByName/${serachText}`)
//     .then(res => res.json())
//     .then(data =>{
//         setCollages(data)
//     })
//   };

 if(isLoading) return <Loader/>
  

  return (
    <div className="container">
      <SectionTitle
        title={"Best Universities"}
        subTitle={"Best universities around the glove."}
      ></SectionTitle>

      <div className="relative flex justify-between lg:w-[500px] w-full h-12 rounded-xl shadow-lg focus-within:shadow-lg border border-cyan-500  z-50 mx-auto">
        <input
          className=" h-full  outline-none text-sm rounded-s-xl pl-6 text-gray-700 "
        //   onChange={(e) => setSearchText(e.target.value)}
          type="text"
          id="search"
          placeholder="Search Collage"
        />
        {/* <div onClick={handleSearch} className="grid place-items-center h-full w-12 text-cyan-600 cursor-pointer"> */}
        <div className="grid place-items-center h-full w-12 text-cyan-600 cursor-pointer">
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
        </div>
      </div>

      <div className="grid grid-cols-1 padding-r-l lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.slice(0, 3).map((popular) => (
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
                Events :{" "}
                {popular.events.map(
                  (event, index) => (index !== 0 ? ", " : "") + event.eventName
                )}
              </p>
              <p className="lg:text-lg text-justify font-medium font-mono">
                Research History : {popular.researchHistory}
              </p>
              <p className="lg:text-lg text-justify font-medium font-mono">
                Sports :
                {popular.sports.map(
                  (sport, index) => (index !== 0 ? ", " : "") + sport.sportName
                )}
              </p>

              <div className="card-actions w-full justify-center mt-2">
                <button className="my-btn">
                  <Link to={`/popularcollegedetails/${popular._id}`}>Details</Link>
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