import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Router/AuthProvider";
import { FcShare } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Shared/Spinner";

const ShareContactsForm = ({ contacts }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("read-only");
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContactCheckboxChange = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.value);
  };

  //D

  const handleShareButtonClick = async () => {
    try {
      if (user) {
        const idToken = await user.getIdToken();

        // Get the user's name
        const userName = user.displayName || "Unknown User"; // Use the user's display name if available, otherwise "Unknown User"

        // Map selected contact IDs to their names
        const selectedContactsData = selectedContacts.map((contactId) => {
          const contact = contacts.find((contact) => contact._id === contactId);
          return { contactId, contactName: contact.name };
        });

        const response = await axios.post(
          "http://localhost:5000/share-contacts",
          {
            selectedContacts: selectedContactsData,
            selectedPermission,
            sharedBy: userName, // Include the user's name in the payload
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Contacts shared successfully");
          // Reset selectedContacts to an empty array
          setSelectedContacts([]);
          // You might want to update the UI to indicate success
          Swal.fire({
            title: "Contact has been shared successfully ",
            icon: "success",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      } else {
        console.error("User not authenticated.");
        // Handle user not authenticated error
      }
    } catch (error) {
      console.error("Error sharing contacts:", error);
      // Handle error and update the UI accordingly
    }

    if (!user) {
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
    }
  };

  return (
    <div className="md:px-20 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center md:pt-10 pb-5">
        <h1 className="text-4xl font-extrabold pb-5 md:pb-0 text-white">
          Share <span className="text-warning">Contacts</span>{" "}
        </h1>

        <div className="flex ">
          <select
            value={selectedPermission}
            onChange={handlePermissionChange}
            className="select select-warning rounded-s-xl bg-black ps-3 rounded-e  border-2 border-warning border-e-0 text-white w-52 md:w-80"
          >
            <option value="read-only">Read Only</option>
            <option value="read-write">Read Write</option>
          </select>
          <button
            className="btn btn-warning btn-outline border-s rounded-s-sm bg-black  border-2"
            onClick={handleShareButtonClick}
          >
            Share <FcShare className="text-xl" />
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {contacts.map((contact) => (
            <div className="px-3 md:px-0" key={contact._id}>
              <div className=" py-2 ">
                <div className="form-control">
                  <label className="cursor-pointer  btn btn-warning btn-outline px-5 label">
                    <span className="label-text text-white">
                      {" "}
                      {contact.name}{" "}
                    </span>
                    <span className="label-text text-white">
                      {" "}
                      {contact.number}{" "}
                    </span>
                    <span className="label-text hidden sm:block text-white">
                      {" "}
                      {contact.email}{" "}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact._id)}
                      onChange={() => handleContactCheckboxChange(contact._id)}
                      className="checkbox checkbox-warning"
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ShareContactsForm;
