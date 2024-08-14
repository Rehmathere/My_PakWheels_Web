import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import CarModelPicker from "../../components/carModelPicker/carModelPicker"


const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Home">
      <section className="landing">
        <div className="bannerOverlay"></div>
        <h1>AUTO FINDER</h1>
        <h2>Elevate Your Drive With Unmatched Deals And Services</h2>
        <button onClick={()=>navigate("/used-car/buy")}>Buy Now</button>
      </section>
      <section className="widgets">
        <div className="widgetsContainer">
          <h1>Sell Your Car On Autofinder And Find the best Price</h1>
          <div className="childHolder">
            <div className="widget-child1">
              <h2>Post Your Ad On Autofinder</h2>
              <ul>
                <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
                <li>✔️ Get Genuine offers from Verified Buyers</li>
                <li>✔️ Sell your car Fast at the Best Price</li>
              </ul>
              <div className="btnHolder">
              <button>Post Your Ad</button>

              </div>
            </div>
            <div className="widget-child2">
              <h2>Post Your Ad On Autofinder</h2>
              <ul>
                <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
                <li>✔️ Get Genuine offers from Verified Buyers</li>
                <li>✔️ Sell your car Fast at the Best Price</li>
              </ul>
              <div className="btnHolder">
              <button>Register Your Car</button>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="serviceCardSection">
        <div className="serviceCardDiv">
          <h1>Services by Autofinder</h1>
          <div className="cardHolder">
            <div className="serviceCard" onClick={()=>navigate("/service/free-ad")}>
              <div className="serviceImg freeAdsImage"></div>
              <p>Post Free Ad</p>
            </div>
            <div className="serviceCard" onClick={()=>navigate("/service/free-ad")}>
              <div className="serviceImg featuredAdImage"></div>
              <p>Post Featured Ad</p>
            </div>
            <div className="serviceCard" onClick={()=>navigate("/service/car-inspection")}>
              <div className="serviceImg carInspectionImage"></div>
              <p>Car Inspection Service</p>
            </div>
            <div className="serviceCard" onClick={()=>navigate("/service/list-it-for-you")}>
            <div className="serviceImg listItForYouImage"></div>
              <p>List It For You</p>
            </div>
            <div className="serviceCard" onClick={()=>navigate("/service/buy-car-for-me")}>
            <div className="serviceImg buyCarForMeImage"></div>
              <p>Buy Car For Me</p>
            </div>
            <div className="serviceCard" onClick={()=>navigate("/service/car-rental")}>
            <div className="serviceImg carRentalImage"></div>
              <p>Car Rental Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
