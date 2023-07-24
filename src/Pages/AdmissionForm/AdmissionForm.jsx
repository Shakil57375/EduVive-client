import { useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AdmissionForm = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log(data);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            studentName,
            studentEmail,
            subjectName,
            phoneNumber,
            dateOfBirth,
            address,
          } = data;
          const studentInfo = {
            studentName,
            studentEmail,
            subjectName,
            phoneNumber,
            dateOfBirth,
            collageName : details?.collegeName,
            collageImage : details?.collegeImage,
            researchWork : details?.researchWork,
            facilities : details?.Facilities,
            events : details?.events,
            sports : details?.sports,
            image: imgURL,
            address,
          };
          console.log(studentInfo);
          axios
            .post("http://localhost:5000/studentInfo", studentInfo)
            .then((data) => {
              console.log("student info.", data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Admitted successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <motion.div
      initial={{ y: 3350 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 50 }}
      className="padding-r-l mt-5"
    >
      <p className="text-center text-4xl font-bold font-Marcellus mt-3 mb-3">
        Hello, {user?.displayName}
      </p>
      <h1 className="text-5xl font-Marcellus text-center text-cyan-500 font-bold mb-10">
        Fill The Form To Get Admitted on {details.collegeName}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex block justify-between mt-3 gap-5 items-center">
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">Name :</label>
            <input
              placeholder="Type here"
              readOnly
              defaultValue={user?.displayName}
              className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("studentName", { required: true })}
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">
              Email :
            </label>
            <input
              placeholder="Type here"
              readOnly
              defaultValue={user?.email}
              className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("studentEmail", { required: true })}
            />
          </div>
        </div>
        <div className="md:flex block justify-between gap-5 items-center">
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">
              Subject Name :
            </label>
            <input
              placeholder="Type Your Subject Name "
              className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("subjectName", { required: true })}
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">
              Phone Number :
            </label>
            <input
              type="number"
              placeholder="Type Your Phone Number"
              className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("phoneNumber", { required: true })}
            />
          </div>
        </div>
        <div className="md:flex block justify-between mt-3 gap-5 items-center">
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">
              Date of Birth :
            </label>
            <input
              placeholder="Type Your Date of Birth"
              type="text"
              className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("dateOfBirth", { required: true })}
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="text-lg font-Poppins font-semibold">
              Upload Image :
            </label>
            <input
              placeholder="Type here"
              type="file"
              className="input mt-2 mr-6 w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
              {...register("image", { required: true })}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-lg font-Poppins font-semibold">
            Address :
          </label>
          <input
            placeholder="Type Your Address"
            type="text"
            className="input mt-2 mr-6 input-bordered input-accent w-full  transition duration-300 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg font-Poppins px-5 py-2.5 mb-2"
            {...register("address", { required: true })}
          />
        </div>
        <div className="w-full text-center my-5">
          <input className="my-btn " value="Add Your Class" type="submit" />
        </div>
      </form>
    </motion.div>
  );
};

export default AdmissionForm;
