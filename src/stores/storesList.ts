import { EventsListStore } from "./eventsListStore";
import { EventEditStore } from "./eventEditStore";
import { SingleEventStore } from "./singleEventStore";
import { LoginStore } from "./loginStore";

const storesList = [
	{ name: "eventsListStore", class: EventsListStore },
	{ name: "eventEditStore", class: EventEditStore },
	{ name: "singleEventStore", class: SingleEventStore },
	{ name: "loginStore", class: LoginStore }
];

export default storesList;