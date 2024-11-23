"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div data-testid="provider">{children}</div>
    </Provider>
  );
}

export default Providers;
