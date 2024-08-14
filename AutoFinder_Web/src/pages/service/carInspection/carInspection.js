import { useNavigate } from "react-router-dom";
import "./carInspection.scss";
import carInspectionFristSectionImage from "../../../assets/servicesImages/carInspection-FirstSectionImage.png";
import carInspectionThirdSectionImage from "../../../assets/servicesImages/carInspection-ThirdSectionImage.jpg";
import { useEffect } from "react";
const CarInspection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0,0)
  }, []);

  const service = "002";
  return (
    <div className="CarInspection">
      <section className="firstSection">
      <div className="displayImage">
          <img src={carInspectionFristSectionImage} alt="" />
        </div>
        <div className="heading-punchline">
          <h1>Car Inspection</h1>
          <h4>
            Get a detailed report on your car's interior, exterior,
            roadworthiness, and engine performance.
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
        <div className="subCont2">
            <p>
              Your Satisfaction Through Thorough Inspections And
              Reliable Assessments.
            </p>
          </div>
          {/* <span className="line"></span> */}
          <div className="subCont1">
            <div>
              <p>Extensive Report of Vehicle</p>
            </div>
            <div>
              <p>Skilled and Certified Staff</p>
            </div>
            <div>
              <p>Satisfied Inspection of Car</p>
            </div>
            <div>
              <p>Advanced Diagnostic Tools</p>
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
            <h3> <span>?</span> How Car Inspection Works</h3>
            <ul>
  <li>Visit our website or app to book a car inspection service by providing your vehicle details and contact information.</li>
  <li>Select a convenient time and location for the inspection. We offer flexible scheduling to fit your busy lifestyle.</li>
  <li>Our certified experts will come to your chosen location to thoroughly inspect your vehicle, ensuring all aspects are checked.</li>
  <li>Receive a comprehensive inspection report via WhatsApp and email within an hour, detailing the condition and recommendations.</li>
</ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarInspection;
