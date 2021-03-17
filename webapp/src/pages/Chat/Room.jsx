import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useLocation } from "react-router-dom";
import Tabs from "../../components/Tabs";

export default function Chat() {
  const { user } = useAuth();

  const location = useLocation();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let id = location.pathname.split("/")[2];
    let newIndex = user.people.findIndex((person) => person._id === id);
    setIndex(newIndex);
  }, [location, user]);

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
              src={`http://localhost:8000${user.people[index].profile_pic}`}
              alt="profile-pic"
              className="logo"
            />
            {user.people[index].username}
          </b>
        </center>
        <br />
      </div>

      <br />
      <div className="container" id="mainPage">
        <ul className="list-group">
          {/* <% if(room.chats.length < 1) { %>
        <div className="row">
          <div className="col-md-12">
            Send a message below!
          </div>
        </div>
      <% } %> */}
          {/* <% for(var i=0;i<room.chats.length;i++) {
    if(room.chats[i].by && room.chats[i].by.profile_pic) { %>
      <!--<div className="col-md-4">
        <li className="list-group-item" style="display:inline-block">
          <img className="logo" style=" border-radius: 50%;" src="<%= room.chats[i].by.profile_pic %>">  
        </li>
      </div>
      <div className="col-md-6">
        <li className="list-group-item" style="height:100%; width:100%"> 
            <a style="text-decoration: underline" href="/u/<%= room.chats[i].by._id %>"><b><%= room.chats[i].by.username %></b></a> - <span data-time="<%= room.chats[i].time %>" className="timeSince"><%= timeSince(new Date(room.chats[i].time)) %></span><br> <%= room.chats[i].txt %>
        </li>
      </div>-->
    
    <ul className="list-group">
      <li className="list-group-item">
        <img className="logo" style="height: 30px;width: 30px;" src="<%= room.chats[i].by.profile_pic %>">
        <a href="/u/<%= room.chats[i].by.username %>"><b><%= room.chats[i].by.username %></b></a><span data-time="<%= room.chats[i].time %>" className="timeSince float-right"><%= timeSince(new Date(room.chats[i].time)) %></span>
        <br><br> <span className="msg"><%= room.chats[i].txt %></span> 
        
      </li>
    </ul>
  <% }} %> */}
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
        />
      </div>
      <Tabs />
    </>
  );
}
