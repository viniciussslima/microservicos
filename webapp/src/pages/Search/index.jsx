import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { requestAuthApi } from "../../requestApi";

export default function Search() {
  const { user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await requestAuthApi.get("/users", {
          headers: { "x-access-token": user.token },
        });
        setList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [user]);

  const updateList = async (query) => {
    let response = await requestAuthApi.get(`/users/?text=${query}`, {
      headers: { "x-access-token": user.token },
    });

    setList(response.data);
  };
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <input
          type="text"
          className="form-control"
          onKeyUp={(event) => updateList(event.target.value)}
          placeholder="Search here..."
        />
        <br />
        <ul className="list-group">
          <li className="list-group-item list-group-item-primary">
            Total Users
          </li>
          <li className="list-group-item">
            Total <b>{list.length}</b> user(s) have signed up.
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item list-group-item-primary">Results</li>
          <div id="user-list">
            {list.map((person, index) => (
              <li key={index} className="list-group-item">
                <img
                  src={`http://localhost:3002${person.profile_pic}`}
                  alt="profile-pic"
                  className="logo"
                />
                <b>
                  <a href={`/u/${person.username}`} id="list-username">
                    {person.username}
                  </a>
                </b>
              </li>
            ))}{" "}
          </div>
        </ul>

        <div id="notify_message" className=" notify_message-success">
          <center>Search for people on spruce...</center>
        </div>
      </div>
      <Tabs />
      {/* <script type="text/javascript" src="/javascripts/dom.js"></script>
   <script type="text/javascript" src="/javascripts/search.js"></script> */}
    </>
  );
}
