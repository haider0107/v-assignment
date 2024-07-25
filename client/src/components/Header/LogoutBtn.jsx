import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { logoutUser } from "../../service/authService";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    logoutUser().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 ml-1 bg-blue-100 font-semibold hover:bg-blue-200 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
