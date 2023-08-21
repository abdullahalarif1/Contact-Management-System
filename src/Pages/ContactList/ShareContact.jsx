import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Router/AuthProvider";
import { PiShareFat } from "react-icons/pi";

const ShareContactsForm = ({ contacts }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("read-only");
  const { user } = useContext(AuthContext);

  console.log(selectedContacts);

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

  //   if (user) {
  //     user.getIdToken().then((idToken) => {
  //       console.log("ID Token:", idToken);
  //       // Use this ID token for making authorized requests
  //     });
  //   }

//   const handleShareButtonClick = async () => {
//     try {
//       console.log("Selected Contacts:", selectedContacts); // Log selected contacts
//       console.log("Selected Permission:", selectedPermission); // Log selected permission

//       const idToken = import.meta.env.VITE_FIREBASE_ID_TOKEN;
//       // Make an API request to share selected contacts with selectedPermission
//       const response = await axios.post(
//         "http://localhost:5000/share-contacts",
//         {
//           selectedContacts,
//           selectedPermission,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${idToken}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         console.log("Contacts shared successfully");
//         // You might want to update the UI to indicate success
//         Swal.fire({
//           title: "Contacts shared successfully",
//           showClass: {
//             popup: "animate__animated animate__fadeInDown",
//           },
//           hideClass: {
//             popup: "animate__animated animate__fadeOutUp",
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error sharing contacts:", error);
//       // Handle error and update the UI accordingly
//     }
//   };


const handleShareButtonClick = async () => {
  try {
   

    if (user) {
      const idToken = await user.getIdToken();
      const response = await axios.post(
        "http://localhost:5000/share-contacts",
        {
          selectedContacts,
          selectedPermission,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Contacts shared successfully");
        // You might want to update the UI to indicate success
         Swal.fire({
          title: "Contacts shared successfully",
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
            className="select-warning rounded-s-xl bg-black ps-3  border-2 border-warning border-e-0 text-white w-52 md:w-80"
          >
            <option value="read-only">Read Only</option>
            <option value="read-write">Read Write</option>
          </select>
          <button
            className="btn btn-warning btn-outline border-s rounded-s-sm bg-black  border-2"
            onClick={handleShareButtonClick}
          >
            Share <PiShareFat className="text-xl" />
          </button>
        </div>
      </div>

      {contacts.map((contact) => (
        <div className="px-3 md:px-0" key={contact._id}>
          <div className=" py-2 ">
            <div className="form-control">
              <label className="cursor-pointer  btn btn-warning btn-outline px-5 label">
                <span className="label-text text-white"> {contact.name} </span>
                <span className="label-text text-white">
                  {" "}
                  {contact.number}{" "}
                </span>
                <span className="label-text hidden sm:block text-white"> {contact.email} </span>
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact._id)}
                  onChange={() => handleContactCheckboxChange(contact._id)}
                  className="checkbox checkbox-warning"
                />
              </label>
            </div>
          </div>
          {/* <input
            type="checkbox"
            checked={selectedContacts.includes(contact._id)}
            onChange={() => handleContactCheckboxChange(contact._id)}
          />
          {contact.name} */}
        </div>
      ))}
      {/* <select value={selectedPermission} onChange={handlePermissionChange}>
        <option value="read-only">Read Only</option>
        <option value="read-write">Read Write</option>
      </select>
      <button onClick={handleShareButtonClick}>Share</button> */}
    </div>
  );
};

export default ShareContactsForm;
