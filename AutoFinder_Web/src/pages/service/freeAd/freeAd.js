import "./freeAd.scss";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
const FreeAd = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  const navigate = useNavigate();
  return (
    <div className="FreeAd">
      <section className="First">
        {/* <div className="heading">
          <h1>Sell Your Car Online In Pakistan Instantly</h1>
          <br />
          <h1>Choose How To Sell Your Car</h1>
        </div> */}
        {/* <div className="firstCardsCont">
          <div className="card">
            <h2>Post Your Ad on Autofinder</h2>
            <img
              src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png"
              alt="postad-img"
            />
            <br />
            <ul>
              <li>✔️ Post your Ad for Free in 3 Easy Steps</li>
            </ul>
            <button
              onClick={() =>
                user
                  ? navigate("/used-car/post-ad")
                  : alert("Please Login First")
              }
            >
              Post An Ad
            </button>
          </div>
        </div> */}
        {/* --- New --- */}
        <section className="serviceCardSection">
          <div className="serviceCardDiv">
            <h2
              style={{
                textAlign: "center",
                margin: "0em 0em 1em 0em",
                letterSpacing: "2px",
              }}
            >
              Post An Ad
            </h2>
            <br />
            <div className="cardHolder">
              <div
                className="serviceCard"
                onClick={() =>
                  user
                    ? navigate("/used-car/post-ad")
                    : alert("Please Login First")
                }
              >
                <div className="serviceImg freeAdsImage"></div>
                <p>Post Free Ad</p>
              </div>
              <div
                className="serviceCard"
                onClick={() =>
                  user
                    ? navigate("/used-car/post-ad_2")
                    : alert("Please Login First")
                }
              >
                <div className="serviceImg featuredAdImage"></div>
                <p>Post Featured Ad</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default FreeAd;
