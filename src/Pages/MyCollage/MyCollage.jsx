import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
const MyCollage = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { data, isLoading } = useQuery({
    queryKey: ["colleges", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://collage-booking-server-six.vercel.app/studentInfo/${user?.email}`
      );
      return res?.data;
    },
  });
  console.log(data);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div>
        <SectionTitle title={"My College"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>My College</li>
        </SectionTitle>

        <div className="container h-max padding-r-l pt-2  mt-4 lg:mt-0 pb-5 lg:py-0 ">
          {data?.map((data) => (
            <>
              <div className="flex lg:flex-row flex-col justify-between items-center gap-10" key={data._id}>
                <div className="w-full lg:w-4/5 mx-auto p-6 rounded-xl bg-neutral/5">
                  <img
                    src={data?.collageImage}
                    alt=""
                    className="w-full aspect-square object-cover object-center"
                  />
                </div>
                <div className="space-y-3 md:space-y-5 lg:space-y-8">
                  <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl xl:text-7xl py-1 leading-snug">
                    <span className="gradient-text">{data?.studentName}</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl pb-1 lg:pb-4">
                    <span>Name : {data?.studentEmail}</span> <br />
                    <span>Subject : {data.subject}</span>
                    <br />
                    <span>Research : {data.researchWork}</span>
                  </p>
                  <Link
                    to={`/feedbacks/${data._id}`}
                    className="my-btn"
                  >
                    Give your review
                  </Link>
                </div>
              </div>
              <div className="container mx-auto  mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12">
                <SectionTitle title={"College Facilities"}></SectionTitle>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data?.facilities.map((event, index) => (
                    <div
                      key={index}
                      className="card full bg-base-100 shadow-xl"
                    >
                      <figure>
                        <img
                          src={event.image}
                          className="w-full h-60"
                          alt="PopularCollege"
                        />
                      </figure>
                      <div className="card-body l">
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Name : {event.name}
                        </p>
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Event Details : {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto container mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12">
                <SectionTitle title={"College Event's"}></SectionTitle>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data?.events.map((event, index) => (
                    <div
                      key={index}
                      className="card full bg-base-100 shadow-xl"
                    >
                      <figure>
                        <img
                          src={event.eventImage}
                          className="w-full h-60"
                          alt="PopularCollege"
                        />
                      </figure>
                      <div className="card-body l">
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Name : {event.eventName}
                        </p>
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Event Details : {event.eventDetails}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto container mt-4 mb-8 md:mt-6 lg:mt-8 md:mb-10 lg:mb-16">
                <SectionTitle title={"Sport's Categories"}></SectionTitle>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data?.sports.map((sport, index) => (
                    <div
                      key={index}
                      className="card full bg-base-100 shadow-xl"
                    >
                      <figure>
                        <img
                          src={sport.sportImage}
                          className="w-full h-60"
                          alt="PopularCollege"
                        />
                      </figure>
                      <div className="card-body l">
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Name : {sport.sportName}
                        </p>
                        <p className="lg:text-lg text-justify font-medium font-mono">
                          Sports Details : {sport.sportDetails}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollage;
