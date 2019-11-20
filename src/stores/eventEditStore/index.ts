import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TEventData, TFormFields } from "../../types";

class EventEditStore {
    private _dataProcessor: DataProcessor;
    eventId: string = "";
	form: TFormFields = {
		fields: {
			name: {
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
                rule: "required|min:8"
            }
		},
		meta: {
			isValid: true,
			error: null
		}
	}

	getField = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].value : "";
	}

	getError = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].error : "";
	}
	
	init = (eventId: string, eventData: TEventData) => {
		if (!eventId || this.eventId === eventId) {
			return;
		}
		this.eventId = eventId;
		for (let key in this.form.fields) {
			this.form.fields[key].value = eventData[key] ? eventData[key] : "";
        }
	}

	onFieldChange = (event: any) => {
		const { name, value } = event.target;
		this.form.fields[name].value = value;
		let values: {[key: string]: string} = {};
		let rules: {[key: string]: string} = {};
        for (let key in this.form.fields) {
			values[key] = this.form.fields[key].value;
			rules[key] = this.form.fields[key].rule;
        }
		const validation = new Validator(
			values,
			rules,
		);
		this.form.meta.isValid = !!validation.passes();
		this.form.fields[name].error = validation.errors.first(name);
	}

	onSave = (e: Event) => {
		e.preventDefault();
	}
	onCancel = (e: Event) => {
		e.preventDefault();
	}
	onSubmit = (e: Event) => {
		e.preventDefault();
	}

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

}

decorate(EventEditStore, {
	init: action,
	onFieldChange: action,
	form: observable,
})

export { EventEditStore };