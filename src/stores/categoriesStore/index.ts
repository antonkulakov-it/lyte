import { observable, action, decorate } from "mobx";
import { DataProcessor } from "../../services/dataProcessor";

class CategoriesStore {
	private _dataProcessor: DataProcessor;
	categories: any[] = [];

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

	async fetch() {
		this.categories = await this._dataProcessor.getOrganizers() as any;
    }
    
    loadData = async () => {
        this.categories = await this._dataProcessor.getOrganizers() as any;
    }

	getOrganizers() {
		return this.categories;
	}
}

decorate(CategoriesStore, {
	categories: observable,
    fetch: action,
    loadData: action
});

export { CategoriesStore };