import { observer, inject } from "mobx-react";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import { EventsListStore } from "../../stores/eventsListStore";
import { PER_PAGE } from "../../services/dataProcessor/config";
import { Table, Pagination /*, PageItem */ } from "react-bootstrap";
import { END_POINTS } from "../../endPoints";


class EventsList extends React.Component {
	eventsListStore: EventsListStore;
	constructor(props: any) {
		super(props);
		this.eventsListStore = props.eventsListStore;
		props.history.listen((location:any) => {
			if (location.pathname.indexOf(END_POINTS.EVENTS) < 0) {
				return;
			}
			this.eventsListStore.resolveCollision(
				Number(location.pathname.split(END_POINTS.EVENTS)[1] || 1),
				END_POINTS.EVENTS,
				props.history.replace
			)
		});
		this.eventsListStore.resolveCollision(
			Number(props.match.params.page),
			END_POINTS.EVENTS,
			props.history.replace
		);
	}
	render() {
		const events = this.eventsListStore.getEvents();
		let pages: any[] = [];
		const eventsHtml = events.map((event) => {
			return(
				<tr key={ event.id }>
					<td>{ event.id }</td>
					<td>
						<Link to={`${END_POINTS.EVENT_DETAILS}${event.id}`}>{event.name}</Link>
					</td>
					<td>{event.start_time}</td>
					<td>
						{ parseFloat(event.min_ticket_price).toFixed(2) }&ndash;
						{ parseFloat(event.max_ticket_price).toFixed(2) }
						{ event.ticket_price_currency }
					</td>
				</tr>
			);
		});
		// maybe it is bug ?
		// this.eventsListStore.totalPages is 0;
		const total = Math.ceil(this.eventsListStore.getCount() as number / PER_PAGE);
		for (let i = 1; i <= total; i++) {
			pages.push(
				// maybe bug, but don't work below cases:
				// <PageItem key={i} as={NavLink} to={`${END_POINTS.EVENTS}${i}`} activeClassName="active">{i}</PageItem>
				<li className="page-item" key={i} >
					<NavLink to={`${END_POINTS.EVENTS}${i}`} className="page-link" activeClassName="active">{i}</NavLink>
				</li>
			);
		}
		return(
			<>
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
			<Pagination>{ pages }</Pagination>
			</>
		);
	}
}
// we have ordinary class and then add to him mobx functionality
export default inject("eventsListStore")(observer(EventsList));

