import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {UserContext} from "../../context/userContext"
import "./user.scss";
const User = () => {

  const {user} = useContext(UserContext)

  useEffect(() => {
    if(!user){
      window.location.href = "/"
    }
  }, []);

  return (
    <div className="User">
      <div className="userPageNavBar">
        <NavLink to={"profile"}>My Profile</NavLink>
        <NavLink to={"ads"}>My Ads</NavLink>
        <NavLink to={"package"}>My Package</NavLink>
        <NavLink to={"favorite"}>Favorites</NavLink>
      </div>
      <div className="userPageOutlet">
        <Outlet context={[user]} />
      </div>
    </div>
  );
};

export default User;
