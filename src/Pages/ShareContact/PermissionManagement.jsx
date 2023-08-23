import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Router/AuthProvider";
import axios from "axios";

const PermissionManagement = () => {
  const { user } = useContext(AuthContext);
  const [sharedContacts, setSharedContacts] = useState([]);
  console.log(sharedContacts);

  useEffect(() => {
    if (user) {
      const fetchSharedContacts = async () => {
        try {
          const idToken = await user.getIdToken();
          const response = await axios.get(
            "http://localhost:5000/share-contacts",
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          setSharedContacts(response.data);
        } catch (error) {
          console.error("Error fetching shared contacts:", error);
        }
      };

      fetchSharedContacts();
    }
  }, [user]);

  const handleModifyPermission = async (contactId, newPermission) => {
    try {
      const idToken = await user.getIdToken();
      await axios.put(
        `http://localhost:5000/shared-contacts/${contactId}`,
        { permissions: newPermission },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      // Update the UI accordingly
    } catch (error) {
      console.error("Error modifying permission:", error);
    }
  };

  const handleRevokePermission = async (contactId) => {
    try {
      const idToken = await user.getIdToken();
      await axios.delete(`http://localhost:5000/shared-contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      // Update the UI accordingly
    } catch (error) {
      console.error("Error revoking permission:", error);
    }
  };

  return (
    <>
      <h2>Permission Management</h2>
      <div className="grid md:grid-cols-3 gap-5 px-3 pt-20 md:px-20">
        {sharedContacts.map((contact) => (
          <>
            <div
              key={contact._id}
              className="card  bg-black border-2 border-warning text-neutral-content"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  Contact Name: {contact.contactName}
                </h2>
                <p>Shared By: {contact.sharedBy}</p>
                <p>Permissions: {contact.permissions}</p>
                <div className=" justify-center flex gap-3">
                  <button
                    onClick={() =>
                      handleModifyPermission(contact._id, "read-write")
                    }
                    className="btn btn-warning btn-outline"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleRevokePermission(contact._id)}
                    className="btn btn-error btn-outline"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default PermissionManagement;
