import { useEffect, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  onValue,
  ref,
  set,
  database,
  update
} from "../config/Firebase/Firebase";

const EditProfileData = () => {
  const [userData, setUserData] = useState([]);
  const [uid, setUid] = useState("");
  const [editData, setEditData] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

    const handleEditData = (e) => {
        e.preventDefault()
        const newUserData ={
            name,
            email,
            contactNumber
        }

        const updates = {};
        updates["/users/" + uid + "/" + "UserData" ] = newUserData;
        update(ref(database), updates)


        // set(ref(database, "users/" + uid), newUserData);
    };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const Uid = user.uid;
        setUid(Uid);
        onValue(ref(database, "users/" + Uid  + "/" +"UserData"), (snapshot) => {
          const databaseData = snapshot.val();
          //   const { name, contactNumber, email } = databaseData;
          const newDatabaseData = {
            dbName: databaseData.name,
            dbContactNumber: databaseData.contactNumber,
            dbEmail: databaseData.email,
          };

          setUserData(newDatabaseData);
        });
      }
    });
  }, []);

  return (
    <>
      {!editData ? (
        <>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Name</label>
              <input
                type="name"
                className="form-control"
                id="inputEmail4"
                placeholder="Name"
                required
                readOnly
                value={userData.dbName}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Contact Number</label>
              <input
                type="number"
                className="form-control"
                id="inputPassword4"
                placeholder="Contact Number"
                required
                readOnly
                value={userData.dbContactNumber}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputPassword4"
                placeholder="Email"
                required
                readOnly
                value={userData.dbEmail}
              />
            </div>
          </div>
          <br />
          <div class="form-group row">
            <div class="col-sm-10">
              <button class="btn btn-primary" onClick={() => setEditData(true)}>
                Edit Data
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={(e)=>handleEditData(e)}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Name"
                  required
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Contact Number"
                  required
                  onChange={(e)=>setContactNumber(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
          <br />
        </>
      )}
    </>
  );
};

export default EditProfileData;
