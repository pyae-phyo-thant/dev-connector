import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-forms/CreatProfile";
import EditProfile from "../profile-forms/EditProfile";
import Profiles from "../profiles/Profiles";
import AddExperience from "../profile-forms/AddExperience";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Alert from "../layout/Alert";
import AddEducation from "../profile-forms/AddEducation";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
