import React from "react";
import { ListBuilder } from "../common/listBuilder";

export const OrganizersList = (route: any, action: any) => {
	return <ListBuilder {...route} type="organizers" />
}

