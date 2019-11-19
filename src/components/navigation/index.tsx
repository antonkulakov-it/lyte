import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import { END_POINTS } from "../../endPoints";



export const Navigation = inject("loginStore")(observer(({ loginStore }) => {
	let loginItem = <Nav.Item>
		<Nav.Link as={NavLink} to={END_POINTS.LOGIN} activeClassName="active">
			Login
		</Nav.Link>
	</Nav.Item>;

	if (loginStore.getToken()) {
		loginItem = <Nav.Item>
			<Nav.Link onClick={loginStore.dropToken} as={NavLink} to={END_POINTS.LOGOUT}>
				Logout
			</Nav.Link>
		</Nav.Item>
	}
	return(
		<Nav>
			<Nav.Item>
				<Nav.Link as={NavLink} to={END_POINTS.EVENTS} activeClassName="active">
					Events
				</Nav.Link>
			</Nav.Item>
			{loginItem}
		</Nav>
	);
}));
