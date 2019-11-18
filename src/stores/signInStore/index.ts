import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TSignInFields } from "../../types";

class SignInStore {
	private _dataProcessor: DataProcessor;
	form: TSignInFields = {
		fields: {
			email: {
				value: "",
				error: null,
				rule: "required|email"
			},
			password: {
				value: "",
				error: null,
				rule: "required"
			}
		},
		meta: {
			isValid: true,
			error: null
		}
	}

	onFieldChange = (field: "email" | "password", value: string) => {
		this.form.fields[field].value = value;
		const { email, password } = this.form.fields;
		const validation = new Validator(
			{ email: email.value, password: password.value },
			{ email: email.rule, password: password.rule },
		);
		this.form.meta.isValid = !!validation.passes();
    	this.form.fields[field].error = validation.errors.first(field);
	}

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

	async fetch() {
	}
}

decorate(SignInStore, {
	fetch: action,
	onFieldChange: action,
	form: observable
})

export { SignInStore };