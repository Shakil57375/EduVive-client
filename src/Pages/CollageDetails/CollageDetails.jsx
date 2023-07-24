import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const CollegeDetails = () => {
  const details = useLoaderData();
  console.log(details);

  return (
    <div className="container  padding-r-l">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-max lg:h-[650px] pt-8 mt-16 pb-12 lg:py-0">
        <div className="w-full lg:w-4/5 mx-auto p-6 rounded-xl bg-neutral/5">
          <img
            src={details.collegeImage}
            alt=""
            className="w-full aspect-square object-cover object-center"
          />
        </div>
        <div className="space-y-3 md:space-y-5 lg:space-y-8">
          <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl xl:text-7xl py-1 leading-snug">
            <span className="gradient-text">{details.collegeName}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl pb-1 lg:pb-4">
            <span>Admission Process : {details.admissionProcess}</span> <br />
            <span>Research Work : {details.researchWork}</span>
          </p>
          <Link
            to="/colleges"
            className="my-btn relative top-4 rounded-full"
          >
            Explore Colleges
          </Link>
        </div>
      </div>

      <div className="mx-auto  mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12">
        <SectionTitle title={"College Facilities"}></SectionTitle>

        <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {details?.Facilities.map((event, index) => (
            <div key={index} className="card full bg-base-100 shadow-xl">
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

      <div className="mx-auto  mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12">
        <SectionTitle title={"College Event's"}></SectionTitle>

        <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {details?.events.map((event, index) => (
            <div key={index} className="card full bg-base-100 shadow-xl">
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

      <div className="mx-auto mt-4 mb-8 md:mt-6 lg:mt-8 md:mb-10 lg:mb-16">
        <SectionTitle title={"Sport's Categories"}></SectionTitle>

        <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {details?.sports.map((sport, index) => (
            <div key={index} className="card full bg-base-100 shadow-xl">
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
    </div>
  );
};

export default CollegeDetails;
