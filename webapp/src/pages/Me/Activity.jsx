import React from "react";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";

export default function Me() {
  // const [user, setUser] = useState({ usernma: "teste" });
  return (
    <>
      <Navbar />
      <br />

      <div className="container-fluid jumbotron" id="mainPage">
        <form
          action="/api/v1/notifications/markAsRead"
          className="float-right"
          method="post"
        >
          <button type="submit" className="btn btn-sm btn-success">
            {" "}
            Mark as read{" "}
          </button>
        </form>{" "}
        <br />
        <br />
        <br />
        {/* <% if(activity.length==0) { %> */}
        <center>
          <i className="fa fa-bell"></i> No new notifications, right now!
        </center>
        {/* <% } %> */}
        {/* <ul className="list-group">
            <% for(var i=0;i<activity.length;i++) { %>
                <li className="list-group-item"><%= activity[i].msg %> - <b><%= timeSince(new Date(activity[i].time)) %> ago</b><br></li>
            <% } %>    
         </ul> */}
      </div>

      <Tabs />
    </>
  );
}
