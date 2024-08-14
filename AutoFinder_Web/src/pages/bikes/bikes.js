import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "../AutoParts/Auto_Parts.css";
import Bike from "../../assets/servicesImages/Bike.png";

const Bikes = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="Bikes">
      {/* Image */}
      <div id="Img_Parent">
        <div id="Sub_Img_Parent">
          <img src={Bike} alt="NA" />
        </div>
      </div>
      {/* Image */}
      <h1>Bikes</h1>
      <div className="Bikes_Button">
        <button
          onClick={() =>
            user
              ? navigate("/bikes/used/postAd?type=standard")
              : alert("Please Login First")
          }
        >
          Post Ad
        </button>
        <button onClick={() => navigate("/bikes/used/buy")}>Buy Bikes</button>
        {/* Dealer Package */}
        <button onClick={() => navigate("/packages/Bike_dealerPackages")}>
          Packages
        </button>
      </div>
    </div>
  );
};

export default Bikes;
