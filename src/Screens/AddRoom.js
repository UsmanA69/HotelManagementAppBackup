import "../Css/cart.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";
import {
  set,
  ref,
  database,
  storage,
  push,
  child,
} from "../config/Firebase/Firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";

const AddRoom = () => {
  const [roomName, setRoomName] = useState();
  const [roomService, setRoomService] = useState();
  const [numOfRoomsAvailable, setNumOfRoomsAvailable] = useState();
  const [perDayPrice, setPerDayPrice] = useState();
  const [roomPicture, setRoomPicture] = useState("");
  const [pregress, setPregress] = useState(0);

  const handlePictureSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadImage(file);
    // navigate("/");
  };

  const navigate = useNavigate();

  const uploadImage = (file) => {
    if (!file) return;
    const storageRef = sRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPregress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setRoomPicture(url)
        );
      }
    );
  };

  const key = push(child(ref(database), "hotels")).key;

  let hotelData = {
    key,
    roomName,
    roomService,
    numOfRoomsAvailable,
    perDayPrice,
    roomPicture,
  };

  const handleSubmition = (e) => {
    e.preventDefault();
    set(ref(database, "hotels/" + key), hotelData);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={(e) => handlePictureSubmit(e)}>
        <div class="col-md-8 col-lg-2">
          <label for="formFile" className="form-label">
            Hotel Picture
          </label>
          <input required className="form-control" type="file" id="formFile" />
          <button type="submit" className="btn btn-primary m-2">
            Submit {pregress}%{" "}
          </button>
        </div>
      </form>
      <form onSubmit={(e) => handleSubmition(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Room Name</label>
            <input
              type="name"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Room Service</label>
            <input
              type="name"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="Room Service"
              onChange={(e) => setRoomService(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Number Of Rooms Available</label>
            <input
              type="number"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="Num Of Rooms Available"
              onChange={(e) => setNumOfRoomsAvailable(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Per Day Price</label>
            <input
              type="name"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="Per Day Price"
              onChange={(e) => setPerDayPrice(e.target.value)}
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

export default AddRoom;
