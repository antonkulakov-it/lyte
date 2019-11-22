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

const formCases = {
	"events": {},
	"categories": {},
	"organizers": {}
};

export const FormBuilder = inject("loginStore", "listStore")(observer(({ loginStore, listStore, location, history, type }) => {
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
