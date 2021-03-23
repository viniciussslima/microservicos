import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { useAuth } from "../../contexts/Auth";
import { requestAuthApi } from "../../requestApi";

export default function Chat() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await requestAuthApi.get("/users", {
          headers: { "x-access-token": user.token },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [user]);
  return (
    <>
      <Navbar />
      <br />
      <div className="container" id="mainPage">
        <ul className="list-group">
          <li className="list-group-item active">
            <strong>Talk to someone</strong>
          </li>
          {users.map((user) => (
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
