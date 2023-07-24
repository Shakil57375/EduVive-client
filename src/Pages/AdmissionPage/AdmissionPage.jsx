// import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AdmissionPage = () => {
  
  const { data, isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await axios.get("https://collage-booking-server-six.vercel.app/popularCollage");
      return res.data;
    },
  });

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <div className="padding-r-l mt-40">
      <SectionTitle title={"Admission Page"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Admission</li>
      </SectionTitle>

      <div className="container grid grid-cols-1 lg:mt-16 lg:mb-16  mt-8 mb-9 md:mt-10 md:mb-10 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((popular) => (
          <div key={popular._id} className="card full bg-base-100 shadow-2xl pb-6">
            <figure className="relative">
              <img
                src={popular.collegeImage}
                className="w-96 h-60 rounded-2xl m-6"
                alt="PopularCollege"
              />
            </figure>
            <div className="flex flex-col px-6">
              <p className="lg:text-3xl  text-center font-bold mb-4 font-Marcellus">
                {popular.collegeName}
              </p>
              <p className="lg:text-lg absolute top-[13.3rem] rounded-se-2xl rounded-es-2xl  bg-cyan-600 text-white p-3 left-[24px] ">
                Admission - {popular.admissionDate}
              </p>

              <div className="card-actions w-full justify-center mt-2">
                <button className="my-btn">
                  <Link to={`/admissionForm/${popular._id}`}>
                    Get Admitted
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

export default AdmissionPage;
