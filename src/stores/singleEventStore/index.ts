import { observable, action, decorate } from "mobx";
import { DataProcessor } from "../../services/dataProcessor";
import { IEvent } from "../../types";

class SingleEventStore {
	private _dataProcessor: DataProcessor;
	details: IEvent | null = null;
	eventId: number = 0;

	constructor(dataProcessor: DataProcessor) {
		this._dataProcessor = dataProcessor;
	}

	async fetch() {
		this.details = await this._dataProcessor.getEvent(
			this.eventId.toString()
		) as IEvent;
	}
	getDetails() {
		return this.details;
	}
	setCurrentEventId = (eventId: number) => {
		if (this.eventId !== eventId) {
			this.eventId = eventId;
			this.details = null;
			this.fetch();
		}
	};
}

decorate(SingleEventStore, {
	details: observable,
	eventId: observable,
	setCurrentEventId: action,
	fetch: action
})

export { SingleEventStore };