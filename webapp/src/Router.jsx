import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth } from "./contexts/Auth";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import User from "./pages/Search/User";
import Chat from "./pages/Chat";
import Room from "./pages/Chat/Room";
import Category from "./pages/Category";
import Me from "./pages/Me";
import Upload from "./pages/Me/Upload";
import Settings from "./pages/Me/Settings";
import Activity from "./pages/Me/Activity";

export default function Router() {
  const { logged, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      {!logged ? (
        <>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/account/new" component={Singup} />
            <Route component={Error} />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/u" component={Search} />
            <Route exact path="/u/:username" component={User} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/chat/:id" component={Room} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/me" component={Me} />
            <Route exact path="/me/upload" component={Upload} />
            <Route exact path="/me/settings" component={Settings} />
            <Route exact path="/me/activity" component={Activity} />
            <Route component={Error} />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}
