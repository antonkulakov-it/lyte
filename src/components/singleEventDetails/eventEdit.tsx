import * as React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Card, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { END_POINTS } from "../../endPoints";

const getInputGroup = (props: any) => {
	const {
		id,
		type,
		placeholder,
		value,
		name
	} = props;

	const controlCases: { [key: string]: () => JSX.Element } = {
		"text": () => {
			return(
				<FormControl
					type={type}
					value={value}
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby={id}
					name={name}
				/>
			);
		},
		"number": () => {
			return(
				<FormControl
					type={type}
					value={value}
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby={id}
					name={name}
				/>
			);
		}
	}
	return(
		<InputGroup className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id={id}>{placeholder}</InputGroup.Text>
			</InputGroup.Prepend>
			{controlCases[type.toString()]()}
		</InputGroup>
	);
}


const EventEdit = inject("eventEditStore")(observer(({ eventEditStore, match, history }) => {
	eventEditStore.init(match.params.id);
	return(
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title>Edit Event</Card.Title>
						<Form onChange={eventEditStore.onFieldChange} onSubmit={eventEditStore.onSubmit}>
							{getInputGroup({
								id: "event-name",
								type: "text",
								placeholder: "Event Name",
								value: eventEditStore.getField("name"),
								name: "name"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("name")}</Form.Text>
							{getInputGroup({
								id: "event-uri",
								type: "text",
								placeholder: "uri",
								value: eventEditStore.getField("uri"),
								name: "uri"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("uri")}</Form.Text>
							{getInputGroup({
								id: "event-logo-uri",
								type: "text",
								placeholder: "Logo uri",
								value: eventEditStore.getField("logo_uri"),
								name: "logo_uri"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("logo_uri")}</Form.Text>
							{getInputGroup({
								id: "event-min-ticket-price",
								type: "number",
								placeholder: "Event min ticket price",
								value: eventEditStore.getField("min_ticket_price"),
								name: "min_ticket_price"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("min_ticket_price")}</Form.Text>
							{getInputGroup({
								id: "event-max-ticket-price",
								type: "number",
								placeholder: "Event max ticket price",
								value: eventEditStore.getField("max_ticket_price"),
								name: "max_ticket_price"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("max_ticket_price")}</Form.Text>
							{getInputGroup({
								id: "event-ticket-price-currency",
								type: "text",
								placeholder: "Event ticket price currency",
								value: eventEditStore.getField("ticket_price_currency"),
								name: "ticket_price_currency"
							})}
							<Form.Text className="text-danger">{eventEditStore.getError("ticket_price_currency")}</Form.Text>
							<Row>
								<Col md={{ span: 6 }}>
									<Button variant="primary" type="submit" onClick={eventEditStore.onClickSave}>
										Save
									</Button>
								</Col>
								<Col md={{ span: 6 }}>
									<Button variant="secondary" type="submit" onClick={(e: any) => {
											eventEditStore.onClickCancel(e);
											history.replace(`${END_POINTS.EVENT_DETAILS}${match.params.id}`);
										}}>
										To event info
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

export default EventEdit;