import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import "./components/css/main.css";
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
import VideoReportAction from './components/admin/VideoReportAction';
import CommentReportAction from "./components/admin/CommentReportAction";
import Category from "./components/Category";
import CategoryResults from "./components/CategoryResults";
import VideoPreplay from './components/VideoPreplay';
import ForgotPassword from "./components/auth/ResetPassword/ForgotPassword";


const routing = (
    <Router>
        <React.StrictMode>
            <Header />

            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <PrivateRoute exact path="/profile" component={UserProfile} />
                <PrivateRoute exact path="/preplay/:id" component={VideoPreplay} />
                <PrivateRoute exact path="/play/:id" component={GetVideo} />
                <PrivateRoute exact path="/logout" component={Logout} />

                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute
                    exact
                    path="/admin/create"
                    component={CreateVideo}
                />
                {/* for editing/deleting video*/}
                <AdminRoute
                    exact
                    path="/admin/video-details/:id"
                    component={VideoDetails}
                />
                {/* for deleting comment */}
                <AdminRoute
                    exact
                    path="/admin/comment-details/:id"
                    component={CommentDetails}
                />
                <AdminRoute
                    exact
                    path="/admin/video-report-action/:id"
                    component={VideoReportAction}
                />
                <AdminRoute
                    exact
                    path="/admin/comment-report-action/:id"
                    component={CommentReportAction}
                />

                <Route 
                    exact
                    path="/categories"
                    component={Category}
                />
                <Route 
                    exact
                    path="/category/results/:id"
                    component={CategoryResults}
                />
                <Route 
                    exact 
                    path="/reset-password" 
                    component={ForgotPassword} 
                />

                <Route path="*" component={NotFound} />
            </Switch>

            <Footer />
        </React.StrictMode>
    </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
