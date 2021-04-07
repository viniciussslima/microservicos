import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { useAuth } from "../../contexts/Auth";
import { requestFeedApi } from "../../requestApi";

export default function User({ user, id }) {
  const { user: authUser } = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      console.log(user);
      try {
        const response = await requestFeedApi.get(`/posts/${user.username}`, {
          headers: { "x-access-token": authUser.token },
        });
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [authUser, user]);

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
          {posts &&
            posts.map((post) => (
              <img
                key={post._id}
                src={`http://localhost:3003${post.static_url}`}
                alt=""
                className="feed-view-img"
              />
            ))}
        </center>
      </div>
      <Tabs />
    </>
  );
}
