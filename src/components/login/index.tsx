import * as React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";


const FormInput = (props: any) => {
	const { error, type } = props;
	let hintProps = {
		hidden: !error
	};
	const input = <Form.Control type={type} placeholder={`Enter ${type}`} isInvalid={!!error}/>;
	return(
		<div>
			{input}
			<Form.Text {...hintProps} className="text-danger">{error}</Form.Text>
		</div>
	);
}

const Login = inject("loginStore")(observer(({ loginStore, whenLoggedIn, history }) => {
	return(
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title>Sign In</Card.Title>
						<Form onChange={loginStore.onFieldChange} onSubmit={loginStore.onSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<FormInput type="email" error={loginStore.getError("email")}/>
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<FormInput type="password" error={loginStore.getError("password")}/>
							</Form.Group>
							<Row>
								<Col md={{ span: 6 }}>
									<Button variant="primary" type="submit" onClick={(e: any) => {
										loginStore.login(e, () => {
											history.go(-1);
										});
									}}>
										Login
									</Button>
								</Col>
								<Col md={{ span: 6 }}>
									<Button variant="primary" type="submit" onClick={loginStore.register}>
										Register
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}));

export default Login;