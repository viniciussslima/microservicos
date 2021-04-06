import React from "react";
import logo from "../../images/logo/logo.png";

export default function Navbar() {
  return (
    <>
      <div
        className="container-fluid navbar-fixed-top box-shadow"
        style={{ backgroundColor: "#fff", marginBottom: "2rem" }}
      >
        <a className="float-left" href="/">
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
        <div className="float-right margin-top-20">
          <a href="/u" className="btn btn-link hidden-xs">
            <i className="fa fa-lg fa-search pills"></i>
          </a>
        </div>
      </div>
    </>
  );
}
