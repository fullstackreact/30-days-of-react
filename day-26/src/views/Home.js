import React from "react";

export const Home = ({ auth }) => (
  <div className="home">
    <h1>{auth.isLoggedIn ? "Welcome home!" : "You need to know the secret"}</h1>
  </div>
);

export default Home;
