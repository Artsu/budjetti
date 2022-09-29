import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";

import NavBar from "../src/components/NavBar/NavBar";
import Tabs from "../src/components/Tabs/Tabs";
import { store } from "../src/redux/store";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.css";

function BudjettiApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <section className="section">
        <div className="container">
          <NavBar />
          <Tabs />
          <Component {...pageProps} />
        </div>
      </section>
    </Provider>
  );
}

export default BudjettiApp;
