import "../Css/cart.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Link, useLocation } from "react-router-dom";
import EditProfileData from "../Components/editProfileData";

const EditProfile = () => {
  
  return (
    <>
      <div className="cart-main-container">
        <div className="header">
          <div className="back-arrow-div">
            <Link to="/" style={{ color: "black" }}>
              <ArrowBackIcon className="arrow-icon" />
            </Link>
            <h5>Back </h5>
          </div>
          <div className="cart-icon-div">
            {/* <ShoppingCartIcon className="cart-icon" /> */}
            <FormatListBulletedIcon className="cart-icon" />
          </div>
        </div>
        <hr />

        <div className="body-div">
          <div className="heading-div">
            <h3>Change Your Credentials</h3>
          </div>
        </div>

        <div
          className="items-div"
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <EditProfileData />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
