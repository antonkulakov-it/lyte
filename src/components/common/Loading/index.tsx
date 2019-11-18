import * as React from "react";
import { observer, inject } from "mobx-react";
import { Spinner } from "react-bootstrap";

export const Loading = inject("loadingStore")(
  observer(({ loadingStore }) => {
    return (
      <div
        className={`spinner ${
          loadingStore.loading ? "spinner-loading" : ""
        }`}
      >
        <Spinner animation="border" />
      </div>
    );
  })
);