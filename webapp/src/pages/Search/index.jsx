import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { requestApi } from "../../requestApi";

export default function Search() {
  const { user } = useAuth();
  const [list, setList] = useState(user.people);

  const updateList = async (query) => {
    let response = await requestApi.get("/api/v1/search", {
      q: query,
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
                  src={`http://localhost:8000/${person.profile_pic}`}
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
