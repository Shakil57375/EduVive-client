import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { handleLogin, handleGoogleSignIn, setLoader } =
    useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    handleLogin(data.email, data.password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "user logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  const handleGoogleLogin = () => {
    handleGoogleSignIn()
      .then((result) => {
        const loggerUser = result.user;
        console.log(loggerUser);

        const savedUser = {
          name: loggerUser.displayName,
          email: loggerUser.email,
          image: loggerUser.photoURL,
        };

        fetch("https://summer-camp-school-server-shakil57375.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((response) => response.json())
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User successfully login by google.",
              showConfirmButton: true,
              // timer: 1500
            });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            setLoader(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoader(false);
        const ErrorMessage = error.message;
        console.log(ErrorMessage);
      });
  };
  return (
    <>
      <div className="bg-base-200 my-14 p-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10">
          <motion.div
            initial={{ x: -1550 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
            className="text-center lg:ml-20 ml-0 w-full md:w-1/2 lg:my-0 my-5 lg:text-left"
          >
            <h1 className="text-5xl font-Marcellus text-center font-bold lg:mb-16 mb-5">
              Login here!
            </h1>
            <img
              src="https://i.ibb.co/BL491Sn/image-removebg-preview-4.png"
              alt=""
            />
          </motion.div>
          <motion.div
            initial={{ x: 1550 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
            className="card flex-shrink-0 md:w-1/2 w-full m-10 shadow-2xl bg-base-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border rounded"
                />
                <p
                  className="absolute top-40 right-11"
                  onClick={() => setShow(!show)}
                >
                  <small>
                    {show ? (
                      <span>
                        <FaEyeSlash className="text-2xl" />
                      </span>
                    ) : (
                      <span>
                        <FaEye className="text-2xl" />
                      </span>
                    )}
                  </small>
                </p>
              </div>
              <div className="form-control mt-6">
                <motion.input
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 8px rgba(255,255,255)",
                    textShadow: "0px 0px 8px rgba(255,255,255)",
                  }}
                  className="my-btn"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="text-center ">
                <small className="text-center">
                  New in Special Sports Academy? Please
                  <Link className="text-blue-700 ml-2" to="/register">
                    Register
                  </Link>
                </small>
              </p>
            </form>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-circle btn-outline mx-auto mb-5"
            >
              <FaGoogle className="text-red-600 "></FaGoogle>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
