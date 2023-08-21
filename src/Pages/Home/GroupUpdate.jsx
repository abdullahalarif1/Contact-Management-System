import  { useState } from "react";

const GroupUpdate = ({ contacts }) => {
  const [selectedGroup, setSelectedGroup] = useState("all"); // Initial state, "all" indicates no specific group selected

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const filteredContacts = selectedGroup === "all" ? contacts
      : contacts.filter((contact) => contact.group === selectedGroup);

  return (
    <div className="py-10 px-5 md:px-20">
      {/* Group contacts */}
      <div className="flex flex-col md:flex-row justify-between items-center md:pt-10 pb-5">
        <h1 className="text-4xl font-extrabold pb-5 md:pb-0 text-white">
          Group <span className="text-warning">Contacts</span>{" "}
        </h1>
        <div className="form-control">
          <select
            name="group"
            value={selectedGroup}
            onChange={handleGroupChange}
            className="select-warning rounded-xl bg-black p-3 border-2 border-warning text-white w-80"
          >
            <option value="all" className="bg-indigo-900">
              All
            </option>
            <option value="Family" className="bg-black">
              Family
            </option>
            <option value="Friends" className="bg-black">
              Friends
            </option>
            <option value="Personal" className="bg-black">
              Personal
            </option>
            <option value="Others" className="bg-black">
              Others
            </option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-white text-center">
          {/* head */}
          <thead>
            <tr className="text-white bg-indigo-900">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Group</th>
              <th>Number</th>
              
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr key={contact._id}>
                <th>{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td className="badge badge-warning mt-6 md:mt-2">
                  {contact.group}
                </td>
                <td>{contact.number}</td>
                
                <td>{contact.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupUpdate;
