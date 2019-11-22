import React from "react";
import { NavLink } from "react-router-dom";
import { END_POINTS } from "../../../endPoints";

export const MyPageItem = (props: {[key:string]: any}) => {
	const { num, endPoint } = props;
	return(
		<li className="page-item">
			<NavLink to={`${endPoint}${num}`} className="page-link" activeClassName="active">{num}</NavLink>
		</li>
	);
}