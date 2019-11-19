import * as React from "react";
import { observer, inject } from "mobx-react";
import { Alert } from "react-bootstrap";
import { TAlertMessage, TAlertMessages, TAlertsVariants } from "../../../types";

const getAlertsHtml = (alerts: TAlertMessages) => {
	const cases: TAlertsVariants = {
		error: "danger"
	}
	return Object.keys(alerts).map((id: string) => {
		const variant = cases[alerts[id].type];
		return(
			<Alert key={id} variant={variant}>
    			{alerts[id].message}
  			</Alert>
		);
	})
}

export const Alerts = inject("alertsStore")(observer(({ alertsStore }) => {
	return(
		<div
		aria-live="polite"
		aria-atomic="true"
		style={{
			top: 0,
			right: 0,
			position: "fixed",
			minHeight: "300px",
		}}
		>
			{getAlertsHtml(alertsStore.getMessages())}
		</div>
	);
}));