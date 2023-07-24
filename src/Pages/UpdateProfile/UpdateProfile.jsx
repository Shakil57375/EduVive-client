import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateProfile = () => {

    const id = useParams();
    console.log(id.id)
    const { register, handleSubmit, reset } = useForm();
    const profiledata = useLoaderData();
    console.log(profiledata);
    const navigate = useNavigate();

    const onSubmit = (data) => { 
        console.log(data);
        const { studentName, studentEmail, collageName, address, id} = data;
        const UpdateProfile = { studentName, studentEmail, collageName, address };

        axios.put(`https://collage-booking-server-six.vercel.app/updateprofile/${id}`, UpdateProfile)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Profile updated successfully.',
                        showConfirmButton: true,
                        // timer: 1500
                    });
                    navigate('/profile');                   
                }
            })
    }

    return (
        <div className='flex min-h-full flex-col justify-center px-4 py-8 lg:px-8'>

            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-7 rounded-lg shadow-2xl shadow-gray-500 dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight gradient-text">Update Profile</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-8'>
                    <div>
                        <label htmlFor="name" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Name</label>
                        <div className="input_group ">
                            <input
                                type="text"
                                // readOnly
                                defaultValue={profiledata?.studentName}
                                name='name'
                                placeholder='Name'
                                {...register("studentName", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Email</label>
                        <div className="input_group ">
                            <input
                                type="email"
                                // readOnly
                                defaultValue={profiledata?.studentEmail}
                                name='email'
                                placeholder='Email'
                                {...register("studentEmail", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div className='hidden'>
                        <label htmlFor="id" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Email</label>
                        <div className="input_group ">
                            <input
                                placeholder="Type here"
                                value={id.id}
                                className="input_text"
                                {...register("id")}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Name Of Colleges</label>
                        <div className="input_group ">
                            <select
                                required
                                className="input_text"
                                {...register("collageName", { required: true })}
                            >
                                <option defaultValue={profiledata?.collageName}>{profiledata?.collageName}</option>
                                <option value="Harvard University">Harvard University</option>
                                <option value="Stanford University">Stanford University</option>
                                <option value="University of Cambridge">University of Cambridge</option>
                                <option value="University of Chicago">University of Chicago</option>
                                <option value="Massachusetts Institute of Technology">Massachusetts Institute of Technology</option>
                                <option value="University of Oxford">University of Oxford</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Address</label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='candidateAddress'
                                defaultValue={profiledata?.address}
                                placeholder='Candidate Address'
                                {...register("address", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>

                    {/* login buttons */}
                    <div className="mt-6">
                        <button type='submit' className="my-btn">
                            Submit Admission Form
                        </button>
                    </div>

                </form>


            </div>

        </div>
    );
};

export default UpdateProfile;
