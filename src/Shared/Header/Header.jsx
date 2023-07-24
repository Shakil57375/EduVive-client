import { useContext, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../Provider/AuthProvider";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const items = (
    <div className="nav-links">
      <Link className="link text-base font-medium flex flex-col lg:inline-block">
        Home
      </Link>
      <Link to="/collages" className="link text-base font-medium flex flex-col lg:inline-block">
        Collages
      </Link>
      <Link to="/admissionPage" className="link text-base font-medium flex flex-col lg:inline-block">
        Admission
      </Link>
      <Link to="/myCollage" className="link text-base font-medium flex flex-col lg:inline-block">
        My Collage
      </Link>
    </div>
  );
  const handleLogout = () => {
    logOut().then(() => {});
  };
  return (
    <div>
      <div className="flex relative  items-center justify-between shadow-lg gap-4 padding-r-l  padding-u-d">
        <Link to="/">
          <img
            src={logo}
            className="lg:w-28 w-10 lg:h-12 h-6 cursor-pointer"
            alt=""
          />
        </Link>
        <div className="hidden lg:block justify-center">{items}</div>
        <div>
          <div className="absolute right-1 top-9">
            <div className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
              <span>
                {isOpen === true ? (
                  <AiOutlineClose className="w-5 h-5"></AiOutlineClose>
                ) : (
                  <AiOutlineMenu className="w-5 h-5" />
                )}
              </span>
            </div>
            <div
              className={` flex text-black items-center absolute duration-500 flex-col justify-center text-lg ${
                isOpen
                  ? "block right-0 top-[48px] z-20 bg-white w-300px text-black shadow-2xl py-5 gap-2 pl-5"
                  : "hidden"
              }`}
            >
              {items}
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-2">
              {/* <div className="relative lg:right-0 right-5 flex items-center lg:w-[300px] w-full h-12 rounded-lg shadow-lg focus-within:shadow-lg bg-white overflow-hidden">
                <input
                  className=" h-full w-full  outline-none text-sm text-gray-700 pl-4"
                  type="text"
                  id="search"
                  placeholder="Search Collage"
                />
                <div className="grid place-items-center h-full w-12 text-cyan-600">
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
              </div> */}
              {/* <Link to="/login">
                <div className="my-btn relative lg:right-0 right-[10px] top-1  text-white">
                  Login
                </div>
              </Link> */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar mt-0.5"
                  >
                    <div className="w-12 relative right-5 lg:right-0 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile" className="hover:!bg-neutral/10">
                        {user?.displayName}
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <a className="hover:!bg-neutral/10">Sign Out</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="my-btn relative lg:right-0 right-[10px] top-1  text-white"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
