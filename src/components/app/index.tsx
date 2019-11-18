import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppRouter } from "../appRouter";
import { Navigation } from "../navigation";
import { Loading } from "../common/Loading";
import loadingStore from "../../stores/loadingStore";
import { DataProcessor } from "../../services/dataProcessor";
import { EventsListStore } from "../../stores/eventsListStore";
import { SingleEventStore } from "../../stores/singleEventStore";
const dataProcessor = new DataProcessor(loadingStore);

const storesConfig = [
	{ name: "eventsListStore", class: EventsListStore },
	{ name: "singleEventStore", class: SingleEventStore }
];

const stores: any = {};
[...storesConfig].forEach((entry: {name: string, class: any}) => {
	stores[entry.name] = new entry.class(dataProcessor);
});

export class App extends React.Component {
  render() {
	return (
	  <Provider loadingStore={loadingStore} {...stores}>
		<div className="App">
		  <Loading />
		  <Router>
			<Navigation />
			<AppRouter />
		  </Router>
		</div>
	  </Provider>
	);
  }
}
