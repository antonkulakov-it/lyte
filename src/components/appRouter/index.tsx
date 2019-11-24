import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { EventsList } from "../eventsList";
import SingleEventDetails from "../singleEventDetails";
import { EventEdit } from "../singleEventDetails/eventEdit";
import Login from "../login";
import { END_POINTS } from "../../endPoints";
import { CategoriesList } from "../categoriesList";
import { OrganizersList } from "../organizersList";
import { CategoryEdit } from "../categoryEdit";
import { OrganizerEdit } from "../organizerEdit";
export const AppRouter = () => {
	return(
		<Switch>
			<Route
				exact
				path={`${END_POINTS.EVENT_DETAILS}:id`}
				component={SingleEventDetails}
			/>
			<Route
				exact
				path={END_POINTS.EVENTS}
				render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />}
			/>
			<Route
				exact
				path={`${END_POINTS.EVENTS}:page`}
				component={EventsList}
			/>
			<Route
				exact
				path={`${END_POINTS.EVENT_EDIT}:id`}
				render={(props) => {
					const action = () => { 
						if (props.history.length > 0) {
							props.history.goBack();
						}
						else {
							props.history.replace(`${END_POINTS.EVENT_DETAILS}${props.match.params.id}`);
						}
					}
					return(
						<EventEdit
							whenLoggedOut={<Redirect to={`${END_POINTS.EVENT_DETAILS}${props.match.params.id}`} />}
							onOk={action}
							onCancel={action}
							{...props}
						/>
					)
				}}
			/>

			<Route
				exact
				path={END_POINTS.CATEGORIES}
				render={() => <Redirect to={`${END_POINTS.CATEGORIES}1`} />}
			/>
			<Route
				exact
				path={`${END_POINTS.CATEGORIES}:page`}
				component={CategoriesList}
			/>
			<Route
				exact
				path={`${END_POINTS.CATEGORY_EDIT}:id`}
				render={(props) => {
					const action = () => {
						if (props.history.length > 0) {
							props.history.goBack();
						} else {
							props.history.replace(`${END_POINTS.CATEGORIES}1`);
						}
					}
					return(
						<CategoryEdit
							whenLoggedOut={<Redirect to={`${END_POINTS.CATEGORIES}1`} />}
							onOk={action}
							onCancel={action}
							{...props}
						/>
					)
				}}
			/>

			<Route
				exact
				path={END_POINTS.ORGANIZERS}
				render={() => <Redirect to={`${END_POINTS.ORGANIZERS}1`} />}
			/>
			<Route
				exact
				path={`${END_POINTS.ORGANIZERS}:page`}
				component={OrganizersList}
			/>
			<Route
				exact
				path={`${END_POINTS.ORGANIZER_EDIT}:id`}
				render={(props) => {
					const action = () => {
						if (props.history.length > 0) {
							props.history.goBack();
						} else {
							props.history.replace(`${END_POINTS.ORGANIZERS}1`);
						}
					}
					return(
						<OrganizerEdit
							whenLoggedOut={<Redirect to={`${END_POINTS.ORGANIZERS}1`} />}
							onOk={action}
							onCancel={action}
							{...props}
						/>
					)
				}}
			/>
			<Route
				exact
				path="/"
				render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />}
			/>
			<Route
				exact
				path={END_POINTS.LOGIN}
				component={Login}
			/>
			<Route
				exact
				path={END_POINTS.LOGOUT}
				render={() => <Redirect to={`${END_POINTS.EVENTS}1`} />}
			/>
			<Route
				path="*"
				atch
				render={() => { return "UrlNotFoundError"; }}
			/>
		</Switch>
	);
};