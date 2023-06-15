import React from "react";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <div>
      <h2>App Switcher</h2>
      <Link to="/login" style={{ padding: 5 }}>
        Login
      </Link>
      <Link to="/signup" style={{ padding: 5 }}>
        Signup
      </Link>
    </div>
  );
};

export default Navigator;
