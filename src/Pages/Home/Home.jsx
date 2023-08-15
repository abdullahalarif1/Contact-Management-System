import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
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
    const newClass = {
      title: data.title,
      description: data.description,
      status: data.status,
      date: data.date,
    };
    console.log(newClass);
    reset();

    // post mongo server
    axios
      .post("https://task-management-server-woad.vercel.app/tasks", newClass)
      .then((res) => {
        console.log("successfully posted:", res);
        if (res.data.insertedId) {
          toast("Successfully added Task");
        }
      })
      .catch((error) => {
        console.log("Error posting to the server:", error);
      });
  };

  return (
    <div className="  font-mono px-12 py-20">
      <h1 className="text-3xl text-white text-center uppercase  py-10 font-mono">
        <span className="text-warning">Contact </span>Management
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card   mx-auto  shadow-2xl text-white border-2 border-warning">
          <div className="card-body grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input border-2 bg border-warning input-bordered rounded-lg "
                name="Name"
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
                placeholder="Email"
                className="input border-2 bg border-warning input-bordered rounded-lg "
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
                className="input border-2 bg border-warning input-bordered rounded-lg "
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
                className="rounded-lg border-warning bg input input-bordered border-2"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                {...register("description")}
                className="rounded-lg bg  p-4  border-2 border-warning "
                placeholder="Type here"
                cols="30"
                rows="5"
              ></textarea>
            </div>
           
          </div>
          

          <div className=" mt-6 mx-8">
            <button
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

export default Home;
