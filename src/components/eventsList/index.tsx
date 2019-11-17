import { observer, inject } from "mobx-react";
import { Link, match, NavLink } from "react-router-dom";
import React from "react";
import { EventsListStore } from "../../stores/eventsListStore";
import { PER_PAGE } from "../../services/dataProcessor/config";
import { Table, Pagination } from "react-bootstrap";

const END_POINT = "/events/";

class EventsList extends React.Component {
	eventsListStore: EventsListStore;
	constructor(props: any) {
		super(props);
		this.eventsListStore = props.eventsListStore;
		props.history.listen((location:any) => {
			if (location.pathname.indexOf(END_POINT) < 0) {return;}
			this.eventsListStore.resolveCollision(
				Number(location.pathname.split(END_POINT)[1] || 1),
				END_POINT,
				props.history.replace
			)
		});
		this.eventsListStore.resolveCollision(
			Number(props.match.params.page),
			END_POINT,
			props.history.replace
		);
	}
	render() {
		const events = this.eventsListStore.getEvents();
		
		let pages: any[] = [];
		const eventsHtml = events.map((event) => {
			return(
				<tr key={event.id}>
					<td>{event.id}</td>
					<td>
						<Link to={`/event/${event.id}`}>{event.name}</Link>
					</td>
					<td>{event.start_time}</td>
					<td>
						{parseFloat(event.min_ticket_price).toFixed(2)}&ndash;
						{parseFloat(event.max_ticket_price).toFixed(2)}
						{event.ticket_price_currency}
					</td>
				</tr>
			);
		});
		// maybe it is bug ?
		// this.eventsListStore.totalPages is 0;
		const total = Math.ceil(this.eventsListStore.getCount() as number / PER_PAGE);
		for (let i = 1; i <= total; i++) {
			pages.push(
				<li className="page-item" key={i} >
					<NavLink to={`${END_POINT}${i}`} className="page-link" activeClassName="active">{i}</NavLink>
    			</li>
			);
		}
		return (
			<div>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>start</th>
							<th>price</th>
						</tr>
					</thead>
					<tbody>
						{ eventsHtml }
					</tbody>
				</Table>
				<Pagination>{pages}</Pagination>
			</div>
		);
	}
}

export default inject("eventsListStore")(observer(EventsList));

