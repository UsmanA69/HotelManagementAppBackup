import "../Css/login-signup.css";
import CircularProgress from "@mui/material/CircularProgress";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  database,
  ref,
  set,
} from "../config/Firebase/Firebase";

const NewSignUp = () => {
  const [name, setName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleSubmition = (e) => {
    e.preventDefault();

    let dataObj = {
      name,
      email,
      contactNumber,
      password,
    };

    createUserWithEmailAndPassword(auth, dataObj.email, dataObj.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userUid = userCredential.user.uid;

        set(ref(database, "users/" + userUid + "/" + "UserData" ), dataObj);
        // set(ref(database, `users/${userUid}/UserData/${userUid}`), dataObj);
        navigate("/info");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
        // ..
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setUser(true);
      } else {
        setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="main-container">
          <div className="form-container">
            <div>
              <h1 style={{ fontWeight: "700", paddingTop: "50px" }}>Sign up</h1>
              <form
                autoComplete="off"
                method="POST"
                onSubmit={(e) => handleSubmition(e)}
              >
                <div className="form-div">
                  <div className="main-inp-div">
                    <p className="inp-label-txt">Name</p>
                    <div className="inp-div">
                      <AccountBoxIcon sx={{ color: "gray", opacity: "0.5" }} />
                      <input
                        required
                        autoComplete="false"
                        onChange={(e) => setName(e.target.value)}
                        type="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="main-inp-div">
                    <p className="inp-label-txt">Email</p>
                    <div className="inp-div">
                      <PersonOutlineIcon
                        sx={{ color: "gray", opacity: "0.5" }}
                      />
                      <input
                        required
                        autoComplete="false"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="main-inp-div">
                    <p className="inp-label-txt">Password</p>
                    <div className="inp-div">
                      <LockIcon sx={{ color: "gray", opacity: "0.5" }} />
                      <input
                        required
                        autoComplete="false"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="main-inp-div">
                    <p className="inp-label-txt">Phone Number</p>
                    <div className="inp-div">
                      <LocalPhoneIcon sx={{ color: "gray", opacity: "0.5" }} />
                      <input
                        required
                        autoComplete="false"
                        onChange={(e) => setContactNumber(e.target.value)}
                        type="numer"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="forgot-pass-div">
                    <p className="forgot-pass-txt">Forgot password?</p>
                  </div>
                  <div className="login-div">
                    <button className="login-button" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              <br />
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewSignUp;
