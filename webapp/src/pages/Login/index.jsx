import React, { useState } from "react";
import logo from "../../images/logo/logo.png";
import { useAuth } from "../../contexts/Auth";

export default function Login() {
  const { login } = useAuth();

  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      login(username, password);
    } catch ({ response }) {
      if (response && response.error) {
        setError(response.error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <a href="/" className="float-left">
          <h2>
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ marginRight: 10 }}
            />
            spruce
          </h2>
        </a>
      </div>
      <br />
      <div className="col-sm-6 col-sm-offset-3">
        {/* <!-- show any messages that come back with authentication --> */}
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <center>
          <button
            onClick={() => (window.location.href = "/api/v1/oauth/google")}
            type="button"
            className="google-button"
          >
            <span className="google-button__icon">
              <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                  id="Shape"
                  fill="#EA4335"
                />
                <path
                  d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                  id="Shape"
                  fill="#FBBC05"
                />
                <path
                  d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                  id="Shape"
                  fill="#4285F4"
                />
                <path
                  d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                  fill="#34A853"
                />
              </svg>
            </span>
            <span className="google-button__text">Sign in with Google</span>
          </button>
          <button
            onClick={() => (window.location.href = "/api/v1/oauth/instagram")}
            type="button"
            className="google-button"
            style={{ backgroundColor: "deeppink", color: "#fff" }}
          >
            <span className="google-button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  fill="#fff"
                />
              </svg>
            </span>
            <span className="google-button__text">Sign in with Instagram</span>
          </button>
        </center>
        <br />
        <br />
        <center>
          <p className="text-muted">OR</p>
        </center>
        {/* <!-- LOGIN FORM --> */}
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-group">
            <label className="text-muted">Username</label>
            <input
              type="text"
              placeholder="your_nick_name"
              className="form-control"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              placeholder="the_secret"
              className="form-control"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-action btn-warning">
            GET ME IN
          </button>
        </form>

        <hr />
        <span className="text-muted">
          No Account? <a href="/account/new">Get one now!</a>
        </span>
        <script type="text/javascript" src="/javascripts/socket.io.js"></script>
        <script type="text/javascript" src="/javascripts/connect.js"></script>
      </div>
    </>
  );
}
