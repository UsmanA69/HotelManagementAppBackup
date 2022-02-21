import "../Css/cart.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { onValue, ref, database,remove } from "../config/Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const DeleteRooms = () => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  let removeitem = (currentItem) =>{
    let currentItemKey = currentItem.key
    console.log(currentItem);
    remove(ref(database, `hotels/${currentItemKey}`))
    navigate("/")
  }

 

  useEffect(() => {
    let arr = [];

    onValue(ref(database, "hotels/"), (snapshot) => {
      snapshot.forEach((snap) => {
        arr.push(snap.val());
      });
      setRooms(arr);
      // console.log(rooms);
    });
  }, []);

  return (
    <>
      {rooms.map((curElem,i) => {
        const {
          numOfRoomsAvailable,
          perDayPrice,
          roomName,
          roomPicture,
          roomService,
        } = curElem;
        return (
          <>
            <div className="form-row" key={i} >
              <div className="form-group col-md-6">
                <label for="inputEmail4">Room Image</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value={roomPicture}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Room Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value={roomName}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Room Service</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value={roomService}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Number Of Rooms Available</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value={numOfRoomsAvailable}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Per Day Price</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value={perDayPrice}
                />
              </div>
              <br />
              <div class="form-group row">
                <div class="col-sm-10">
                  <button
                    class="btn btn-primary"
                    onClick={() => removeitem(curElem)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <br />
              <br />
            </div>
          </>
        );
      })}

      <br />
    </>
  );
};

export default DeleteRooms;
