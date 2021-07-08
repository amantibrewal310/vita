import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import './components/css/main.css';
import App from './App';
import Footer from './components/Footer';
import Login from './components/auth/Login/Login';
import Logout from './components/auth/Logout';
import UserProfile from './components/UserProfile';
import Register from './components/auth/Register';
import GetVideo from './components/GetVideo';
import Admin from './components/admin/Admin';
import CreateVideo from './components/admin/CreateVideo';
import VideoDetails from './components/admin/VideoDetails';
import CommentDetails from './components/admin/CommentDetails';
import NotFound from './components/NotFound';
import VideoReportAction from './components/admin/VideoReportAction';
import CommentReportAction from './components/admin/CommentReportAction';
import Category from './components/Category';
import CategoryResults from './components/CategoryResults';
import VideoPreplay from './components/VideoPreplay';
import ForgotPassword from './components/auth/ResetPassword/ForgotPassword';
import Subscription from './components/Subscription';
import VideoSearch from './components/VideoSearch';
import Home from './Home';
import AuthenticatedRoute from './Routes/AuthenticatedRoute';
import MembershipList from './components/admin/MembershipList';
import VideosList from './components/admin/VideosList';
import categoryList from './components/admin/categories/CategoryList';
import ReportReasonList from './components/admin/reportReasons/ReportReasonList';
import CategoryBarGraph from './components/forGraphs/CategoryBarGraph';

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
				{/* AUTHENTICATED ROUTES */}

				<AuthenticatedRoute exact path='/login' component={Login} />
				<AuthenticatedRoute
					exact
					path='/register'
					component={Register}
				/>

				{/* PRIVATE ROUTES */}

				{/* TODO: only subscribed user can go to /home */}
				<PrivateRoute exact path='/home' component={App} />
				<PrivateRoute exact path='/profile' component={UserProfile} />
				<PrivateRoute
					exact
					path='/preplay/:id'
					component={VideoPreplay}
				/>
				<PrivateRoute exact path='/play/:id' component={GetVideo} />
				<PrivateRoute exact path='/logout' component={Logout} />
				<PrivateRoute exact path='/search' component={VideoSearch} />
				<PrivateRoute exact path='/categories' component={Category} />
				<PrivateRoute
					exact
					path='/category/results/:id'
					component={CategoryResults}
				/>

				{/* ADMIN ROUTES */}

				<AdminRoute exact path='/admin' component={Admin} />
				<AdminRoute
					exact
					path='/admin/create'
					component={CreateVideo}
				/>
				{/* for editing/deleting video*/}
				<AdminRoute
					exact
					path='/admin/video-details/:id'
					component={VideoDetails}
				/>
				{/* for deleting comment */}
				<AdminRoute
					exact
					path='/admin/comment-details/:id'
					component={CommentDetails}
				/>
				<AdminRoute
					exact
					path='/admin/video-report-action/:id'
					component={VideoReportAction}
				/>
				<AdminRoute
					exact
					path='/admin/comment-report-action/:id'
					component={CommentReportAction}
				/>
				<AdminRoute
					exact
					path='/admin/videos/list'
					component={VideosList}
				/>

				{/* OPEN TO ALL ROUTES */}
				<Route exact path='/' component={Home}></Route>
				<Route
					exact
					path='/reset-password'
					component={ForgotPassword}
				/>
				<Route exact path='/subscribe' component={Subscription} />
				<Route
					exact
					path='/admin/membership'
					component={MembershipList}
				/>

				<AdminRoute
					exact
					path='/admin/category/list'
					component={categoryList}
				/>

				<AdminRoute
					exact
					path='/admin/report-reason'
					component={ReportReasonList}
				/>

				<Route 
					exact
					path='/category-graph'
					component = {CategoryBarGraph}
				/>

				{/* 404 */}
				<Route path='*' component={NotFound} />
			</Switch>

			<Footer />
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
