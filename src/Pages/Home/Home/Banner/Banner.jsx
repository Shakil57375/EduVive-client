const Banner = () => {
  return (
    <div className="mt-36">
      <div className="flex lg:flex-row flex-col-reverse gap-10 items-center justify-between lg:px-24 ">
        <div className="w-full px-10 lg:px-0 md:w-1/2 lg:w-5/12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-Marcellus mb-4">
            EduVive
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-cyan-600 font-Montserrat  mb-4">
            Empowering Education, Inspiring Futures
          </h2>
          <p className=" text-base ">
            Welcome to EduVive, your ultimate platform for seamless
            college experiences and boundless opportunities. We are dedicated to
            fostering a connected community, where students, educators, and
            institutions come together to shape a brighter future. Explore a
            myriad of resources, from college bookings and event coordination to
            academic support and networking. Embrace the journey of knowledge
            and personal growth as we embark on this transformation educational
            adventure together. Join us at EduVive and lets build a
            stronger, smarter, and more connected world of education and
            innovation.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-7/12 mt-8 md:mt-0">
          <img
            src="https://i.ibb.co/RbHZhNX/header-image.png"
            alt="Banner"
            className="w-full h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
