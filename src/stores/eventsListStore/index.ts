import { observable, computed, action, decorate } from "mobx";
import { DataProcessor } from "../../services/dataProcessor";
import { PER_PAGE } from "../../services/dataProcessor/config";

class EventsListStore {
	currentPage: number = 0;
	count: number = 0;
	events: any[] = [];
	private _dataProcessor: DataProcessor;
	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}
	async fetch() {
		const eventsResult = await this._dataProcessor.getEvents(
			this.currentPage
		);
		this.count = eventsResult.count;
		this.events = eventsResult.results;

		if (this.currentPage! > this.totalPages) {
			this.setCurrentPage(this.totalPages);
		}
		if (this.currentPage < 1) {
			this.setCurrentPage(1);
		}
	}
	getEvents() {
		return this.events;
	}
	getCount() {
		return this.count;
	}
	setCurrentPage = (pageNum: number) => {
		if (this.currentPage !== pageNum) {
			this.currentPage = pageNum;
			this.fetch();
		}
	};
	resolveCollision(page: number, route: string, replace: (target: string) => void) {
		let result = page;
		if (this.currentPage === 0) {
			this.setCurrentPage(result);
		} else if (page !== this.currentPage) {
			if (page > this.totalPages) {
				result = this.totalPages;
			}
			if (result <= 1) {
				result = 1;
			}
			this.setCurrentPage(result);
		}
		if (result !== page) {
			replace(`${route}${result}`);
		}
		return result;
	};
	get totalPages() {
		return Math.ceil(this.count / PER_PAGE);
	}
	getCurrentPage = () => {
		return this.currentPage;
	}
};

decorate(EventsListStore, {
	currentPage: observable,
	events: observable,
	setCurrentPage: action,
	totalPages: computed,
	fetch: action
});

export { EventsListStore };