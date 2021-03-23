import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Tabs from "../../components/Tabs";
import { requestFeedApi } from "../../requestApi";

export default function Home() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await requestFeedApi.get("/", {
          headers: { "x-access-token": user.token },
        });
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [user]);

  const comment = async (postId, author, event) => {
    var key = event.which || event.keyCode;
    if (key === 13) {
      try {
        await requestFeedApi.post(
          "/comment",
          {
            author: author,
            by: user.username,
            text: event.target.value,
            _id: postId,
          },
          {
            headers: { "x-access-token": user.token },
          }
        );
        setPosts((posts) => {
          let post = posts.find((post) => post.post._id === postId);
          post.post.comments.push({
            author: author,
            by: user.username,
            text: event.target.value,
          });
          console.log(post.post.comments);

          return [...posts];
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const like = async (postId, author, likes) => {
    try {
      await requestFeedApi.post(
        "/like",
        {
          author: author,
          _id: postId,
        },
        {
          headers: { "x-access-token": user.token },
        }
      );

      setPosts((posts) => {
        let post = posts.find((post) => post.post._id === postId);
        post.post.likes.push(user.username);
        return [...posts];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div id="mainPage">
        <Sidebar />
        <div
          className="column col-xs-12 col-sm-9 col-lg-10"
          style={{ margin: "auto" }}
          id="main"
        >
          <ul className="list-group">
            <li className="list-group-item list-group-item-primary">
              <br />
              <img
                src={`http://localhost:8000${user.profile_pic}`}
                alt="profile-pic"
                className="gram-card-user-image"
              />
              <a className="gram-card-user-name" href="/me">
                {user.username}'s Dashboard
              </a>
              <br />
              <span className="label label-info" style={{ float: "right" }}>
                last login {user.lastSeen}
              </span>
              <br />
            </li>
          </ul>
          {posts.map((obj, index) => (
            <div key={index} className="gram-card">
              <div className="gram-card-header">
                <img
                  src={`http://localhost:8000${obj.user.profile_pic}`}
                  alt="profile-pic"
                  className="gram-card-user-image lozad"
                />
                <a
                  className="gram-card-user-name"
                  href={`/u/${obj.post.authorID}`}
                >
                  {obj.post.author}
                </a>
                <div className="dropdown gram-card-time">
                  {/* <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="glyphicon glyphicon-option-vertical"></i>
                  </a> */}
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <a href={obj.post.static_url}>
                        <i className="fa fa-share"></i> View
                      </a>
                    </li>
                    {obj.post.author === user.username ? (
                      <>
                        <li>
                          <a
                            href={`http://localhost:8000/me/post/${obj.post._id}`}
                          >
                            <i className="fa fa-cog"></i> Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href={`http://localhost:8000/me/post/delete/${obj.post._id}`}
                          >
                            <i className="fa fa-trash"></i> Delete
                          </a>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
                <div className="time">{obj.post.timeago}</div>
              </div>
              <br />
              <br />
              <div className="gram-card-image">
                <center>
                  {obj.post.static_url ? (
                    obj.post.type === "png" ||
                    obj.post.type === "jpg" ||
                    obj.post.type === "jpeg" ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`http://localhost:8000${obj.post.static_url}`}
                        className="progressive replace"
                      >
                        <img
                          src={`http://localhost:3003${obj.post.static_url}`}
                          alt=""
                        />
                      </a>
                    ) : null
                  ) : (
                    <video
                      author={obj.post.author}
                      src={obj.post.static_url}
                      id={obj.post._id}
                      className="post img-responsive"
                      controls
                    ></video>
                  )}
                </center>
              </div>
              <div className="gram-card-content">
                <p>
                  <a
                    className="gram-card-content-user"
                    href="/u/undefined_void"
                  >
                    {obj.post.author}{" "}
                  </a>
                  {obj.post.caption}
                  <span className="label label-info">{obj.post.category}</span>
                </p>
                <p className="comments">
                  {obj.post.comments.length} comment(s).
                </p>
                <br />
                <div className="comments-div">
                  {obj.post.comments.map((comment, index) => (
                    <React.Fragment key={`${comment.by}-${index}`}>
                      <a className="user-comment" href={`/u/${comment.by}`}>
                        {comment.by}{" "}
                      </a>
                      {comment.text}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <hr />
              <div className="gram-card-footer">
                <button
                  disabled={obj.post.likes.includes(user.username)}
                  onClick={() =>
                    like(obj.post._id, obj.post.author, obj.post.likes)
                  }
                  className="footer-action-icons likes btn btn-link non-hoverable like-button-box"
                  id={`${obj.post._id}-like`}
                >
                  <i className="far fa-thumbs-up"></i> {obj.post.likes.length}
                </button>
                <input
                  id={obj.post._id}
                  className="comments-input comment-input-box"
                  type="text"
                  placeholder="Click enter to comment here..."
                  onKeyUp={(event) =>
                    comment(
                      obj.post._id,
                      obj.post.author,
                      event,
                      obj.post.comments
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Tabs />
    </>
  );
}
