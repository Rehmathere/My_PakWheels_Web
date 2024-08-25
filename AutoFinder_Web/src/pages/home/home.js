import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AutoParts/Auto_Parts.css";
import "./home.scss";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
// import "../AutoParts/Auto_Parts.css";
import ReactLoading from "react-loading";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [data_2, setData_2] = useState([]);
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
            limit: 3,
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
          // console.log(response.data.data);
          // setData_1(response.data.data);
          const limitedData = response.data.data.slice(5, 9);
          setData_2(limitedData);
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
  const handleNavigateToSingleCarAd_Bikes = (itemId) => {
    navigate(`/BuyBikes_Detail/${itemId}`);
  };
  // Windows
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Home">
      <section className="landing">
        <div className="bannerOverlay"></div>
        <h1>AUTO FINDER</h1>
        <h2>Elevate Your Drive With Unmatched Deals And Services</h2>
        <button onClick={() => navigate("/used-car/buy")}>Buy Now</button>
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
      {/* Popular New Bikes */}
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
      <br />
    </div>
  );
};

export default Home;
