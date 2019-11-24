import React from "react";
import { formBuilder } from "../common/formBuilder";

export const EventEdit = (props: any) => {
    const { whenLoggedOut, onOk, onCancel } = props;
	const EventEdit = formBuilder("event", "Edit event", whenLoggedOut, onOk, onCancel);
	return <EventEdit {...props} />
}