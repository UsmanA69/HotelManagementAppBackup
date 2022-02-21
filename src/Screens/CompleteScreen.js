import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {auth, ref, database, onValue ,onAuthStateChanged } from "../config/Firebase/Firebase";
import { GET_BOOKING_DETAILS } from "../config/Redux/Actions/actions";

const CompleteScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const backToHome = () => {
    navigate("/");
  };

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Completed</h1>
      <button onClick={() => backToHome()}>Back To Home</button>
    </div>
  );
};

export default CompleteScreen;
