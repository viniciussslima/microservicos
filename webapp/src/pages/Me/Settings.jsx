import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import requestApi from "../../requestApi";

export default function Settings() {
  const { user } = useAuth();

  const [tempUser, setTempUser] = useState({
    username: user.user.username,
    firstname: user.user.firstname,
    lastname: user.user.lastname,
    bio: user.user.bio,
  });

  const change = (value, type) => {
    setTempUser((user) => {
      user[type] = value;
      return { ...user };
    });
  };

  const handleSubmit = (value, key) => {
    if (key === "pic") {
      var data = new FormData();
      data.append("file", value);
      requestApi.post("/api/v1/user/picture?id=" + user.user._id, data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
    } else {
      requestApi.post("/api/v1/user/set", {
        _id: user.user._id,
        key: key.toLowerCase().replace(" ", ""),
        value,
      });
    }
  };
  return (
    <>
      <Navbar />
      <br />
      <div className="container" style={{ marginBottom: "15%" }}>
        <h1>Your settings</h1>
        <br />
        <img
          style={{ display: "inline", borderRadius: "50%", width: "20%" }}
          src={`http://localhost:8000/${user.user.profile_pic}`}
          alt="profile-pic"
          id="pfp"
        />
        <input
          id="fileUpload"
          onChange={(event) => handleSubmit(event.target.files[0], "pic")}
          style={{
            marginTop: "5%",
            marginBottom: "5%",
            width: "70%",
            display: "inline",
            marginLeft: "10%",
          }}
          type="file"
          name="file"
          className="form-control"
        />
        <input
          type="text"
          onChange={(event) => change(event.target.value, "username")}
          onBlur={(event) => handleSubmit(event.target.value, "username")}
          className="form-control"
          style={{ marginTop: "5%" }}
          value={tempUser.username}
          placeholder="Username"
        />
        <input
          type="text"
          onChange={(event) => change(event.target.value, "firstname")}
          onBlur={(event) => handleSubmit(event.target.value, "firstname")}
          className="form-control"
          style={{ marginTop: "5%", width: "49.5%", display: "inline" }}
          value={tempUser.firstname}
          placeholder="First name"
        />
        <input
          type="text"
          onChange={(event) => change(event.target.value, "lastname")}
          onBlur={(event) => handleSubmit(event.target.value, "lastname")}
          className="form-control"
          style={{ marginTop: "5%", width: "50%", display: "inline" }}
          value={tempUser.lastname}
          placeholder="Last name"
        />
        <input
          type="text"
          onChange={(event) => change(event.target.value, "bio")}
          onBlur={(event) => handleSubmit(event.target.value, "bio")}
          className="form-control"
          style={{ marginTop: "5%" }}
          value={tempUser.bio}
          placeholder="Bio"
        />
      </div>
      <Tabs />
    </>
  );
}
