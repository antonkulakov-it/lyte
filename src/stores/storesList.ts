import { ListStore } from "./listStore";
import { FormStore } from "./formStore";
import { SingleEventStore } from "./singleEventStore";
import { LoginStore } from "./loginStore";

const storesList = [
	{ name: "listStore", class: ListStore },
	{ name: "formStore", class: FormStore },
	{ name: "singleEventStore", class: SingleEventStore },
	{ name: "loginStore", class: LoginStore }
];

export default storesList;