import { decorate, observable, action } from "mobx";
export class MainStore {
	promises: [];
	messages = [];
	constructor() {
		this.promises = [];
		this.messages = [];
	}

}

decorate(MainStore, {
	promises: observable,
	messages: observable,
});
