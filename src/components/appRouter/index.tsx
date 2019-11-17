import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventsList from "../eventsList";
import { Signup } from "../signUp";
import { SignIn } from "../signIn";

export const AppRouter = (): JSX.Element => {
	return (
		<Switch>
			{/* <Route path="/event/:id" component={SingleEventDetails} /> */}
			<Route
				exact
				path="/events"
				render={() => <Redirect to="/events/1" />}
			/>
			<Route
				exact
				path="/events/"
				render={() => <Redirect to="/events/1" />}
			/>
			<Route exact path="/events/:page" component={EventsList} />
			{/* <Route path="/eventEdit/:id" component={EventEdit} /> */}
			<Route exact path="/" render={() => <Redirect to="/events/1" />} />
			<Route exact path="/signup" component={Signup} />

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