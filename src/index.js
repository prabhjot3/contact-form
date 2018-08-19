// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import {Provider} from 'react-redux';
// import store from './ContactForm/components/ContactForm'

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import FieldLevelValidationForm from "./FieldLevelValidationForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Field-Level Validation</h2>
      <FieldLevelValidationForm onSubmit={showResults} />
      
    </div>
  </Provider>,
  rootEl
);

registerServiceWorker();
