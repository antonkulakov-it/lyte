import { observable, action, decorate } from "mobx";
import Validator from "validatorjs";
import { DataProcessor } from "../../services/dataProcessor";
import { TLoginFields } from "../../types";

class LoginStore {
	private _dataProcessor: DataProcessor;
	token: string = "";
	form: TLoginFields = {
		fields: {
			email: {
				value: "",
				error: null,
				rule: "required|email"
			},
			password: {
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

	getEmail = () => this.form.fields.email.value;
	getPassword = () => this.form.fields.password.value;

	onFieldChange = (event: any) => {
		const { type, value } = event.target;
		this.form.fields[type].value = value;
		const { email, password } = this.form.fields;
		const validation = new Validator(
			{ email: email.value, password: password.value },
			{ email: email.rule, password: password.rule },
		);
		this.form.meta.isValid = !!validation.passes();
		this.form.fields[type].error = validation.errors.first(type);
	}

	getError = (type: string) => {
		return this.form.fields[type].error || "";
	}

	login = async (event: Event, afterTokenSetted:() => void = () => {}) => {
		event.preventDefault();
		if (this.form.meta.isValid) {
			const result = await this._dataProcessor.getUserToken(this.getEmail(), this.getPassword());
			if (result) {
				this.token = result.token;
				afterTokenSetted();
			}
		}

	}

	register = async (event: Event, afterRegistered:() => void = () => {}) => {
		event.preventDefault();
		if (this.form.meta.isValid) {
			const result = await this._dataProcessor.registerUser(this.getEmail(), this.getPassword());
			if (result) {
				afterRegistered();
			}
		}
	}

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

	getToken = () => this.token;

	dropToken = () => {
		this.token = "";
	}
}

decorate(LoginStore, {
	onFieldChange: action,
	form: observable,
	token: observable,
	login: action
})

export { LoginStore };