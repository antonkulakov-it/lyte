import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppRouter } from "../appRouter";
import { Navigation } from "../navigation";
import { Spinner } from "../common/spinner";
import loadingStore from "../../stores/loadingStore";
import { DataProcessor } from "../../services/dataProcessor";
import { EventsListStore } from "../../stores/eventsListStore";
const dataProcessor = new DataProcessor(loadingStore);
const stores = {
  eventsListStore: new EventsListStore(dataProcessor)
};

export class App extends React.Component {
  render() {
    return (
      <Provider loadingStore={loadingStore} {...stores}>
        <div className="App">
          <Spinner />
          <Router>
            <Navigation />
            <AppRouter />
          </Router>
        </div>
      </Provider>
    );
  }
}
