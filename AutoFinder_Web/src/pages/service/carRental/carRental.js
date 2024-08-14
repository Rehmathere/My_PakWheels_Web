import { useNavigate } from "react-router-dom";
import carInspectionFristSectionImage from "../../../assets/servicesImages/carInspection-FirstSectionImage.png";
import "./carRental.scss";

const CarRental = () => {
  const navigate = useNavigate();
  return (
    <div className="CarRental">
      <section className="firstSection">
        <div className="displayImage">
          <img src={carInspectionFristSectionImage} alt="" />
        </div>
        <div className="heading-punchline">
          <h1>Car on Rent</h1>
          <h4>
            Wide range of rental cars for every journey—choose, book, and drive
            hassle-free.
          </h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => navigate("/service/car-rental/post-ad")}>
              Post Ad
            </button>

            <button onClick={() => navigate("/service/car-rental/listings")}>
              Rent a Car
            </button>
          </div>
        </div>
      </section>
      <section className="secondSection">
        <div className="cont">
          <div className="subCont2">
            <p>
              Your Journey Made Easy with Flexible Rentals and Affordable Rates.
            </p>
          </div>
          {/* <span className="line"></span> */}
          <div className="subCont1">
            <div>
              <p>Easy Booking Process</p>
            </div>
            <div>
              <p>Transparent Pricing</p>
            </div>
            <div>
              <p>Hassle-Free Service</p>
            </div>
            <div>
              <p>Wide Selection of Vehicles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarRental;
