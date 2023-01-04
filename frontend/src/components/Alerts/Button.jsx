import React from "react";

const Button = ({ href, label, color = "body-color" }) => {
  return (
    <>
      <a
        href={href}
        className={`mr-6 inline-block text-sm font-medium text-${color}`}
      >
        {label}
      </a>
    </>
  );
};

export default Button;
