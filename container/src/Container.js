import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("login/Login"));
const Signup = React.lazy(() => import("signup/Signup"));
const Navigator = React.lazy(() => import("./Navigator"));

export const Container = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Container;
