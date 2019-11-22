import React from "react";
import { ListBuilder } from "../common/listBuilder";

export const EventsList = (route: any, action: any) => {
	const List = ListBuilder("events");
	return <List {...route} />
}

