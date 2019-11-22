import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { END_POINTS } from "../../../endPoints";
import { TFormFields } from "../../../types";
import { FormStore } from "../../../stores/formStore";
import { MyInputGroup } from "../../common/myInputGroup";


const rulesCases: {[key: string]: TFormFields} = {
	event: {
		fields: {
			name: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			logo_uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			min_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			max_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			ticket_price_currency: {
				value: "",
				error: null,
				rule: "required|max:3"
			}
		},
		meta: {
			isValid: true,
			error: null
		}
	},
	category: {
		fields: {
			name: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			logo_uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			min_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			max_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			ticket_price_currency: {
				value: "",
				error: null,
				rule: "required|max:3"
			}
		},
		meta: {
			isValid: true,
			error: null
		}
	},
	organizer: {
		fields: {
			name: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			logo_uri: {
				value: "",
				error: null,
				rule: "required:min2"
			},
			min_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			max_ticket_price: {
				value: "",
				error: null,
				rule: "required|numeric"
			},
			ticket_price_currency: {
				value: "",
				error: null,
				rule: "required|max:3"
			}
		},
		meta: {
			isValid: true,
			error: null
		}
	}
}

const formCases: {[key: string]: any} = {
	event: (formStore: FormStore) => {
		<Form onChange={formStore.onFieldChange} onSubmit={formStore.onSubmit}>
			<MyInputGroup {...{
				id: "event-name",
				type: "text",
				placeholder: "Event Name",
				value: formStore.getField("name"),
				name: "name"
			}} />
			<Form.Text className="text-danger">{formStore.getError("name")}</Form.Text>
			<MyInputGroup {...{
				id: "event-uri",
				type: "text",
				placeholder: "uri",
				value: formStore.getField("uri"),
				name: "uri"
			}} />
			<Form.Text className="text-danger">{formStore.getError("uri")}</Form.Text>
			<MyInputGroup {...{
				id: "event-logo-uri",
				type: "text",
				placeholder: "Logo uri",
				value: formStore.getField("logo_uri"),
				name: "logo_uri"
			}} />
			<Form.Text className="text-danger">{formStore.getError("logo_uri")}</Form.Text>
			<MyInputGroup {...{
				id: "event-min-ticket-price",
				type: "number",
				placeholder: "Event min ticket price",
				value: formStore.getField("min_ticket_price"),
				name: "min_ticket_price"
			}} />
			<Form.Text className="text-danger">{formStore.getError("min_ticket_price")}</Form.Text>
			<MyInputGroup {...{
				id: "event-max-ticket-price",
				type: "number",
				placeholder: "Event max ticket price",
				value: formStore.getField("max_ticket_price"),
				name: "max_ticket_price"
			}} />
			<Form.Text className="text-danger">{formStore.getError("max_ticket_price")}</Form.Text>
			<MyInputGroup {...{
				id: "event-ticket-price-currency",
				type: "text",
				placeholder: "Event ticket price currency",
				value: formStore.getField("ticket_price_currency"),
				name: "ticket_price_currency"
			}} />
			<Form.Text className="text-danger">{formStore.getError("ticket_price_currency")}</Form.Text>
			<Row>
				<Col md={{ span: 6 }}>
					<Button variant="primary" type="submit" onClick={formStore.onClickSave}>
						Save
					</Button>
				</Col>
				<Col md={{ span: 6 }}>
					<Button variant="secondary" type="submit" onClick={(e: any) => {
							formStore.onClickCancel(e);
							history.replace(`${END_POINTS.EVENT_DETAILS}${match.params.id}`);
						}}>
						To event info
					</Button>
				</Col>
			</Row>
		</Form>
	},
	category: {},
	organizer: {}
}

export const formBuilder = (type: string, title: string) => inject("loginStore", "formStore")(observer(({ loginStore, formStore, match, history, whenLoggedOut }) => {
	// we don't need to access logged out user
	if (!loginStore.getToken()) {
		return whenLoggedOut;
	}
	formStore.init(match.params.id);

	return(
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}));


