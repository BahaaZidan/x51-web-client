import "./CenteredContent.css";

import React from "react";

const CenteredContent = (props: { children: any }) => (
  <div className="centeredContent">{props.children}</div>
);

export default CenteredContent;
