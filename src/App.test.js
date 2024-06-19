import React from 'react'; // Thêm dòng này để import React

import { act, render } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from './component/State/store';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

test("renders components", async () => {
  await act(async () => {
    render(
      <BrowserRouter basename="/React-app-CICD">
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  });
});

// import sum from "./sum";

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });