import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventsList from "../eventsList";
import SingleEventDetails from "../singleEventDetails";
import EventEdit from "../singleEventDetails/eventEdit";
import Login from "../login";
import { END_POINTS } from "../../endPoints";
export const AppRouter = () => {
	return(
		<Switch>
			<Route path={`${END_POINTS.EVENT_DETAILS}:id`} component={SingleEventDetails} />
			<Route
				exact
				path={END_POINTS.EVENTS_NOSLASH}
				render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />}
			/>
			<Route
				exact
				path={END_POINTS.EVENTS}
				render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />}
			/>
			<Route exact path={`${END_POINTS.EVENTS}:page`} component={EventsList} />
			<Route path="/eventEdit/:id" component={EventEdit} />
			<Route exact path="/" render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />} />
			<Route exact path={END_POINTS.LOGIN} component={Login} />
			<Route exact path={END_POINTS.LOGOUT} render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />} />
			<Route
				path="*"
				atch
				render={() => {
					return "UrlNotFoundError";
				}}
			/>
		</Switch>
	);
};