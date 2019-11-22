import React from "react";
import { ListBuilder } from "../common/listBuilder";

export const EventsList = (route: any, action: any) => {
	return <ListBuilder {...route} type="events" />
}

