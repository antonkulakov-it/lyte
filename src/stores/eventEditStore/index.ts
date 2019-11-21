import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TFormFields } from "../../types";

class EventEditStore {
    private _dataProcessor: DataProcessor;
	eventId: string = "";
	details: {[key:string]: any} | null = null;

	form: TFormFields = {
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

	/* it's copypast from singleEventsStore because everything stores are independent between themselves */
	async fetch() {
		this.details = await this._dataProcessor.getEvent(
			this.eventId
		);
		for (let key in this.form.fields) {
			this.form.fields[key].value = this.details && this.details[key] ? this.details[key] : "";
        }
	}
	getDetails() {
		return this.details;
	}
	setCurrentEventId = (eventId: string) => {
		if (this.eventId !== eventId) {
			this.eventId = eventId;
			this.details = null;
			this.fetch();
		}
	};
	/* end of copypast */

	getField = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].value : "";
	}

	getError = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].error : "";
	}

	init = (eventId: string) => {
		if (!eventId || this.eventId === eventId) {
			return;
		}
		this.setCurrentEventId(eventId);
	}

	onFieldChange = (event: any) => {
		const { name, value } = event.target;
		this.form.fields[name].value = value;
		const values: {[key: string]: string} = {};
		const rules: {[key: string]: string} = {};
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

	onClickSave = async (e: Event) => {
		e.preventDefault();
		const values: {[key: string]: string} = {};
		for (let key in this.form.fields) {
			values[key] = this.form.fields[key].value;
		}
		await this._dataProcessor.updateEvent(this.eventId, values);
		this.fetch(); // to request actual data from server but in case of parallel update by some users
	}
	onClickCancel = (e: Event) => {
		this.reset();
		e.preventDefault();
	}
	onSubmit = (e: Event) => {
		e.preventDefault();
	}

	reset = () => {
		this.eventId = "";
		for (let key in this.form.fields) {
			this.form.fields[key].value = "";
			this.form.fields[key].error = null;
		}
		this.details = null;
	}

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

}

decorate(EventEditStore, {
	details: observable,
	eventId: observable,
	setCurrentEventId: action,
	fetch: action,
	reset: action,
	init: action,
	onFieldChange: action,
	form: observable
})

export { EventEditStore };