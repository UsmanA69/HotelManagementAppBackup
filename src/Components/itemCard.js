import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  onValue,
  ref,
  database,
} from "../config/Firebase/Firebase";
import { CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GET_SELECTED_HOTEL } from "../config/Redux/Actions/actions";
import { useDispatch } from "react-redux";
import MuiAppBar from "./Navbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Footer from "./footer";

const ItemCard = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [item, setItem] = useState();

  const [price, setPrice] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [service, setService] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filterPrice = (event) => {
    setPrice(event.target.value);
    setService("");
    setNoOfRooms("");
    let a = event.target.value;
    console.log(a);
    const UpdatedArr = items.filter((x) => {
      return x.perDayPrice == a;
    });
    setItem(UpdatedArr);
  };

  const filterRooms = (event) => {
    setNoOfRooms(event.target.value);
    setPrice("");
    setService("");
    let a = event.target.value;
    let b = parseFloat(a);
    if (b == 0) {
      setItem(items);
    } else {
      const UpdatedArr = items.filter((curElem) => {
        return curElem.numOfRoomsAvailable == b;
      });
      setItem(UpdatedArr);
    }
  };

  const filterService = (event) => {
    setService(event.target.value);
    setPrice("");
    setNoOfRooms("");
    let a = event.target.value;
    const UpdatedArr = items.filter((x) => {
      return x.roomService == a;
    });
    setItem(UpdatedArr);
  };

  const addToCart = (elem) => {
    let roomData = elem;
    dispatch(GET_SELECTED_HOTEL(roomData));
    if (loggedIn) {
      navigate("/info");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    let arr = [];

    onValue(ref(database, "hotels/"), (snapshot) => {
      snapshot.forEach((snap) => {
        arr.push(snap.val());
      });
      setItems(arr);
      setItem(arr);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        onValue(
          ref(database, "users/" + user.uid + "/" + "UserData"),
          (snapshot) => {
            const data = snapshot.val();
            setName(data.name);
          }
        );
      } else {
        // setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {!item ? (
        <div className="loading-div" >
          <CircularProgress />
        </div>
      ) : (
        <>
          <MuiAppBar />
          <div className="data-items container-fluid mt-5">
            <div className="row">
              {loggedIn ? (
                <div style={{ paddingLeft: "5%", margin: "5px" }}>
                  <h1>
                    Welcome, <br /> {name}
                  </h1>
                  <h4>Book Your Favourite Room</h4>
                  <br />
                </div>
              ) : null}
              <div style={{ paddingLeft: "5%" }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl
                    sx={{
                      width: { xs: "100%", sm: "150px" },
                      mr: 2,
                      mt: { xs: 2, sm: 0 },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Price Per Day
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={price}
                      label="Price Per Day"
                      onChange={filterPrice}
                    >
                      {items.map((curElem) => {
                        const { perDayPrice } = curElem;
                        return (
                          <MenuItem value={perDayPrice}>
                            ${perDayPrice}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      mr: 2,
                      mt: { xs: 2, sm: 0 },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Numbers Of Room
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={noOfRooms}
                      label="Numbers Of Room"
                      onChange={filterRooms}
                    >
                      <MenuItem value={0}>All</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={4}>Four</MenuItem>
                      <MenuItem value={5}>Five</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: { xs: "100%", sm: "150px" },
                      mr: 2,
                      mt: { xs: 2, sm: 0 },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={service}
                      label="Service"
                      onChange={filterService}
                    >
                      {items.map((curElem) => {
                        const { roomService } = curElem;
                        return (
                          <MenuItem value={roomService}>{roomService}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              {/* {!item ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop:'100px'
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                
              )} */}
              <div className="col-11 mx-auto">
                <div className="row my-5">
                  {item.map((elem, index) => {
                    const {
                      roomName,
                      roomService,
                      numOfRoomsAvailable,
                      perDayPrice,
                      roomPicture,
                    } = elem;
                    return (
                      <div
                        key={index}
                        className="item1 col-12 col-md-6 col-lg-6 col-xl-4 my-5"
                      >
                        <div className="row item-inside">
                          <div className="col-12 col-md-12 col-lg-4 img-div">
                            <img
                              src={roomPicture}
                              alt={roomName}
                              className="img-fluid"
                            />
                          </div>

                          <div className="col-12 col-md-12 col-lg-8 hotel-details">
                            <div className="main-tittle pt-4 pb-3">
                              <h2>{roomName}</h2>
                              <p>
                                No Of Rooms Available : {numOfRoomsAvailable}
                              </p>
                              <p>Services : {roomService}</p>
                            </div>
                            <div className="price-and-add">
                              <div className="price-and-add-divide d-flex justify-content-between">
                                <h4>Price: ${perDayPrice} Per Day</h4>
                                <button
                                  onClick={() => addToCart(elem)}
                                  className="add-btn btn btn-outline-success"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ItemCard;
