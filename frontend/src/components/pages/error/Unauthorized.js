import React from "react";

function Unauthorized() {
  return (
    <div>
      <h1>401 Unauthorized</h1>
      <p>
        Sorry, you do not have permission to access this page. Login{" "}
        <a href="http://localhost:3000/login">here</a>
      </p>
    </div>
  );
}

export default Unauthorized;
