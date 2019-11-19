import { observable, computed, action, decorate } from "mobx";
import { TAlertMessage, TAlertMessages } from "../../types";
const TIMEOUT = 10000;


class AlertsStore {
	// We may use the class Map, but it is no difference in this case
	queue: TAlertMessages = {};
	addMessage = (message: TAlertMessage) => {
		this.queue[message.id] = message;
		setTimeout(() => this.dropMessage(message.id), TIMEOUT);
	}
	getMessages = () => this.queue;
	dropMessage = (id: string) => {
		delete this.queue[id];
	}
}

decorate(AlertsStore, {
	queue: observable,
	addMessage: action
});

export { AlertsStore };
