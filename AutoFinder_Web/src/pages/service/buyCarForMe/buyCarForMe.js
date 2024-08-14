import { useNavigate } from "react-router-dom";
import carInspectionFristSectionImage from "../../../assets/servicesImages/carInspection-FirstSectionImage.png";
import carInspectionThirdSectionImage from "../../../assets/servicesImages/carInspection-ThirdSectionImage.jpg";
import { useEffect } from "react";

const BuyCarForMe = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const service = "003";

  return (
    <div className="CarInspection">
      <section className="firstSection">
      <div className="displayImage">
          <img src={carInspectionFristSectionImage} alt="" />
        </div>
        <div className="heading-punchline">
          <h1>Buy Car For Me</h1>
          <h4>
            Professionally trained specialists are designated to facilitate the
            sale of every vehicle.
          </h4>
          <button
            onClick={() =>
              navigate("/service/request", { state: { service: service } })
            }
          >
            Get Started
          </button>
        </div>
        
      </section>
      <section className="secondSection">
        <div className="cont">
          {/* <span className="line"></span> */}
          <div className="subCont2">
            <p>
              {/* <span>&#8220;</span> */}
              Let our experts find and buy the perfect car for you.
              {/* <span>&#8221;</span> */}
            </p>
          </div>
          <div className="subCont1">
            <div>
              <p>Personalized Consultation</p>
            </div>
            <div>
              <p>Extensive Vehicle Search</p>
            </div>
            <div>
              <p>Professional Pruchase Executives</p>
            </div>
            <div>
              <p>Seamless Documentation and Delivery</p>
            </div>
          </div>
          
        </div>
      </section>
      <section className="thirdSection">
        <div className="cont">
          <div className="imageCont">
            <img src={carInspectionThirdSectionImage} alt="" />
          </div>
          <div className="detailCont">
            <h3>
              {" "}
              <span>?</span> How This Will Happen
            </h3>
            <ul>
              <li>
                Our team will contact you to gather all the details about
                your desired future car.
              </li>
              <li>
                We will discuss your preferences, including make, model,
                budget, and any specific requirements.
              </li>
              <li>
                You will need to make an initial payment using one of our
                convenient payment channels.
              </li>
              <li>
                Choose from various payment options available, designed to
                fit your convenience and security needs.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyCarForMe;
