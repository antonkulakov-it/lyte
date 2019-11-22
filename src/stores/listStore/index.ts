import { observable, computed, action, decorate } from "mobx";
import { DataProcessor } from "../../services/dataProcessor";
import { PER_PAGE } from "../../services/dataProcessor/config";

class ListStore {
	currentPage: number = 0;
	count: number = 0;
	items: any[] = [];
	endPoint: string = "";
	private _getItemsMethodName: string = "";
	private _dataProcessor: {[key: string]: any};
	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}
	async fetch() {
		const eventsResult = await this._dataProcessor[this._getItemsMethodName](
			this.currentPage
		);
		this.count = eventsResult.count;
		this.items = eventsResult.results;

		if (this.currentPage! > this.totalPages) {
			this.setCurrentPage(this.totalPages, this.endPoint);
		}
		if (this.currentPage < 1) {
			this.setCurrentPage(1, this.endPoint);
		}
	}
	getItems() {
		return this.items;
	}
	getCount() {
		return this.count;
	}
	setCurrentPage = (pageNum: number, endPoint: string) => {
		if (this.currentPage !== pageNum || this.endPoint !== endPoint) {
			this.currentPage = pageNum;
			this.endPoint = endPoint;
			this.reset();
			this.fetch();
		}
	}

	reset() {
		this.items = [];
		this.count = 0;
	}

	init(page: number, endPoint: string, replace: (target: string) => void, getItemsMethodName: string) {
		let result = page;
		this._getItemsMethodName = getItemsMethodName;
		if (this.currentPage === 0) {
			this.setCurrentPage(result, endPoint);
		} else if (page !== this.currentPage) {
			if (page > this.totalPages) {
				result = this.totalPages;
			}
			if (result <= 1) {
				result = 1;
			}
			this.setCurrentPage(result, endPoint);
		}
		if (result !== page) {
			replace(`${endPoint}${result}`);
		}
		this.setCurrentPage(result, endPoint);
	};
	get totalPages() {
		return Math.ceil(this.count / PER_PAGE);
	}
	getCurrentPage = () => {
		return this.currentPage;
	}
};

decorate(ListStore, {
	currentPage: observable,
	items: observable,
	endPoint: observable,
	setCurrentPage: action,
	totalPages: computed,
	fetch: action,
	init: action,
	reset: action
});

export { ListStore };