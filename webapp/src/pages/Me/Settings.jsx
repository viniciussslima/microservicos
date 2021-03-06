import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import { requestAuthApi } from "../../requestApi";

export default function Settings() {
  const { user } = useAuth();

  const [tempUser, setTempUser] = useState({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    bio: user.bio,
  });
  const [pic, setPic] = useState();

  const change = (value, type) => {
    setTempUser((user) => {
      user[type] = value;
      return { ...user };
    });
  };

  const handleSubmit = async (value, key) => {
    try {
      if (key === "pic") {
        var data = new FormData();
        data.append("file", value);
        await requestAuthApi.post("/user/picture?id=" + user._id, data, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        });
        setPic(URL.createObjectURL(value));
      } else {
        await requestAuthApi.post("/user/set", {
          _id: user._id,
          key: key.toLowerCase().replace(" ", ""),
          value,
        });
      }
    } catch (err) {
      console.log(err);
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
          src={pic || `http://localhost:3002${user.profile_pic}`}
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
          disabled
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
