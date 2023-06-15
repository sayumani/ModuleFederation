import React from "react";
import ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Routes,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// import Login from "login/Login";
// import Signup from "signup/Signup";
import Container from './Container';


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path="signup" element={<Signup />} />
//       <Route path="login" element={<Login />} />
//       <Route path="/" element={<Container />} />
//     </Routes>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("demo"));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <Container />
  </React.StrictMode>
);
