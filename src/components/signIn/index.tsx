import * as React from "react";
import { observer, inject } from "mobx-react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

class SignIn extends React.Component {
	constructor(props: any) {
		super(props);
	}
	render() {
		return(
			<Container>
				<Row>
					<Col md={{ span: 6, offset: 3 }}>
						<Card>
							<Card.Body>
								<Card.Title>Sign In</Card.Title>
								<Form>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" />
										<Form.Text className="text-muted">
										We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" />
									</Form.Group>
									<Row>
										<Col md={{ span: 6 }}>
											<Button variant="primary" type="submit">
												SignIn
											</Button>
										</Col>
										<Col md={{ span: 6 }}>
											<Button variant="primary" type="submit">
												Register
											</Button>
										</Col>
									</Row>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
	submit = () => {}
}

export default inject("eventsListStore")(observer(SignIn));