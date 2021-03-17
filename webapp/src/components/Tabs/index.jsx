import React from "react";

export default function Tabs() {
  return (
    <div className="navbar-fixed-bottom tab-div notify_message-success hidden-sm hidden-lg hidden-xl">
      <div className="padding">
        <div className="col-xs-2">
          <center>
            <a href="/" className="as-is">
              <i className="fa fa-lg fa-igloo"></i>
            </a>
          </center>
        </div>
        <div className="col-xs-2">
          <center>
            <a href="/u" className="as-is">
              <i className="fa fa-lg fa-search"></i>
            </a>
          </center>
        </div>
        <div className="col-xs-2">
          <center>
            <a href="/me/upload" className="as-is">
              <i className="fa fa-lg fa-plus"></i>
            </a>
          </center>
        </div>
        <div className="col-xs-2">
          <center>
            <a href="/me/activity" className="as-is">
              <i className="fa fa-lg fa-heart"></i>
            </a>
          </center>
        </div>
        <div className="col-xs-2">
          <center>
            <a href="/me" className="as-is">
              <i className="fa fa-lg fa-user-alt"></i>
            </a>
          </center>
        </div>
      </div>
    </div>
  );
}
