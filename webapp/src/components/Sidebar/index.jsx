import React, { useState, useEffect } from "react";
import "./styles.css";
import { useAuth } from "../../contexts/Auth";
import { requestAuthApi } from "../../requestApi";

export default function Sidbar() {
  const { user, logout } = useAuth();

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
      <br />
      <div
        id="sidebar"
        className="column no-side-pad hidden-xs col-xs-12 col-sm-3 col-lg-2 sidebar-offcanvas"
      >
        <div className="row">
          <div className="col-lg-12 no-pad-left no-pad-right">
            <div className="navTitle"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 no-pad-left no-pad-right">
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary">
                Action
              </li>
              <li className="list-group-item">
                <i className="fa fa-search"></i>&nbsp;
                <a href="/u">search</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-plus"></i>&nbsp;
                <a href="/me/upload">upload</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-paper-plane"></i>&nbsp;
                <a href="/chat">chat</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-heart"></i>&nbsp;
                <a href="/me/activity">activity</a>
              </li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary">
                Categories
              </li>
              <li className="list-group-item">
                <i className="fa fa-mug-hot"></i>&nbsp;
                <a href="/category/moments">moments</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-guitar"></i>&nbsp;
                <a href="/category/events">events</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-brain"></i>&nbsp;
                <a href="/category/thoughts">thoughts</a>
              </li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary">Tasks</li>
              <li className="list-group-item">
                <i className="fa fa-images"></i>&nbsp;
                <a href="/me/">my profile</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-cog"></i>&nbsp;
                <a href="/me/settings/">settings</a>
              </li>
              <li className="list-group-item">
                <i className="fa fa-power-off"></i>&nbsp;
                <span
                  style={{ color: "#18bc9c", cursor: "pointer" }}
                  onClick={logout}
                >
                  log out
                </span>
              </li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary">
                People you might know
              </li>
              {users.map((person) => (
                <li key={person._id} className="list-group-item">
                  <img
                    src={`http://localhost:3002${person.profile_pic}`}
                    className="logo"
                    alt="Profile"
                  />
                  <a href={`/u/${person.username}`}>{person.username}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
