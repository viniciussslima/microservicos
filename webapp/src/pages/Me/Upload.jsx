import React from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";

export default function Upload() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container form-container">
        <form
          action="http://localhost:8000/me/upload"
          method="post"
          encType="multipart/form-data"
        >
          <div className="gram-card">
            <div className="gram-card-header">
              <img
                src={`http://localhost:8000${user.user.profile_pic}`}
                alt="profile-pic"
                className="gram-card-user-image"
              />
              <a className="gram-card-user-name" href="/u/">
                {user.user.username}
              </a>
              <div className="time"></div>
            </div>
            <br />
            <br />
            <div className="gram-card-image">
              <center>
                <div className="upload-btn-wrapper">
                  <button className="btn agradient btn-action whoop" id="post">
                    <i className="fa fa-lg fa-upload"></i> Upload an image.
                  </button>
                  <input
                    type="file"
                    name="filetoupload"
                    onChange="readURL(this);"
                    id="file"
                  />
                </div>
                <div id="video-priview"></div>
                {/* <img src="" id="blah" className="img-responsive" /> */}
              </center>
            </div>

            <div className="gram-card-content">
              <p>
                <a className="gram-card-content-user" href="/me">
                  {user.user.username}
                </a>
                <br />
                <input
                  type="text"
                  name="caption"
                  placeholder="some_cool_text"
                  className="form-control"
                />
                <select className="form-control" name="type">
                  <option>thoughts</option>
                  <option>moments</option>
                  <option>events</option>
                </select>
              </p>

              <br />

              <hr />
            </div>

            <div className="gram-card-footer">
              <button
                className="footer-action-icons likes btn btn-link non-hoverable"
                disabled
                onClick="like('{{_id}}')"
                id="{{_id}}"
              >
                <i className="glyphicon glyphicon-thumbs-up"></i> 10
              </button>

              <input
                className="comments-input"
                id="input_{{_id}}"
                type="text"
                placeholder="Comment here..."
              />
              <button
                className="footer-action-icons btn btn-primary"
                onClick="comment('{{_id}}')"
              >
                <i className="glyphicon glyphicon-file-invoice"></i> Post
              </button>
            </div>
            <br />
            <br />
          </div>
        </form>
      </div>
      <div id="notify_message" className=" notify_message-success">
        <center>You are now a part of spruce!</center>
      </div>
    </>
  );
}
