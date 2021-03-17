import React from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { useAuth } from "../../contexts/Auth";

export default function Chat() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <br />
      <div className="container" id="mainPage">
        <ul className="list-group">
          <li className="list-group-item active">
            <strong>Talk to someone</strong>
          </li>
          {user.people.map((user) => (
            <li key={user._id} className="list-group-item">
              <img
                className="logo"
                src={`http://localhost:8000${user.profile_pic}`}
                alt=""
              />
              <a href={`/chat/${user._id}`} style={{ color: "black" }}>
                {user.username}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Tabs />
    </>
  );
}
