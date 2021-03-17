import React from "react";
import Navbar from "../../components/Navbar";

export default function Profile() {
  // const [user, setUser] = useState({ usernma: "teste" });
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <img src="<%= user.profile_pic %>" alt="profile-pic" className="logo" />
        {/* <a className="gram-card-user-name" href="">
          user.username
        </a> */}
        (user.fistname user.lastname)
        <br />
        <br />
        <span className="bio"> user.bio </span>
        <br />
        <br />
        <div className="float-right margin-right-10">
          <button
            className="btn btn-action btn-sm btn-default"
            // onClick="follow()" ="follow"<% for(var i=0;i<user.followers.length;i++) { %><% if(user.followers[i] == userId) { %> disabled<% } %><% } %>
          >
            Follow
          </button>

          <a
            className="btn btn-action btn-sm btn-danger"
            href="/chat/<%= user.id %>"
          >
            Talk
          </a>
        </div>
        <br />
        <br />
        <br />
      </div>
      <div className="container">
        <center>
          {/* <% for(var x=0;x<user.posts.length;x++) { %>
        <img src="<% if(user.posts[x].static_url) { %><%= user.posts[x].static_url %><% } else {%>/images/logo/logo.png<% } %>" className="feed-view-img">
      <% } %> */}
        </center>
      </div>
      {/* <div id="notify_message" className="notify_message-success">
    	<center>Follow @<%= user.username %>!</center>
    </div> */}
    </>
  );
}
