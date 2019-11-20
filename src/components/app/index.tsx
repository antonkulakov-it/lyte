import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppRouter } from "../appRouter";
import { Navigation } from "../navigation";
import { Alerts } from "../common/alerts";
import { Loading } from "../common/loading";
import { LoadingStore } from "../../stores/loadingStore";
import { AlertsStore } from "../../stores/alertsStore";
import { DataProcessor } from "../../services/dataProcessor";
import storesList from "../../stores/storesList";
import { Container } from "react-bootstrap";

const alertsStore = new AlertsStore();
const loadingStore = new LoadingStore();
const dataProcessor = new DataProcessor(loadingStore, (message: any) => {
	alertsStore.addMessage({
		id: Date.now().toString(),
		type: "error",
		title: "Error",
		message: message.toString()
	});
});

const stores: any = {};
storesList.forEach((entry: {name: string, class: any}) => {
	stores[entry.name] = new entry.class(dataProcessor);
});

export class App extends React.Component {
  render() {
	return(
	  <Provider loadingStore={loadingStore} alertsStore={alertsStore} {...stores}>
		<div className="App">
			<Loading />
			<Router>
				<Container>
					<Navigation />
					<AppRouter />
					<Alerts />
				</Container>
			</Router>
		</div>
	  </Provider>
	);
  }
}
