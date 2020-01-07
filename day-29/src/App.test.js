import React from "react";
import { render } from "@testing-library/react";
import App from "./containers/Root";

test("renders welcom home text", () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/welcome home/i);
  expect(textElement).toBeInTheDocument();
});
