import { useContext } from "react";
import { AuthContext } from "../../Router/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { RxUpdate } from "react-icons/rx";
import useSharedContacts from "../components/useSharedContacts";

const PermissionManagement = () => {
  const { user } = useContext(AuthContext);
  const [sharedContacts, setSharedContacts] = useSharedContacts();

  const handleRevokePermission = async (contactId) => {
    try {
      const idToken = await user.getIdToken();
      await axios
        .delete(`http://localhost:5000/shared-contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(() => {
          Swal.fire({
            title: "Contacts Revoked successfully",
            icon: "success",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          const removeFromUI = sharedContacts.filter(
            (s) => s._id !== contactId
          );
          setSharedContacts(removeFromUI);
        });
      // Update the UI accordingly
    } catch (error) {
      console.error("Error revoking permission:", error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className=" text-2xl md:text-3xl pb-16 text-white text-center uppercase  pt-5">
        <span className="text-warning">Permission</span> Management
      </h1>
      {sharedContacts.length ? (
        <>
          {" "}
          <div className="grid md:grid-cols-2 2xl:grid-cols-3  px-3 gap-4  ">
            {sharedContacts.map((contact) => (
              <div
                key={contact._id}
                className="card  bg-black border-2 border-warning text-neutral-content md:w-[450px] 2xl:w-96"
              >
                <div className="card-body items-center text-center ">
                  <h2 className="card-title">
                    Contact Name: {contact.contactName}
                  </h2>
                  <p>Shared By: {contact.sharedBy}</p>
                  <p>Permissions: {contact.permissions}</p>
                  <div className=" justify-center flex gap-3">
                    <Link to={`/modify/${contact._id}`}>
                      <button className="btn btn-warning btn-outline">
                        Modify <RxUpdate className="text-xl" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRevokePermission(contact._id)}
                      className="btn btn-error btn-outline"
                    >
                      Revoke <CiCircleRemove className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mt-10 mx-5  py-10 rounded-xl flex flex-col justify-center items-center gap-2 text-white ">
            <Link to="/">
              <IoIosAddCircleOutline className="hover:text-indigo-500 text-warning text-7xl text-opacity-80" />
            </Link>
            <h4 className=" ">
              Please shared a <span className="text-warning">Contact</span>{" "}
              first
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default PermissionManagement;
