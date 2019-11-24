import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { TFormFields } from "../../../types";
import { FormStore } from "../../../stores/formStore";
import { MyInputGroup } from "../../common/myInputGroup";


const formFields: { [key: string]: TFormFields } = {
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
				rule: "required|max:33"
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
				rule: "min:2"
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
				rule: "min:2"
			},
			logo_uri: {
				value: "",
				error: null,
				rule: "min:2"
			}
		},
		meta: {
			isValid: true,
			error: null
		}
	}
}

const formActions: {[key: string]: any} = {
	event: {
		fetchMethod: "getEvent",
		updateMethod: "updateEvent",
		getForm: (formStore: FormStore) => {
		return <Form onChange={formStore.onFieldChange} onSubmit={formStore.onSubmit}>
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
					<Button variant="secondary" type="submit" onClick={formStore.onClickCancel}>
						Cancel
					</Button>
				</Col>
			</Row>
		</Form>
		}
	},
	category: {
		fetchMethod: "getCategory",
		updateMethod: "updateCategory",
		getForm: (formStore: FormStore) => {
		return <Form onChange={formStore.onFieldChange} onSubmit={formStore.onSubmit}>
			<MyInputGroup {...{
				id: "category-name",
				type: "text",
				placeholder: "Category Name",
				value: formStore.getField("name"),
				name: "name"
			}} />
			<Form.Text className="text-danger">{formStore.getError("name")}</Form.Text>
			<Row>
				<Col md={{ span: 6 }}>
					<Button variant="primary" type="submit" onClick={formStore.onClickSave}>
						Save
					</Button>
				</Col>
				<Col md={{ span: 6 }}>
					<Button variant="secondary" type="submit" onClick={formStore.onClickCancel}>
						Cancel
					</Button>
				</Col>
			</Row>
		</Form>
		}
	},
	organizer: {
		fetchMethod: "getOrganizer",
		updateMethod: "updateOrganizer",
		getForm: (formStore: FormStore) => {
		return <Form onChange={formStore.onFieldChange} onSubmit={formStore.onSubmit}>
			<MyInputGroup {...{
				id: "ogranizer-name",
				type: "text",
				placeholder: "Organizer Name",
				value: formStore.getField("name"),
				name: "name"
			}} />
			<Form.Text className="text-danger">{formStore.getError("name")}</Form.Text>
			<MyInputGroup {...{
				id: "ogranizer-uri",
				type: "text",
				placeholder: "uri",
				value: formStore.getField("uri"),
				name: "uri"
			}} />
			<Form.Text className="text-danger">{formStore.getError("uri")}</Form.Text>
			<MyInputGroup {...{
				id: "ogranizer-logo-uri",
				type: "text",
				placeholder: "Logo uri",
				value: formStore.getField("logo_uri"),
				name: "logo_uri"
			}} />
			<Form.Text className="text-danger">{formStore.getError("logo_uri")}</Form.Text>
			<Row>
				<Col md={{ span: 6 }}>
					<Button variant="primary" type="submit" onClick={formStore.onClickSave}>
						Save
					</Button>
				</Col>
				<Col md={{ span: 6 }}>
					<Button variant="secondary" type="submit" onClick={formStore.onClickCancel}>
						Cancel
					</Button>
				</Col>
			</Row>
		</Form>
		}
	}
}

export const formBuilder = (
	entity: string,
	title: string,
	whenLoggedOut: JSX.Element,
	onOk: () => void,
	onCancel: () => void
) => inject("loginStore", "formStore")(observer(({ loginStore, formStore, match, whenLoggedOut }) => {
	// we don't need to access logged out user
	if (!loginStore.getToken()) {
		return whenLoggedOut;
	}
	formStore.init(match.params.id, entity, formFields[entity], formActions[entity], onOk, onCancel);

	return(
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						{formActions[entity].getForm(formStore)}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}));


