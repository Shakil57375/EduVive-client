import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const { handleRegister, updateUser, handleGoogleSignIn, logOut, setLoader } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleRegister(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUser(data.name, data.photoURL).then(() => {
          const user = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
          };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User Created Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        });
        logOut()
          .then(() => {

          })
        navigate("/login");
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
      
      <div className="min-h-screen bg-base-200 my-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10">
          <motion.div
            initial={{ x: -1550 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
            className="text-center lg:ml-20 ml-0 w-full md:w-1/2 lg:my-0 my-5 lg:text-left"
          >
            <h1 className="text-5xl font-Marcellus text-center font-bold lg:mb-16 mb-5">
              Register now!
            </h1>
            <img
              src="https://i.ibb.co/GMZ8pnb/register-graphics-removebg-preview.png"
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
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="name"
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!#$%&?"])/,
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">password is required</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Your password must include one uppercase special character
                    and minimum 6 character.
                  </p>
                )}
                <p
                  className="absolute top-[330px] right-10"
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.password && (
                  <span className="text-red-600">
                    Confirm password is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  {...register("gender")}
                >
                  <option
                    className="w-full px-3 py-2 border rounded"
                    value="male"
                  >
                    male
                  </option>
                  <option
                    className="w-full px-3 py-2 border rounded"
                    value="female"
                  >
                    female
                  </option>
                  <option
                    className="w-full px-3 py-2 border rounded"
                    value="other"
                  >
                    other
                  </option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="address"
                  {...register("address")}
                  name="address"
                  className="w-full px-3 py-2 border rounded"
                />
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
                  value="Register"
                />
              </div>
              <p className="text-center mb-4">
                <small className="text-center">
                  Already Have an account? Please{" "}
                  <Link className="text-blue-700" to="/login">
                    Login
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

export default Register;
