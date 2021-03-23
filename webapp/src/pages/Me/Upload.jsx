import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import { requestFeedApi } from "../../requestApi";

export default function Upload() {
  const { user } = useAuth();

  const history = useHistory();

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("type", type);
      formData.append("filetoupload", file);

      await requestFeedApi.post("/upload", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          "x-access-token": user.token,
        },
      });

      history.push("/");
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
      <div className="container form-container">
        <form onSubmit={handleSubmit}>
          <div className="gram-card">
            <div className="gram-card-header">
              <img
                src={`http://localhost:8000${user.profile_pic}`}
                alt="profile-pic"
                className="gram-card-user-image"
              />
              <a className="gram-card-user-name" href="/u/">
                {user.username}
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
                    onChange={handleChange}
                    id="file"
                  />
                </div>
                <div id="video-priview"></div>
                {preview ? (
                  <img
                    src={preview}
                    id="blah"
                    alt="post"
                    className="img-responsive"
                  />
                ) : null}
              </center>
            </div>

            <div className="gram-card-content">
              <p>
                <a className="gram-card-content-user" href="/me">
                  {user.username}
                </a>
                <br />
                <input
                  type="text"
                  name="caption"
                  placeholder="some_cool_text"
                  className="form-control"
                  onChange={(event) => setCaption(event.target.value)}
                />
                <select
                  className="form-control"
                  name="type"
                  onChange={(event) => setType(event.target.value)}
                >
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
              >
                <i className="glyphicon glyphicon-thumbs-up"></i> 10
              </button>

              <input
                className="comments-input"
                disabled
                type="text"
                placeholder="Comment here..."
              />
              <button className="footer-action-icons btn btn-primary">
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
