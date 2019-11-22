import React from "react";
import { ListBuilder } from "../common/listBuilder";

export const CategoriesList = (route: any, action: any) => {
	const List = ListBuilder("categories");
	return <List {...route} />
}

