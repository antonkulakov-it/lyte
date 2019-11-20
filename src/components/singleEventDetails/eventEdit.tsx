import * as React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Card, Row, Col, InputGroup, FormControl } from "react-bootstrap";

const getInputGroup = (props: any) => {
	const {
		id,
		type,
		placeholder,
		value,
		options
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
				/>
			);
		},
		"select": () => {
			return(
			    <Form.Control as="select">
					{options.map((entry: any) => <option key={entry.key} value={entry.key}>entry.value</option>)}
				</Form.Control>
				);
		},

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


const EventEdit = inject("singleEventStore")(observer(({ singleEventStore, match, history }) => {
	singleEventStore.setCurrentEventId(match.params.id);
	const details = singleEventStore.getDetails();
	if (!details) {
		return <div></div>;
	}
	const {
		name,
		min_ticket_price,
		max_ticket_price,
		ticket_price_currency,
		start_time,
		finish_time,
		organizer
	} = details;
	return(
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title>Edit Event</Card.Title>
						<Form onChange={singleEventStore.onFieldChange}>
						{getInputGroup({
							id: "event-name",
							type: "text",
							placeholder: "Event Name",
							value: name
						})}
						{getInputGroup({
							id: "event-min-ticket-price",
							type: "number",
							placeholder: "Event min ticket price",
							value: min_ticket_price
						})}
						{getInputGroup({
							id: "event-max-ticket-price",
							type: "number",
							placeholder: "Event max ticket price",
							value: max_ticket_price
						})}
						{getInputGroup({
							id: "event-ticket-price-currency",
							type: "text",
							placeholder: "Event ticket price currency",
							value: ticket_price_currency
						})}
							<Row>
								<Col md={{ span: 6 }}>
									<Button variant="primary" type="submit" onClick={(e: any) => {

									}}>
										Save
									</Button>
								</Col>
								<Col md={{ span: 6 }}>
									<Button variant="primary" type="submit" onClick={() => {
											history.go(-1);
									}}>
										Cancel
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