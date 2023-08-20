import GroupUpdate from "./GroupUpdate";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Router/AuthProvider";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const { loggedInUsersCount } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/contacts").then((res) => {
      setContacts(res.data);
    });
  }, []);

  return (
    <>
      <div className=" pt-20  flex justify-center ">
        <div className="stats  shadow">
          <div className="stat bg-gradient-to-b from-indigo-500 ">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Contacts</div>
            <div className="stat-value">{contacts.length}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div
            className="stat bg-gradient-to-b from-yellow-500
          "
          >
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value">0{loggedInUsersCount}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat bg-gradient-to-b from-gray-500 ">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Registers</div>
            <div className="stat-value">0{loggedInUsersCount}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <GroupUpdate contacts={contacts}></GroupUpdate>
    </>
  );
};

export default Home;
