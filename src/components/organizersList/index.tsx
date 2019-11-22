import React from "react";
import { ListBuilder } from "../common/listBuilder";

export const OrganizersList = (route: any, action: any) => {
	const List = ListBuilder("organizers");
	return <List {...route} />
}

