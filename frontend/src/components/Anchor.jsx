import React from "react";

function Anchor(props) {
  return (
    <a
      href={props.link}
      className={`font-medium ${props.slate} hover:text-teal-300 focus-visible:text-teal-300`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${props.label} (opens in a new tab)`}
    >
      {props.label}
    </a>
  );
}


export default Anchor;
