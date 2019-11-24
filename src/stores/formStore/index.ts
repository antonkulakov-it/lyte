import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TFormActions } from "../../types";
import { TFormFields } from "../../types";

class FormStore {
    private _dataProcessor: {[key: string]: any};
	itemId: string = "";
	data: {[key:string]: any} | null = null;
	entity: string = "";

	actions: TFormActions = {
		fetchMethod: "",
		updateMethod: ""
	};
	form?: TFormFields;
	onOk: () => void = () => {};
	onCancel: () => void = () => {};

	async fetch() {
		const { fetchMethod } = this.actions!;
		this.data = await this._dataProcessor[fetchMethod](
			this.itemId
		);
		for (let key in this.form!.fields) {
			this.form!.fields[key].value = this.data && this.data[key] ? this.data[key] : "";
        }
	}
	getData() {
		return this.data;
	}
	setCurrentEntity = async (itemId: string) => {
		if (this.itemId !== itemId) {
			this.itemId = itemId;
			this.data = null;
			await this.fetch();
		}
	};

	getField = (key: string) => {
        return this.form!.fields && this.form!.fields[key] ? this.form!.fields[key].value : "";
	}

	getError = (key: string) => {
        return this.form!.fields && this.form!.fields[key] ? this.form!.fields[key].error : "";
	}

	init = (itemId: string, entity: string, formFields: TFormFields, formActions: TFormActions, onOk: () => void, onCancel: () => void ) => {
		if (!itemId || (this.itemId === itemId && this.entity === entity)) {
			return;
		}
		this.entity = entity;
		this.form = formFields;
		this.actions = formActions;
		this.onOk = onOk;
		this.onCancel = onCancel;
		this.setCurrentEntity(itemId);
	}

	onFieldChange = (event: any) => {
		const { name, value } = event.target;
		this.form!.fields[name].value = value;
		const values: {[key: string]: string} = {};
		const rules: {[key: string]: string} = {};
        for (let key in this.form!.fields) {
			values[key] = this.form!.fields[key].value;
			rules[key] = this.form!.fields[key].rule;
        }
		const validation = new Validator(
			values,
			rules,
		);
		this.form!.meta.isValid = !!validation.passes();
		this.form!.fields[name].error = validation.errors.first(name);
	}

	onClickSave = async (e: any) => {
		e.preventDefault();
		const { updateMethod } = this.actions;
		const values: {[key: string]: string} = {};
		for (let key in this.form!.fields) {
			values[key] = this.form!.fields[key].value;
		}
		await this._dataProcessor[updateMethod](this.itemId, values);
		this.onOk();
	}
	onClickCancel = (e: any) => {
		e.preventDefault();
		this.reset();
		this.onCancel();
	}
	onSubmit = (e: any) => {
		e.preventDefault();
	}

	reset = () => {
		this.itemId = "";
		for (let key in this.form!.fields) {
			this.form!.fields[key].value = "";
			this.form!.fields[key].error = null;
		}
		this.data = null;
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