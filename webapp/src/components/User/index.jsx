import React from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";

export default function User({ user, id, post }) {
  return (
    <>
      <Navbar />
      <br />
      <div className="container" id="mainPage">
        <img
          src={`http://localhost:3002${user.profile_pic}`}
          alt="profile-pic"
          className="logo"
        />
        <a className="gram-card-user-name" href="/me">
          {user.username}
        </a>
        ({user.firstname} {user.lastname})
        <br />
        <br />
        <span className="bio"> {user.bio} </span>
        <br />
        <br />
        {!id ? (
          <div className="float-right margin-right-10">
            <a
              className="btn btn-action btn-sm btn-default"
              href="/me/settings"
            >
              Settings
            </a>
          </div>
        ) : (
          <div className="float-right margin-right-10">
            <a
              className="btn btn-action btn-sm btn-danger"
              href={`/chat/${user._id}`}
            >
              Talk
            </a>
          </div>
        )}
        <br />
        <br />
        <br />
      </div>

      <div className="container">
        <center>
          {(post) => (
            <img
              key={post._id}
              src={`http://localhost:3003${post.static_url}`}
              alt=""
              className="feed-view-img"
            />
          )}
        </center>
      </div>
      <Tabs />
    </>
  );
}
