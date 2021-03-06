import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { useAuth } from "../../contexts/Auth";
import { useLocation } from "react-router-dom";
import Tabs from "../../components/Tabs";
import { requestChatApi } from "../../requestApi";

let socket;

export default function Chat() {
  const { user } = useAuth();

  const location = useLocation();

  const [room, setRoom] = useState();
  const [friend, setFriend] = useState({});

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
      socket = io("http://localhost:3004", {
        query: `room=${room._id}&userId=${user._id}`,
      });

      socket.once("new msg", (data) => {
        console.log(data);
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
        event.target.value = "";
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
          {room && room.chats && room.chats.length ? (
            room.chats.map((msg, index) => {
              const { profile_pic } = room.users.find(
                (user) => user.username === msg.by.username
              );
              return (
                <ul key={index} className="list-group">
                  <li className="list-group-item">
                    <img
                      className="logo"
                      style={{ height: 30, width: 30 }}
                      src={`http://localhost:3002${profile_pic}`}
                      alt="friend-profile-pic"
                    />
                    <span>
                      <b>{msg.by.username}</b>
                    </span>
                    <span className="timeSince float-right">
                      {new Date(room.chats[index].time).toLocaleDateString()}
                    </span>
                    <br />
                    <br />
                    <span className="msg">{msg.txt}</span>
                  </li>
                </ul>
              );
            })
          ) : (
            <div className="row">
              <div className="col-md-12">Send a message below!</div>
            </div>
          )}
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
