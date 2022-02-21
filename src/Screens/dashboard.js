import "../Css/cart.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersistentDrawerRight from "../Components/drawer";

const Dashboard = () => {
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
            {/* <FormatListBulletedIcon className="cart-icon" /> */}
            <PersistentDrawerRight className="cart-icon"/>
          </div>
        </div>
        <hr />

        <div className="body-div">
          <div className="heading-div">
            <h3>Dashboard</h3>
          </div>
        </div>

        <div
          className="items-div"
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
