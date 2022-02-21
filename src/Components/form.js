import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { SEND_DATA_TO_PAYMENT } from "../config/Redux/Actions/actions";
import {
  auth,
  onAuthStateChanged,
  onValue,
  ref,
  database,
} from "../config/Firebase/Firebase";

const Form = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [newUserData, setNewUserData] = useState([]);

  const [cnic, setCnic] = useState();
  const [noOfPersons, setNoOfPersons] = useState();
  const [noOfDays, setNoOfDays] = useState();
  const [roomsWant, setRoomsWant] = useState();
  const [address, setAddress] = useState();

  // const HotelSelectedState = useSelector((state) => state.getSelectedHotel);
  // const { roomData } = HotelSelectedState;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  let UserData = {
    cnic,
    noOfPersons,
    noOfDays,
    roomsWant,
    address,
  };
  UserData.name = newUserData.name;
  UserData.email = newUserData.email;
  UserData.phoneNumber = newUserData.phoneNumber;

  const handleSubmition = (e) => {
    e.preventDefault();
    dispatch(SEND_DATA_TO_PAYMENT(UserData));
    navigate("/confirm-detail");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const Uid = user.uid;
        onValue(
          ref(database, "users/" + Uid  + "/" +"UserData"  ),
          (snapshot) => {
            setNewUserData(snapshot.val());
          }
        );
        setLoggedIn(true);
      } else {
        navigate("/login");
        // User is signed out
      }
    });
  }, []);
  return (
    <>
      <form onSubmit={(e) => handleSubmition(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <input
              type="name"
              className="form-control"
              id="inputEmail4"
              placeholder="Name"
              disabled
              value={newUserData.name}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Contact Number</label>
            <input
              type="number"
              className="form-control"
              id="inputPassword4"
              placeholder="Contact Number"
              disabled
              value={newUserData.contactNumber}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputPassword4"
              placeholder="Email"
              disabled
              value={newUserData.email}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">CNIC</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              required
              placeholder="CNIC"
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">No of Persons</label>
            <input
              type="number"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="Type in Numbers **"
              onChange={(e) => setNoOfPersons(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">No of Days to Stay</label>
            <input
              type="number"
              className="form-control"
              id="inputPassword4"
              required
              placeholder="Type in Numbers **"
              onChange={(e) => setNoOfDays(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">No OF Rooms</label>
            <input
              type="number"
              className="form-control"
              id="inputPassword4"
              required
              placeholder="Type How Many Rooms you Want to Book  in Number**"
              onChange={(e) => setRoomsWant(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              required
              placeholder="i.e: 1234 Main St"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputPassword4">Payment Method</label>
            <input
              type="number"
              className="form-control"
              id="inputPassword4"
              placeholder="Cash On Reception"
              onChange={(e) => setNoOfDays(e.target.value)}
              disabled
            />
          </div>
        </div>
        <br />
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">
              Proceed
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
