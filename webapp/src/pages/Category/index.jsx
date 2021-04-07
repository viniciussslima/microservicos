import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import { requestFeedApi } from "../../requestApi";

export default function Category() {
  const { user } = useAuth();

  const location = useLocation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await requestFeedApi.get(
          `/${location.pathname.split("/")[2]}`,
          {
            headers: { "x-access-token": user.token },
          }
        );
        console.log(response.data.people);
        setUsers(response.data.people);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [user, location]);

  const comment = async (postId, author, event) => {
    var key = event.which || event.keyCode;
    if (key === 13 && event.target.value.length) {
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

        const newUsers = [...users];

        let postIndex = 0;
        let post = newUsers.find((user) =>
          user.posts.find((post, index) => {
            postIndex = index;
            return post._id === postId;
          })
        );
        console.log(post);
        post.posts[postIndex].comments.push({
          author: author,
          by: user.username,
          text: event.target.value,
        });

        setUsers(newUsers);

        event.target.value = "";
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

      const newUsers = [...users];

      let post = newUsers.find((user) =>
        user.posts.find((post) => post._id === postId)
      );
      post.posts.likes.push(user.username);

      setUsers(newUsers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container-fluid form-container" id="main">
        {users.map((person) =>
          person.posts.map((post) => {
            if (post.category === location.pathname.split("/")[2]) {
              return (
                <div key={`${person._id}-${post._id}`} className="gram-card">
                  <div className="gram-card-header">
                    <img
                      src={`http://localhost:3002${person.profile_pic}`}
                      alt="profile-pic"
                      className="gram-card-user-image"
                      style={{ marginRight: 10 }}
                    />
                    <a
                      className="gram-card-content-user"
                      href={`/u/${post.author}`}
                    >
                      {post.author}{" "}
                    </a>
                    <div className="dropdown gram-card-time">
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                          <a href="<%= people[i].posts[z].static_url %>">
                            <i className="fa fa-share"></i> View
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="time"> {post.timeago} </div>
                  </div>
                  <br />
                  <br />
                  <div className="gram-card-image">
                    <center>
                      <img
                        src={`http://localhost:3003${post.static_url}`}
                        alt=""
                        className="img-responsive"
                      />
                    </center>
                  </div>
                  <div className="gram-card-content">
                    <p>
                      <a
                        className="gram-card-content-user"
                        href={`/u/${post.author}`}
                      >
                        {post.author}{" "}
                      </a>
                      {post.caption}
                      <span className="label label-info">{post.category}</span>
                    </p>

                    <p className="comments">
                      {post.comments.length} comment(s).
                    </p>
                    <br />

                    <div className="comments-div">
                      {post.comments.map((comment, index) => (
                        <React.Fragment
                          key={`${person._id}-${post._id}-${index}`}
                        >
                          <a className="user-comment" href={`/u/${comment.by}`}>
                            {comment.by}{" "}
                          </a>
                          {comment.text}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                    <hr />
                  </div>
                  <div className="gram-card-footer">
                    <button
                      disabled={post.likes.includes(user.username)}
                      onClick={() => like(post._id, post.author, post.likes)}
                      className="footer-action-icons likes btn btn-link non-hoverable like-button-box"
                      id={`${post._id}-like`}
                    >
                      <i className="far fa-thumbs-up"></i> {post.likes.length}
                    </button>

                    <input
                      className="comments-input"
                      type="text"
                      placeholder="Comment here..."
                      onKeyUp={(event) =>
                        comment(post._id, post.author, event, post.comments)
                      }
                    />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <br />
      <br />
      <div id="notify_message" className=" notify_message-success">
        <center>You are now a part of spruce!</center>
      </div>
    </>
  );
}
