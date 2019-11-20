import { observable, action, decorate } from "mobx";
import { DataProcessor } from "../../services/dataProcessor";
import { IEvent } from "../../types";

class OrganizersStore {
	private _dataProcessor: DataProcessor;
	organizers: any[] = [];

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

	async fetch() {
		this.organizers = await this._dataProcessor.getOrganizers() as any;
    }
    
    loadData = async () => {
        this.organizers = await this._dataProcessor.getOrganizers() as any;
    }

	getOrganizers() {
		return this.organizers;
	}
}

decorate(OrganizersStore, {
	organizers: observable,
    fetch: action,
    loadData: action
});

export { OrganizersStore };