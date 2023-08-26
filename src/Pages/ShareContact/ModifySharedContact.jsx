import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Router/AuthProvider";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";

const ModifySharedContact = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the contact ID from the URL parameter
  const [selectedPermission, setSelectedPermission] = useState("read-only"); // State to hold the selected permission
  const [permission, setPermission] = useState({}); // State to hold the selected permission

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const idToken = await user.getIdToken();
        const response = await axios.get(
          `http://localhost:5000/shared-contacts/${id}`, // Use the contact ID from URL
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        setPermission(response.data); // Set the fetched contact data
      } catch (error) {
        console.error("Error fetching shared contact:", error);
      }
    };

    fetchContactData();
  }, [id, user]);

  const handleModifyPermission = async (e) => {
    e.preventDefault();
    try {
      const idToken = await user.getIdToken();
      await axios.put(
        `http://localhost:5000/shared-contacts/${id}`,
        { permissions: selectedPermission }, // Include the selected permission in the PUT request body
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      // Update the UI accordingly
      Swal.fire({
        title: `Your permission for contact ${permission.contactName} has been modified`,
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {
      console.error("Error modifying permission:", error);
      // Show an error alert
      Swal.fire({
        title: "Error",
        text: "An error occurred while modifying permission.",
        icon: "error",
      });
    }
  };

  return (
    <div className="pt-32">
      <div className="border border-primary py-20 mx-5 rounded-xl md:mx-20">
        <h2 className="text-center text-white text-2xl ">
          Contact Name: {permission.contactName}
        </h2>
        <p className="text-center  text-white pb-4 pt-2 text-xl">
          Shared By: {permission.sharedBy}
        </p>

        <form onSubmit={handleModifyPermission}>
          <div className="flex justify-center items-center flex-col sm:flex-row gap-3 sm:gap-0 px-5 md:px-0">
            <select
              className="select select-warning py-2 sm:border-e-0 sm:rounded-e  border-2 bg-black text-white rounded-s-lg  ps-3 w-full sm:w-72"
              value={selectedPermission}
              onChange={(e) => setSelectedPermission(e.target.value)}
            >
              <option value="read-only">Read Only</option>
              <option value="read-write">Read Write</option>
            </select>
            <button
              type="submit"
              className="btn btn-warning btn-outline sm:border-s sm:rounded-s-sm bg-black border-2"
            >
              Modify Permission <RxUpdate className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifySharedContact;
