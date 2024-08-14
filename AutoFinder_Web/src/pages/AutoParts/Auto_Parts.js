import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Bike from "../../assets/servicesImages/Auto.png";

const Auto_Part = () => {
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
      <h1>Auto Parts</h1>
      <div className="Bikes_Button">
        <button
          onClick={() =>
            user
              ? navigate("/Post_AutoPartAd?type=standard")
              : alert("Please Login First")
          }
        >
          Post Ad
        </button>
        <button onClick={() => navigate("/Buy_Auto_PartAd")}>
          Buy Auto Parts
        </button>
      </div>
    </div>
  );
};

export default Auto_Part;
