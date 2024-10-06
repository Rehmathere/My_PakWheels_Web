import { useNavigate } from "react-router-dom";
import carInspectionFristSectionImage from "../../../assets/servicesImages/carInspection-FirstSectionImage.png";
import carInspectionThirdSectionImage from "../../../assets/servicesImages/carInspection-ThirdSectionImage.jpg";
import { useEffect } from "react";

const ListItForYou = () => {
  const navigate = useNavigate();
  const service = "001";

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="CarInspection">
      <section className="firstSection">
      <div className="displayImage">
          <img src={carInspectionFristSectionImage} alt="" />
        </div>
        <div className="heading-punchline">
          <h1>List It For You</h1>
          <h4>
            Professionally trained specialists are designated to facilitate the
            sale of every vehicle.
          </h4>
          {/* <button
            onClick={() =>
              navigate("/service/request", { state: { service: service } })
            }
          >
            Get Started
          </button> */}
          <button
            onClick={() =>
              navigate("/PostAd_ListitForyou")
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
              {/* <span>
              &#8220;
              </span> */}
              Effortlessly list your car for sale with our convenient listing service.
              {/* <span>
              &#8221;
              </span> */}
            </p>
          </div>
          <div className="subCont1">
            <div>
              <p>Professional Sales Executives</p>
            </div>
            <div>
              <p>Tension Free Service</p>
            </div>
            <div>
              <p>Your Car Your Price</p>
            </div>
            <div>
              <p>Peaceful Transaction of Your Money</p>
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
                Our team will come to your location, capture photos, get information, conduct a thorough inspection and create a car listing on your behalf.
              </li>
              <li>
                Your advertisement is prominently premium and promoted throughout the Autofinder website and mobile app.
              </li>
              <li>
                We handle everything, including answering calls, managing offers and conducting negotiations on your behalf.
              </li>
              <li>
                After finalizing the deal we guarantee a secure transfer of payment.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListItForYou;
