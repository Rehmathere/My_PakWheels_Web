import "./freeAd.scss"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
const FreeAd = () => {
  const {user} = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  const navigate = useNavigate()
  return ( 
    <div className="FreeAd">
      <section className="First">
        <div className="heading">
          <h1>Sell Your Car Online In Pakistan Instantly</h1>
          <h1>Choose How To Sell Your Car</h1>
        </div>
        <div className="firstCardsCont">
          <div className="card">
            <h1>Post Your Ad on Autofinder</h1>
            <img src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png" alt="postad-img" />
            <ul>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
            </ul>
            <button onClick={()=>user?navigate("/used-car/post-ad"):alert("Please Login First")}>Post An Ad</button>
          </div>
          <div className="card">
            <h1>Post Your Ad on Autofinder</h1>
            <img src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png" alt="postad-img" />
            <ul>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
            </ul>
            <button>Post An Ad</button>
          </div>
        </div>
      </section>
    </div>
   );
}
 
export default FreeAd;