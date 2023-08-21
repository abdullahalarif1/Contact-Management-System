import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Router/AuthProvider";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";

const MyContact = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/contacts/email/${user?.email}`)
      .then((res) => {
        setContacts(res.data);
      });
  }, [user?.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Contact has been deleted.", "success");
        axios.delete(`http://localhost:5000/contacts/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remaining = contacts.filter((t) => t._id !== _id);
            setContacts(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="py-28 px-5 md:py-28 md:px-20">
      <h1 className="text-3xl text-white text-center uppercase  pb-10 ">
        <span className="text-warning">My Contact </span>List
      </h1>
      <Link to={"/addContacts"}>
        <h1 className="btn btn-outline btn-primary mb-5 px-5">
          Add <AiOutlinePlus />
        </h1>
      </Link>
      <div className="overflow-x-auto ">
        <table className="  table w-full text-white text-center">
          {/* head*/}
          <thead>
            <tr className="text-white bg-indigo-900  ">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Group</th>
              <th>Number</th>
              <th>Delete & Update</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <th>{index + 1}</th>

                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td className="badge badge-warning">{contact.group}</td>
                <td>{contact.number}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="border p-2 rounded-full btn-error btn-outline"
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <Link to={`/updateContacts/${contact._id}`}>
                    <button className="border p-2 rounded-full btn-warning btn-outline ">
                      <RxUpdate />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContact;
