import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

export const Navigation = () => {
	return (
		<Container>
			<Nav>
				<Nav.Item>
					<Nav.Link as={NavLink} to="/events" activeClassName="active">
						Events
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={NavLink} to="/signup" activeClassName="active">
						Sign Up
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</Container>
	);
};
