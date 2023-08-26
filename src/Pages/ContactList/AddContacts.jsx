import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Router/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddContacts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const onSubmit = (data) => {
    // Create a new class object with the form data
    const newContact = {
      name: data.name,
      description: data.description,
      email: data.email,
      number: data.number,
      date: data.date,
      group: data.group,
    };
    console.log(newContact);
    reset();

    // post mongo server
    axios
      .post("http://localhost:5000/contacts", newContact)
      .then((res) => {
        console.log("successfully posted:", res);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Successfully added Contact",
            icon: "success",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      })
      .catch((error) => {
        console.log("Error posting to the server:", error);
      });
  };

  const handleButton = () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please log in First.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  return (
    <div className="  px-3 md:px-12 py-20">
      <h1 className="text-3xl text-white text-center uppercase  py-10 ">
        <span className="text-warning">Contact </span>Management
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card   mx-auto  shadow-2xl text-white border  border-warning">
          <div className="card-body grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                defaultValue={user?.displayName}
                className="input border bg-black border-warning input-bordered rounded-lg "
                name="name"
                required
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Email*</span>
              </label>
              <input
                type="email"
                defaultValue={user?.email}
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
                required
                {...register("number")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Date</span>
              </label>
              <input
                {...register("date")}
                type="date"
                value={currentDate}
                className="rounded-lg border-warning bg-black input input-bordered border"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                {...register("description")}
                className="rounded-lg bg-black  p-4  border border-warning "
                placeholder="Type here"
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Group</span>
              </label>
              <select
                name="group"
                type="text"
                {...register("group")}
                className=" select-warning rounded-lg bg-black  p-4  border border-warning w-full  "
              >
                <option disabled selected className="bg-indigo-900">
                  Not-Selected
                </option>
                <option className="bg-black">Family</option>
                <option className="bg-black">Friends</option>
                <option className="bg-black">Personal</option>
                <option className="bg-black">Others</option>
              </select>
            </div>
          </div>

          <div className="mt-6 mx-8">
            <button
              onClick={handleButton}
              type="submit"
              className="btn btn-warning rounded-lg btn-outline border-2 w-full mb-10"
            >
              Add New Contact
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContacts;
