import React from "react";

import Hour from "./Hour";
import Minute from "./Minute";
import Second from "./Second";
import Ampm from "./Ampm";
import Separator from "./Separator";

const Formatter = props => {
  let children = props.format.split("").map(e => {
    if (e === "h") {
      return <Hour />;
    } else if (e === "m") {
      return <Minute />;
    } else if (e === "s") {
      return <Second />;
    } else if (e === "p") {
      return <Ampm />;
    } else if (e === " ") {
      return <span> </span>;
    } else {
      return <Separator />;
    }
  });
  return (
    <span>
      {React.Children.map(children, c => React.cloneElement(c, props))}
    </span>
  );
};

export default Formatter;
