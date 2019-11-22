import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TFormFields } from "../../types";

class FormStore {
    private _dataProcessor: {[key: string]: any};
	itemId: string = "";
	data: {[key:string]: any} | null = null;
	fetchMethod: any = () => {};
	saveMethod: any = () => {};
	entity: string = "";

	form: TFormFields = {
		fields: {},
		meta: {}
	};

	async fetch() {
		this.data = await this._dataProcessor[this.fetchMethod](
			this.itemId
		);
		for (let key in this.form.fields) {
			this.form.fields[key].value = this.data && this.data[key] ? this.data[key] : "";
        }
	}
	getData() {
		return this.data;
	}
	setCurrentEntity = (itemId: string, entity: string, formFields: TFormFields) => {
		if (this.itemId !== itemId) {
			this.itemId = itemId;
			this.data = null;
			this.form = formFields;
			this.fetch();
		}
	};

	getField = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].value : "";
	}

	getError = (key: string) => {
        return this.form.fields && this.form.fields[key] ? this.form.fields[key].error : "";
	}

	init = (itemId: string, entity: string, formFields: TFormFields) => {
		if (!itemId || (this.itemId === itemId && this.entity === entity)) {
			return;
		}
		this.setCurrentEntity(itemId, entity, formFields);
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
		await this._dataProcessor[this.saveMethod](this.itemId, values);
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

decorate(FormStore, {
	data: observable,
	itemId: observable,
	setCurrentEntity: action,
	fetch: action,
	reset: action,
	init: action,
	onFieldChange: action,
	form: observable
})

export { FormStore };