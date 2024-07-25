import React from "react";
import { BiTask } from "react-icons/bi";

function Logo({ color = "white" }) {
  return (
    <div className={`text-${color}`}>
      <BiTask size={40} />
    </div>
  );
}

export default Logo;
