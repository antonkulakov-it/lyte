import * as React from "react";
import { observer, inject } from "mobx-react";
import { Jumbotron, Container, Tab, Row, Col, Nav, Badge, Button } from "react-bootstrap";

const Logo = (props: {children?: any; src: string; alt: string; className: string }) => {
	const { children, src = "", alt = "", className = "" } = props;
	return src && src !== "" ? (
		<div className={className}>
			<img src={src} alt={alt} />
			{children}
		</div>
	) : (
		(("" as unknown) as JSX.Element)
	);
};

const Organizer = (props: { logo_uri: string; name: string; alt: string }) => {
	const { name = "", alt = "", logo_uri = "" } = props;
	return name && name !== "" ? (
	  <div>
		<h2>Organizer: {name}</h2>
		<Logo className="organizer-logo" src={logo_uri} alt={name}></Logo>
	  </div>
	) : (
	  (("" as unknown) as JSX.Element)
	);
  };

export const SingleEventDetails = inject("singleEventStore")(
	observer(({ singleEventStore, match, history }) => {
		singleEventStore.setCurrentEventId(match.params.id);
		const details = singleEventStore.getDetails();
		if (!details) {
			return <div></div>;
		}
		const {
			name,
			logo_uri,
			description_html,
			min_ticket_price,
			max_ticket_price,
			ticket_price_currency,
			start_time,
			finish_time,
			organizer
		} = details;
		return (
			<Container>
				{history.length > 1 ? (
				<Button variant="outline-secondary" onClick={() => history.goBack()}>back</Button>
				) : (
				""
				)}
				<Jumbotron>
					<h2>{name}</h2>
					<Logo src={logo_uri} alt="event logo" className="event-logo">
						<Badge pill variant="success">{`${Number(min_ticket_price).toFixed(2)} - ${Number(max_ticket_price).toFixed(2)} ${ticket_price_currency}`}</Badge>
					</Logo>
					{start_time}{finish_time !== "" ? ` - ${finish_time}` : ""}
				</Jumbotron>
				<Tab.Container id="left-tabs" defaultActiveKey="event-info">
				<Row>
					<Col sm={3}>
					<Nav variant="pills" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="event-info">Event Info</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="organizer">Organizer</Nav.Link>
						</Nav.Item>
					</Nav>
					</Col>
					<Col sm={9}>
					<Tab.Content>
						<Tab.Pane eventKey="event-info">
							<div
							className="event-description"
							dangerouslySetInnerHTML={{ __html: description_html }}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="organizer">
							<Organizer {...organizer} />
						</Tab.Pane>
					</Tab.Content>
					</Col>
				</Row>
				</Tab.Container>
			</Container>

		);
	})
);