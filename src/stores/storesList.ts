import { EventsListStore } from "./eventsListStore";
import { SingleEventStore } from "./singleEventStore";
import { LoginStore } from "./loginStore";

const storesList = [
	{ name: "eventsListStore", class: EventsListStore },
	{ name: "singleEventStore", class: SingleEventStore },
	{ name: "loginStore", class: LoginStore }
];

export default storesList;