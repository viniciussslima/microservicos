import React from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { requestApi } from "../../requestApi";

export default function User({ user, id }) {
  const follow = async () => {
    await requestApi.post("/api/v1/follow", {
      _id: user._id,
    });
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="container" id="mainPage">
        <img
          src={`http://localhost:8000${user.profile_pic}`}
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
            <button
              className="btn btn-action btn-sm btn-default"
              onClick={follow}
            >
              Follow
            </button>
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
          {user.posts.map((post) => (
            <img
              key={post._id}
              src={`http://localhost:8000${post.static_url}`}
              alt=""
              className="feed-view-img"
            />
          ))}
        </center>
      </div>
      {/* <div className="container">
        <br />
        <br />
        Developer mode :
        <input type="checkbox" name="dev-mode" id="dev-mode" />
        <br />
        <span className="bio" id="dev-key" style={{ display: "none" }}>
          Enter developer key to verify your account:
          <form onSubmit="window.location.href = '/developer/verify/' + this.getElementsByTagName('input')[0].value; return false">
            <input className="form-control" />
          </form>
        </span>
        <br />
        <br />
      </div> */}
      <Tabs />
    </>
  );
}
