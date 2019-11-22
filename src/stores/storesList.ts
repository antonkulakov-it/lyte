import { ListStore } from "./listStore";
import { EventEditStore } from "./eventEditStore";
import { SingleEventStore } from "./singleEventStore";
import { LoginStore } from "./loginStore";

const storesList = [
	{ name: "listStore", class: ListStore },
	{ name: "eventEditStore", class: EventEditStore },
	{ name: "singleEventStore", class: SingleEventStore },
	{ name: "loginStore", class: LoginStore }
];

export default storesList;