import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import NotFoundImg from "../assets/images/maintenance.svg";

const NotFoundPage = () => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // redirect to /
  if (timer === 0) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <img
        style={{
          width: "50%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={NotFoundImg}
        alt="not found"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          color: "#556ee6",
          fontSize: "5rem",
          fontWeight: "bold",
        }}
      >
        <div>404 Not Found</div>
        <span
          style={{
            fontSize: "1.7rem",
            fontWeight: "normal",
            marginLeft: "1rem",
            color: "#000",
          }}
        >
          Redirecting to home page in {timer} seconds
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
