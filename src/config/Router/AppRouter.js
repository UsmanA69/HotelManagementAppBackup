import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRoom from "../../Screens/AddRoom";
import Cart from "../../Screens/Cart";
import CompleteScreen from "../../Screens/CompleteScreen";
import Dashboard from "../../Screens/dashboard";
import DeleteRooms from "../../Screens/deleteRoom";
import EditProfile from "../../Screens/editProfile";
import Home from "../../Screens/home";
import NewLogin from "../../Screens/NewLogin";
import NewSignUp from "../../Screens/NewSignUp";
import UserBookingDetails from "../../Screens/userBookingDetails";
import DetailConfirmation from "../../Screens/userDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/signup" element={<NewSignUp />} />
        <Route path="/info" element={<Cart />} />
        <Route path="/confirm-detail" element={<DetailConfirmation />} />
        <Route path="/completed" element={<CompleteScreen />} />
        <Route path="/booking-details" element={<UserBookingDetails />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addroom" element={<AddRoom />} />
          <Route path="deleterooms" element={<DeleteRooms />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
