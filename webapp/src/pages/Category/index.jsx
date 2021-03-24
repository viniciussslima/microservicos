import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import { requestFeedApi } from "../../requestApi";

export default function Chat() {
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
        console.log(response.data);
        setUsers(response.data.people);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [user, location]);

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
              console.log(post);
              return (
                <div key={`${person._id}-${post._id}`} className="gram-card">
                  <div className="gram-card-header">
                    <img
                      src={`http://localhost:3002${person.profile_pic}`}
                      alt="profile-pic"
                      className="gram-card-user-image"
                    />
                    <a
                      className="gram-card-user-name"
                      href="/u/<%= people[i].posts[z].author %>"
                    >
                      {post.author}
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
                        // id="img_{{_id}}"
                        alt=""
                        className="img-responsive"
                      />
                    </center>
                  </div>
                  <div className="gram-card-content">
                    <p>
                      <a
                        className="gram-card-content-user"
                        href="/u/undefined_void"
                      >
                        {post.author}
                      </a>
                      {post.caption}
                      <span className="label label-info">{post.category}</span>
                    </p>

                    <p className="comments">
                      {post.comments.length} comment(s).
                    </p>
                    <br />

                    <div className="comments-div">
                      <div>
                        {post.comments.map((comment) => (
                          <React.Fragment
                            key={`${person._id}-${post._id}-${comment._id}`}
                          >
                            <a
                              className="user-comment"
                              href="/user/<%= people[i].posts[z].comments[c].by %>"
                            >
                              {comment.by}
                            </a>
                            {comment.text}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="gram-card-footer">
                    <button
                      className="footer-action-icons likes btn btn-link non-hoverable"
                      //  {{#if disabled}}disabled="true"{{/if}}
                      onClick="like('{{_id}}')"
                      id="{{_id}}"
                    >
                      <i className="far fa-thumbs-up"></i> {post.likes.length}
                    </button>

                    <input
                      className="comments-input"
                      type="text"
                      placeholder="Comment here..."
                    />
                    <button
                      className="footer-action-icons btn btn-link"
                      // onClick="comment('{{_id}}')"
                    >
                      <i className="glyphicon glyphicon-comment"></i>
                    </button>
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
