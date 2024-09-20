import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AutoParts/Auto_Parts.css";
import "./home.scss";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
// import "../AutoParts/Auto_Parts.css";
import ReactLoading from "react-loading";
import axios from "axios";
// New Cars Logo Img
import honda from "../../assets/new cars logo/Honda.png"
import suzuki from "../../assets/new cars logo/Suzuki.png"
import toyota from "../../assets/new cars logo/Tyota.png"
import hyundai from "../../assets/new cars logo/hyundai.png"
import kia from "../../assets/new cars logo/kia.png"
import mg from "../../assets/new cars logo/mg.png"
import audi from "../../assets/new cars logo/audi.png"
import bmw from "../../assets/new cars logo/bmw.png"
import changan from "../../assets/new cars logo/changan.jpg"
import united from "../../assets/new cars logo/united.png"
import proton from "../../assets/new cars logo/proton.png"
import porche from "../../assets/new cars logo/porche.png"
import dfsk from "../../assets/new cars logo/DFSK.png"
import faw from "../../assets/new cars logo/FAW.png"
import isuzu from "../../assets/new cars logo/Isuzu.png"
import hava from "../../assets/new cars logo/hava.png"
import mercedes from "../../assets/new cars logo/mercedes.png"
import prince from "../../assets/new cars logo/prince.png"
import daehan from "../../assets/new cars logo/Daehan.png"
import jw_forland from "../../assets/new cars logo/JW-Forland.png"
import baic from "../../assets/new cars logo/baic.png"
import chery from "../../assets/new cars logo/chery.png"
import peugeot from "../../assets/new cars logo/peugeot.png"
import tesla from "../../assets/new cars logo/Tesla.png"

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [data_2, setData_2] = useState([]);
  const [data_3, setData_3] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [loadingMore, setLoadingMore] = useState(true);
  // Managed Ads
  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          {
            limit: 4,
          }
        );
        if (response.data.ok) {
          // console.log(response.data.data);
          setData(response.data.data);
          // setData((prevData) => [...prevData, ...response.data.data]);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);
  const handleNavigateToSingleCarAd_MangedAds = (itemId) => {
    navigate(`/used-car/detail/${itemId}`);
  };
  // Popular New Cars
  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/newCar"
        );
        if (response.data.ok) {
          // console.log(response.data.data);
          // setData_1(response.data.data);
          const limitedData = response.data.data.slice(0, 4);
          setData_1(limitedData);
          // setData((prevData) => [...prevData, ...response.data.data]);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);
  const handleNavigateToSingleCarAd_PopularNewCars = (itemId) => {
    navigate(`/My_NewCarsDetail_2/${itemId}`);
  };
  // Popular New Bikes
  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/bike/"
        );
        if (response.data.ok) {
          setData_2(response.data.data);
          setLoadingMore(false);
          // const limitedData = response.data.data.slice(5, 9);
          // setData_2(limitedData);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);
  const handleNavigateToSingleCarAd_Bikes = (itemId) => {
    navigate(`/BuyBikes_Detail/${itemId}`);
  };
  // Popular Auto Parts & Accessories
  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/autoPart/"
        );
        if (response.data.ok) {
          setData_3(response.data.data);
          setLoadingMore(false);
          // const limitedData = response.data.data.slice(5, 9);
          // setData_2(limitedData);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);
  const handleNavigateToSingleCarAd_Auto = (itemId) => {
    navigate(`/Buy_Auto_PartAd_Detail/${itemId}`);
  };
  // Windows
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Home">
      {/* Img */}
      <section className="landing">
        <div className="bannerOverlay"></div>
        <h1>
          AUTO <span>FINDER</span>
        </h1>
        <h2>Elevate Your Drive With Unmatched Deals And Services</h2>
        <button onClick={() => navigate("/used-car/buy")}>Buy Car Now</button>
      </section>
      {/* Img */}
      <br />
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
      <br />
      <br />
      <section className="serviceCardSection">
        <div className="serviceCardDiv">
          <h1>Services by Autofinder</h1>
          <br />
          <br />
          <div className="cardHolder">
            <div
              className="serviceCard"
              onClick={() => navigate("/service/free-ad")}
            >
              <div className="serviceImg freeAdsImage"></div>
              <p>Post Free Ad</p>
            </div>
            <div
              className="serviceCard"
              onClick={() => navigate("/service/free-ad")}
            >
              <div className="serviceImg featuredAdImage"></div>
              <p>Post Featured Ad</p>
            </div>
            <div
              className="serviceCard"
              onClick={() => navigate("/service/car-inspection")}
            >
              <div className="serviceImg carInspectionImage"></div>
              <p>Car Inspection Service</p>
            </div>
            <div
              className="serviceCard"
              onClick={() => navigate("/service/list-it-for-you")}
            >
              <div className="serviceImg listItForYouImage"></div>
              <p>List It For You</p>
            </div>
            <div
              className="serviceCard"
              onClick={() => navigate("/service/buy-car-for-me")}
            >
              <div className="serviceImg buyCarForMeImage"></div>
              <p>Buy Car For Me</p>
            </div>
            <div
              className="serviceCard"
              onClick={() => navigate("/service/car-rental")}
            >
              <div className="serviceImg carRentalImage"></div>
              <p>Car Rental Service</p>
            </div>
          </div>
        </div>
      </section>
      <br />
      {/* Mangaged Ads */}
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>Managed Ads By Auto Finder</h1>
        <p onClick={() => navigate("/used-car/buy")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        <div id="Home_New_Cars_Box_Parent_Sub">
          {!data && !noDataError && (
            <span className="loaderCont">
              <ReactLoading
                type={"bars"}
                color={"#cd0100"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          )}
          {data &&
            data.map((item) => (
              <div
                key={item._id}
                id="Home_New_Cars_Box"
                onClick={() => handleNavigateToSingleCarAd_MangedAds(item._id)}
              >
                <div id="Home_My_NewCar_imgHolder">
                  <img src={item.images[0]} alt="" />
                </div>
                <div id="Home_My_NewCar_detailHolder">
                  <span id="Home_My_New_adMake">{item.brand}</span>
                  <span id="Home_My_New_adMake_2">{item.model}</span>
                  <span id="Home_My_New_adPrice">PKR {item.price}</span>
                </div>
              </div>
            ))}
          {noDataError && <span className="loaderCont">No Data To Show</span>}
        </div>
      </div>
      {/* Featured Ads */}
      <br />
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>Featured Used Cars for Sale</h1>
        <p onClick={() => navigate("/used-car/buy")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        <div id="Home_New_Cars_Box_Parent_Sub">
          {/* {!data && !noDataError && (
            <span className="loaderCont">
              <ReactLoading
                type={"bars"}
                color={"#cd0100"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          )}
          {data &&
            data.map((item) => (
              <div
                key={item._id}
                id="Home_New_Cars_Box"
                onClick={() => handleNavigateToSingleCarAd_MangedAds(item._id)}
              >
                <div id="Home_My_NewCar_imgHolder">
                  <img src={item.images[0]} alt="" />
                </div>
                <div id="Home_My_NewCar_detailHolder">
                  <span id="Home_My_New_adMake">{item.brand}</span>
                  <span id="Home_My_New_adMake_2">{item.model}</span>
                  <span id="Home_My_New_adPrice">PKR {item.price}</span>
                </div>
              </div>
            ))}
          {noDataError && <span className="loaderCont">No Data To Show</span>} */}
        </div>
      </div>
      {/* Popular New Cars */}
      <br />
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>Popular New Cars</h1>
        <p onClick={() => navigate("/My_FindNewCars")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        <div id="Home_New_Cars_Box_Parent_Sub">
          {!data_1 && !noDataError && (
            <span className="loaderCont">
              <ReactLoading
                type={"bars"}
                color={"#cd0100"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          )}
          {data_1 &&
            data_1.map((item) => (
              <div
                key={item._id}
                id="Home_New_Cars_Box"
                onClick={() =>
                  handleNavigateToSingleCarAd_PopularNewCars(item._id)
                }
              >
                <div id="Home_My_NewCar_imgHolder">
                  <img src={item.image} alt="" />
                </div>
                <div id="Home_My_NewCar_detailHolder">
                  <span id="Home_My_New_adMake">{item.make}</span>
                  <span id="Home_My_New_adMake_2">{item.model}</span>
                  <span id="Home_My_New_adPrice">PKR {item.price}</span>
                </div>
              </div>
            ))}
          {noDataError && <span className="loaderCont">No Data To Show</span>}
        </div>
      </div>
      {/* New Cars By Make */}
      <br />
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>New Cars By Make</h1>
        <p onClick={() => navigate("/My_FindNewCars")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        {/* 1 - Logo Parent - */}
        <div id="Home_New_Cars_Box_Parent_Sub_Logo">
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={suzuki} alt="" />
            <p>Suzuki</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={toyota} alt="" />
            <p>Toyota</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={hyundai} alt="" />
            <p>Hyundai</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={mg} alt="" />
            <p>MG</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={kia} alt="" />
            <p>Kia</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={honda} alt="" />
            <p>Honda</p>
          </div>
        </div>
        {/* 2 - Logo Parent - */}
        <div id="Home_New_Cars_Box_Parent_Sub_Logo">
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={porche} alt="" />
            <p>Porche</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={proton} alt="" />
            <p>Proton</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={bmw} alt="" />
            <p>BMW</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={audi} alt="" />
            <p>Audi</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={united} alt="" />
            <p>United</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={changan} alt="" />
            <p>Changan</p>
          </div>
        </div>
        {/* 3 - Logo Parent - */}
        <div id="Home_New_Cars_Box_Parent_Sub_Logo">
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={dfsk} alt="" />
            <p>DFSK</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={isuzu} alt="" />
            <p>Isuzu</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={hava} alt="" />
            <p>Haval</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={faw} alt="" />
            <p>Faw</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={prince} alt="" />
            <p>Prince</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={mercedes} alt="" />
            <p>Mercedes</p>
          </div>
        </div>
        {/* 4 - Logo Parent - */}
        <div id="Home_New_Cars_Box_Parent_Sub_Logo">
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={daehan} alt="" />
            <p>Daehan</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={chery} alt="" />
            <p>Chery</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={peugeot} alt="" />
            <p>Peupoet</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={jw_forland} alt="" />
            <p>Forland</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={tesla} alt="" />
            <p>Tesla</p>
          </div>
          {/* Logo Box */}
          <div id="Home_New_Cars_Logo_Boxed">
            <img src={baic} alt="" />
            <p>Baic</p>
          </div>
        </div>
      </div>
      {/* Popular New Bikes */}
      <br />
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>Popular New Bikes</h1>
        <p onClick={() => navigate("/bikes/used/buy")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        <div id="Home_New_Cars_Box_Parent_Sub">
          {!data_2 && !noDataError && (
            <span className="loaderCont">
              <ReactLoading
                type={"bars"}
                color={"#cd0100"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          )}
          {data_2 &&
            data_2.map((item) => (
              <div
                key={item._id}
                id="Home_New_Cars_Box"
                onClick={() => handleNavigateToSingleCarAd_Bikes(item._id)}
              >
                <div id="Home_My_NewCar_imgHolder">
                  <img src={item.images[0]} alt="" />
                </div>
                <div id="Home_My_NewCar_detailHolder">
                  <span id="Home_My_New_adMake">{item.brand}</span>
                  <span id="Home_My_New_adMake_2">{item.model}</span>
                  <span id="Home_My_New_adPrice">PKR {item.price}</span>
                </div>
              </div>
            ))}
          {noDataError && <span className="loaderCont">No Data To Show</span>}
        </div>
      </div>
      <br />
      {/* Popular Auto Parts */}
      <br />
      <br />
      <br />
      <div id="Heading_Parent">
        <h1>Popular Auto Parts & Accessories</h1>
        <p onClick={() => navigate("/Buy_Auto_PartAd")}>View All</p>
      </div>
      <div id="Home_New_Cars_Box_Parent">
        <div id="Home_New_Cars_Box_Parent_Sub">
          {!data_3 && !noDataError && (
            <span className="loaderCont">
              <ReactLoading
                type={"bars"}
                color={"#cd0100"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          )}
          {data_3 &&
            data_3.map((item) => (
              <div
                key={item._id}
                id="Home_New_Cars_Box"
                onClick={() => handleNavigateToSingleCarAd_Auto(item._id)}
              >
                <div id="Home_My_NewCar_imgHolder">
                  <img src={item.images[0]} alt="" />
                </div>
                <div id="Home_My_NewCar_detailHolder">
                  <span id="Home_My_New_adMake">
                    {" "}
                    {item.title} {item.year}
                  </span>
                  <span id="Home_My_New_adMake_2">{item.location}</span>
                  <span id="Home_My_New_adPrice">PKR {item.price}</span>
                </div>
              </div>
            ))}
          {noDataError && <span className="loaderCont">No Data To Show</span>}
        </div>
      </div>

      {/* -- End -- */}
      <br />
      <br />
      {/* -- End -- */}
    </div>
  );
};

export default Home;
