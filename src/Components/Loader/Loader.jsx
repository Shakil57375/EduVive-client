import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PacmanLoader color="#36d7b7" size={30} />
    </div>
  );
};

export default Loader;
