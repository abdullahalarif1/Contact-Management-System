import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Router/AuthProvider";
import axios from "axios";

const useSharedContacts = () => {
  const [sharedContacts, setSharedContacts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchSharedContacts = async () => {
        try {
          const idToken = await user.getIdToken();
          const response = await axios.get(
            "http://localhost:5000/shared-contacts",
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
  return [sharedContacts, setSharedContacts, user];
};

export default useSharedContacts;
