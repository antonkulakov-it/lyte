import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { ListStore } from "../../../stores/listStore";
import { PER_PAGE } from "../../../services/dataProcessor/config";
import { Table, Pagination, /*, PageItem */ Button} from "react-bootstrap";
import { END_POINTS } from "../../../endPoints";
import { LoginStore } from "../../../stores/loginStore";
import { EditIcon } from "../editIcon";
import { MyPageItem } from "../myPageItem";
import { TListCases } from "../../../types";

const getEditButton = (showEditButton: boolean, item: any, endPoint: string): JSX.Element | void => {
	return(
		showEditButton ? <td><Button variant="outline-primary">
		<Link to={`${endPoint}${item.id}`}>
			<EditIcon />
		</Link>
		</Button></td> : undefined
	);
}

const listCases: TListCases = {
	"events": {
		getItemsMethod: "getEvents",
		endPoint: END_POINTS.EVENTS,
		ItemsHead: (props: any): JSX.Element => {
			const { editItemsHead } = props;
			return(
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						{ editItemsHead }
						<th>organizer</th>
						<th>start</th>
						<th>price</th>
					</tr>
				</thead>
			);
		},
		ItemsBody: (props: any): JSX.Element => {
			const { items, showEditButton } =  props;
			return(
				<tbody>
					{
					items.map((item: any) => {
						const editEventBody = getEditButton(showEditButton, item, END_POINTS.EVENT_EDIT);
						return(
							<tr key={ item.id }>
								<td>{ item.id }</td>
								<td>
									<Link to={`${END_POINTS.EVENT_DETAILS}${item.id}`}>{item.name}</Link>
								</td>
								<td>{ item.organizer.name }</td>
								<td>{ item.start_time }</td>
								<td>
									{ parseFloat(item.min_ticket_price).toFixed(2) }&ndash;
									{ parseFloat(item.max_ticket_price).toFixed(2) }
									{ item.ticket_price_currency }
								</td>
								{ editEventBody }
							</tr>
						);
					})
					}
				</tbody>
			);
		}
	},
	"categories": {
		getItemsMethod: "getCategories",
		endPoint: END_POINTS.CATEGORIES,
		ItemsHead: (props: any): JSX.Element => {
			const { editItemsHead } = props;
			return(
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						{ editItemsHead }
					</tr>
				</thead>
			);
		},
		ItemsBody: (props: any): JSX.Element => {
			const { items, showEditButton, endPointEdit } =  props;
			return(
				<tbody>
					{
					items.map((item: any) => {
						const editEventBody = getEditButton(showEditButton, item, END_POINTS.CATEGORY_EDIT)
						return(
							<tr key={ item.id }>
								<td>{ item.id }</td>
								<td>{item.name}</td>
								{ editEventBody }
							</tr>
						);
					})
					}
				</tbody>
			);
		}
	},
	"organizers": {
		getItemsMethod: "getOrganizers",
		endPoint: END_POINTS.ORGANIZERS,
		ItemsHead: (props: any): JSX.Element => {
			const { editItemsHead } = props;
			return(
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						{ editItemsHead }
					</tr>
				</thead>
			);
		},
		ItemsBody: (props: any): JSX.Element => {
			const { items, showEditButton, endPointEdit } =  props;
			return(
				<tbody>
					{
					items.map((item: any) => {
						const editEventBody = getEditButton(showEditButton, item, END_POINTS.ORGANIZER_EDIT);
						return(
							<tr key={ item.id }>
								<td>{ item.id }</td>
								<td>{item.name}</td>
								{ editEventBody }
							</tr>
						);
					})
					}
				</tbody>
			);
		}
	}
};

export const ListBuilder = (type: string) => inject("loginStore", "listStore")(observer(({ loginStore, listStore, location, history }) => {
	const { getItemsMethod, endPoint, ItemsHead, ItemsBody } = listCases[type];
	listStore.init(
		Number(location.pathname.split(endPoint)[1] || 1),
		endPoint,
		history.replace,
		getItemsMethod
	);
	const items = listStore.getItems();
	let pages: any[] = [];
	const showEditButton = !!loginStore.getToken();
	const editItemsHead = showEditButton ? <th></th> : null;
	const total = Math.ceil(listStore.getCount() as number / PER_PAGE);
	for (let i = 1; i <= total; i++) {
		pages.push(
			// maybe bug, but don't work below cases:
			// <PageItem key={i} as={NavLink} to={`${END_POINTS.EVENTS}${i}`} activeClassName="active">{i}</PageItem>
			<MyPageItem key={i} endPoint={endPoint} num={i}/>
		);
	}

	return(
		<>
		<Table striped bordered hover size="sm">
			<ItemsHead editItemsHead={editItemsHead} />
			<ItemsBody items={items} showEditButton={showEditButton} />
		</Table>
		<Pagination>{ pages }</Pagination>
		</>
	)
}));
