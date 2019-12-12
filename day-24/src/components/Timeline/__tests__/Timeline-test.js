import React from "react";
import TestUtils from "react-dom/test-utils";
import Timeline from "../Timeline";

describe("Timeline", () => {
  it("wraps content in a div with .notificationsFrame class", () => {
    const wrapper = TestUtils.renderIntoDocument(<Timeline />);
    const node = TestUtils.findRenderedDOMComponentWithClass(
      wrapper,
      "notificationsFrame"
    );
  });
});
