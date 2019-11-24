import React from "react";
import { formBuilder } from "../common/formBuilder";

export const OrganizerEdit = (props: any) => {
    const { whenLoggedOut, onOk, onCancel } = props;
	const OrganizerEdit = formBuilder("organizer", "Edit organizer", whenLoggedOut, onOk, onCancel);
	return <OrganizerEdit {...props} />
}