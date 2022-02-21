import "../Css/cart.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useEffect, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  set,
  ref,
  database,
  push,
  update,
} from "../config/Firebase/Firebase";
import { child } from "firebase/database";

const DetailConfirmation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const myState = useSelector((state) => state.sendDataToPayment);
  const { UserData } = myState;

  const HotelSelectedState = useSelector((state) => state.getSelectedHotel);
  const { roomData } = HotelSelectedState;

  let userInformation = UserData;
  userInformation.roomName = roomData.roomName;
  userInformation.roomService = roomData.roomService;
  userInformation.perDayPrice = roomData.perDayPrice;

  const navigate = useNavigate();

  const {
    address,
    cnic,
    noOfDays,
    noOfPersons,
    perDayPrice,
    roomName,
    roomService,
    roomsWant,
  } = userInformation;
  const userRoomBookedinfrm = {
    address,
    cnic,
    noOfDays,
    noOfPersons,
    perDayPrice,
    roomName,
    roomService,
    roomsWant,
  };

  const handleCompletion = () => {
    console.log("working");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const Uid = user.uid;
        const newKey = push(child(ref(database), "bookedHotelinformation")).key;

        // set(
        //   ref(database, `users/${Uid}/` +  {newKey}),
        //   userRoomBookedinfrm
        // );
        const updates = {};
        // updates["/posts/" + newKey] = userRoomBookedinfrm;
        updates[
          "/users/" + Uid + "/" + "BookedRoom" + "/" + `BookedRoom${newKey}`
        ] = userRoomBookedinfrm;
        update(ref(database), updates);
        console.log("working 1");
      }
    });

    navigate("/completed");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const Uid = user.uid;

        setLoggedIn(true);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <div className="cart-main-container">
        <div className="header">
          <div className="back-arrow-div">
            <Link to="/info" style={{ color: "black" }}>
              <ArrowBackIcon className="arrow-icon" />
            </Link>
            <h5>Back </h5>
          </div>
          <div className="cart-icon-div">
            <FormatListBulletedIcon className="cart-icon" />
          </div>
        </div>
        <hr />

        <div className="body-div">
          <div className="heading-div">
            <h3>Confirm Your Details</h3>
          </div>
        </div>

        <div
          className="items-div"
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Room " + " : " + roomData.roomName}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Name" + " : " + UserData.name}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Contact Number" + " : " + UserData.phoneNumber}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Email" + " : " + UserData.email}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"CNIC" + " : " + UserData.cnic}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"No Of Persons" + " : " + UserData.noOfPersons}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"No Of Days" + " : " + UserData.noOfDays}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Rooms Booked" + " : " + UserData.roomsWant}
            />
          </div>
          <br />
          <div>
            <input
              style={{ textAlign: "center" }}
              disabled
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={"Address" + " : " + UserData.address}
            />
          </div>
          <br />
          <div class="col-sm-12" style={{ textAlign: "center" }}>
            <button
              onClick={() => handleCompletion()}
              className="btn btn-primary"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailConfirmation;
