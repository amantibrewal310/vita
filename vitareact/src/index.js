import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/auth/Login/Login";
import Logout from "./components/auth/Logout";
import UserProfile from "./components/UserProfile";
import Register from "./components/auth/Register";
import GetVideo from "./components/GetVideo";
import Admin from "./components/admin/Admin";
import CreateVideo from "./components/admin/CreateVideo";
import VideoDetails from "./components/admin/VideoDetails";
import CommentDetails from "./components/admin/CommentDetails";
import NotFound from "./components/NotFound";

const routing = (
    <Router>
        <React.StrictMode>
            <Header />

            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <PrivateRoute exact path="/profile" component={UserProfile} />
                <PrivateRoute exact path="/play/:id" component={GetVideo} />
                <PrivateRoute exact path="/logout" component={Logout} />

                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute
                    exact
                    path="/admin/create"
                    component={CreateVideo}
                />
                <AdminRoute
                    exact
                    path="/admin/video-details/:id"
                    component={VideoDetails}
                />
                <AdminRoute
                    exact
                    path="/admin/comment-details/:id"
                    component={CommentDetails}
                />

                <Route path="*" component={NotFound} />
            </Switch>

            <Footer />
        </React.StrictMode>
    </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
