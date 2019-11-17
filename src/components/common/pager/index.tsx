import * as React from "react";
import { Link } from "react-router-dom";
import { TPagerProps, TPagesHtmlProps } from "../../../types";
const getPagesHtml = (props: TPagesHtmlProps): React.ReactElement => {
  const { 
	endPoint,
	total,
	perPage,
	className,
	currentPage,
	activeClass
  } = props;
  const pages = Math.ceil(total / perPage);
  let result = [];
  for (let i = 1; i <= pages; i++) {
	result.push(
	  <Link
		to={`${endPoint}${i}`}
		key={i}
		className={`${className}-item ${
		  i == currentPage ? activeClass : ""
		}`}
	  >
		{i}
	  </Link>
	);
  }
  return <div className={className}>{result}</div>;
};

export const Pager = (props: TPagerProps) => {
  const {
	endPoint,
	total,
	currentPage = 1,
	perPage = 10,
	className = "pager"
  } = props;
  return (
	<div className={className}>
	  <div className={`${className}-pages`}>
		Pages:
		{getPagesHtml({
		  endPoint,
		  total,
		  perPage,
		  currentPage,
		  className: `${className}-pagesList`,
		  activeClass: `${className}-active`
		})}
	  </div>
	</div>
  );
};
