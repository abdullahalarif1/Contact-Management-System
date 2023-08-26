import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateContacts = () => {
  const loader = useLoaderData();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  console.log(loader);

  const handleUpdate = (data) => {
    const updateContacts = {
      name: data.name,
      email: data.email,
      number: data.number,
      description: data.description,
      group: data.group,
    };
    console.log(updateContacts);

    // update task
    axios
      .put(`http://localhost:5000/contacts/${loader._id}`, updateContacts)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "contact updated successfully",
            icon:'success',
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
  };
  return (
    <div className="bg min-h-screen shadow-xl pt-20 px-5 md:p-24">
      <h1 className="text-3xl text-white text-center uppercase  pb-10">
        <span className="text-warning"> Contact</span> Update
      </h1>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="card  max-w-md mx-auto  shadow-2xl text-white border-2 border-warning">
          <div className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input border bg-black border-warning input-bordered rounded-lg"
                name="name"
                defaultValue={loader?.name}
                {...register("name")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Email*</span>
              </label>
              <input
                type="email"
                defaultValue={loader?.email}
                placeholder="Email"
                className="input border bg-black border-warning input-bordered rounded-lg "
                name="email"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Number*</span>
              </label>
              <input
                type="number"
                placeholder="Number"
                className="input border bg-black border-warning input-bordered rounded-lg "
                name="number"
                defaultValue={loader?.number}
                required
                {...register("number")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Group</span>
              </label>
              <select
                name="group"
                type="text"
                {...register("group")}
                className=" select-warning rounded-lg bg-black  p-4  border border-warning w-full  "
                defaultValue={loader?.group}
              >
                <option disabled selected className="bg-black-indigo-900">
                  All
                </option>
                <option className="  bg-black-indigo-800">Family</option>
                <option className="bg-black  bg-black-indigo-800">Friends</option>
                <option className="bg-black  bg-black-indigo-800">Personal</option>
                <option className="bg-black  bg-black-indigo-800">Others</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                {...register("description")}
                className="  p-4 bg-black border border-warning  rounded-lg "
                placeholder="Type here"
                cols="30"
                rows="5"
                defaultValue={loader?.description}
              ></textarea>
            </div>
          </div>

          <div className="  mx-8">
            <button
              type="submit"
              className="btn btn-outline btn-warning border-2  w-full mb-10"
            >
              Update Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateContacts;
