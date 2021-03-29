import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { useAuth } from "../../contexts/Auth";
import { useLocation } from "react-router-dom";
import Tabs from "../../components/Tabs";
import { requestChatApi } from "../../requestApi";

export default function Chat() {
  const { user } = useAuth();

  const location = useLocation();

  const [room, setRoom] = useState();
  const [friend, setFriend] = useState({});
  const [socket, setSocket] = useState();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await requestChatApi.get(
          `/room/${location.pathname.split("/")[2]}`,
          {
            headers: { "x-access-token": user.token },
          }
        );
        setRoom(response.data.room);
        setFriend(
          response.data.room.users.find((element) => element._id !== user._id)
        );
      } catch (err) {
        console.log(err);
      }
    };

    getRoom();
  }, [location, user]);

  useEffect(() => {
    if (room) {
      let newSocket = io("http://localhost:3004", {
        query: `room=${room._id}&userId=${user._id}`,
      });
      setSocket(newSocket);

      newSocket.on("new msg", (data) => {
        let newRoom = { ...room };
        newRoom.chats.push(data);
        setRoom(newRoom);
      });
    }
  }, [room, user]);

  const sendMsg = (event) => {
    if (socket && room) {
      var key = event.which || event.keyCode;
      if (key === 13) {
        socket.emit("msg", { txt: event.target.value });
        let newRoom = { ...room };
        newRoom.chats.push({
          txt: event.target.value,
          by: user,
          time: "10:50",
        });
        setRoom(newRoom);
      }
    }
  };

  return (
    <>
      <div
        className="container-fluid navbar-fixed-top box-shadow"
        style={{ backgroundColor: "#fff", marginBottom: "2rem" }}
      >
        <br />
        <center>
          <b>
            <img
              src={`http://localhost:3002${friend.profile_pic}`}
              alt="profile-pic"
              className="logo"
            />
            {friend.username}
          </b>
        </center>
        <br />
      </div>
      <hr />
      <br />
      <div className="container" id="mainPage">
        <ul className="list-group">
          <div className="row">
            <div className="col-md-12">Send a message below!</div>
          </div>
          {room &&
            room.chats &&
            room.chats.map((msg, index) => (
              <ul key={index} className="list-group">
                <li className="list-group-item">
                  <img
                    className="logo"
                    style={{ height: 30, width: 30 }}
                    src={`http://localhost:3002${friend.profile_pic}`}
                    alt="friend-profile-pic"
                  />
                  <a href="/u/<%= room.chats[i].by.username %>">
                    <b>{msg.by.username}</b>
                  </a>
                  <span
                    data-time="<%= room.chats[i].time %>"
                    className="timeSince float-right"
                  >
                    new Date(room.chats[i].time
                  </span>
                  <br />
                  <br />
                  <span className="msg">{msg.txt}</span>
                </li>
              </ul>
            ))}
        </ul>
        <div style={{ display: "none" }} id="typing" className="row">
          <div className="col-md-12">
            <span id="typingWords"></span>
            <span id="wait">.</span>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingBottom: "100px", float: "bottom" }}
      >
        <input
          type="text"
          className="form-control"
          id="msg"
          placeholder="Type something..."
          onKeyUp={sendMsg}
        />
      </div>
      <Tabs />
    </>
  );
}
