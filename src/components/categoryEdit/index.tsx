import React from "react";
import { formBuilder } from "../common/formBuilder";

export const CategoryEdit = (props: any) => {
    const { whenLoggedOut, onOk, onCancel } = props;
	const CategoryEdit = formBuilder("category", "Edit category", whenLoggedOut, onOk, onCancel);
	return <CategoryEdit {...props} />
}