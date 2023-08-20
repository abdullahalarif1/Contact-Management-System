import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/contacts").then((res) => {
      setContacts(res.data);
    });
  }, []);

  // search text by name
  const handleSearch = () => {
    fetch(`http://localhost:5000/contactsSearchByName/${searchText}`)
      .then((res) => res.json())
      .then((data) => setContacts(data));
  };

  // export json data
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Contact List", 10, 10);

    const jsonData = JSON.stringify(contacts, null, 2);
    const lines = doc.splitTextToSize(jsonData, doc.internal.pageSize.width - 20);
    doc.text(10, 20, lines);

    doc.save("contacts.pdf");
  };

  return (
    <div className="py-14 px-5 md:p-20">
      <h1 className="text-3xl text-white text-center uppercase  pt-5">
        <span className="text-warning">All Contact </span>List
      </h1>
      <div className=" flex flex-col-reverse items-center  md:flex md:justify-between md:flex-row  md:items-center ">
        <div className="w-28"></div>
        <div className="form-control my-7 md:my-10">
          <div className="input-group">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search…"
              className="input text-white bg-black input-bordered border-2 border-warning"
            />
            <button
              onClick={handleSearch}
              className="btn btn-square btn-warning "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="text-white btn btn-warning mt-10 md:mt-0 btn-outline border-2"
        >
          Export <BiExport className="text-lg" />
        </button>
      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full text-white text-center">
          {/* head*/}
          <thead>
            <tr className="text-white bg-indigo-900">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Group</th>
              <th>Number</th>
              <th>Time & Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <th>{index + 1}</th>

                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td className="badge badge-warning mt-6 md:mt-2">
                  {contact.group}
                </td>
                <td>{contact.number}</td>
                <td>{contact.date}</td>
                <td>{contact.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContact;
