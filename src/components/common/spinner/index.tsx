import * as React from "react";
import { observer, inject } from "mobx-react";

export const Spinner = inject("loadingStore")(
  observer(({ loadingStore }) => {
    return (
      <div
        className={`spinner ${
          loadingStore.loading ? "spinner-loading" : ""
        }`}
      />
    );
  })
);