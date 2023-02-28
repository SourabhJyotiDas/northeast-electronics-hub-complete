import React from "react";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="primaryText h-[100vh] flex justify-center items-center text-2xl  bg-gradient-to-b from-purple-900 to-purple-300">
      <a  href="mailto:dassourabh126@gmail.com">
        <Button >Contact: dassourabh126@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
