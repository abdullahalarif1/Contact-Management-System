import { Link } from "react-router-dom";
import useSharedContacts from "../components/useSharedContacts";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../Router/AuthProvider";

const SharedContactList = () => {
  const [sharedContacts] = useSharedContacts();
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(sharedContacts);

  return (
    <div className="py-28 px-5  ">
      <h1 className=" text-2xl md:text-3xl pb-10 text-white text-center uppercase ">
        Shared <span className="text-warning">Contact</span> list
      </h1>
      {sharedContacts.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full text-white text-center">
              <thead>
                <tr className="text-white bg-indigo-900">
                  <th>Contact Owner</th>
                  <th>Owner Email</th>
                  <th>Contact Name</th>
                  <th>Access Level</th>
                </tr>
              </thead>
              <tbody>
                {sharedContacts.map((sharedContact, index) => (
                  <tr key={index}>
                    <td>{sharedContact.sharedBy}</td>
                    <td>{user?.email}</td>
                    <td>{sharedContact.contactName}</td>
                    <td>{sharedContact.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default SharedContactList;
