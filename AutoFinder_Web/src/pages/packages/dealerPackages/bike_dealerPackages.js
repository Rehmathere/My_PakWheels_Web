import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";
import "./dealerPackages.scss";

const Bike_dealerPackages = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        console.time("timer");
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAllbike"
        );
        console.timeLog("timer");
        setData(response.data.data);
        setIsLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleBuyPackage = (packageData) => {
    if (user) {
      const adData = {
        package: packageData._id,
        priceToPay: packageData.discountedRate,
        user: user._id,
        service: "004",
      };
      navigate("/Bike_selectPayment", {
        state: { adData },
      });
    } else {
      alert("Please Login First");
    }
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <div className={`DealerPackage ${isLoading ? "Fade-out" : "Fade-in"}`}>
        <h1>
          Bike Dealer Packages{" "}
          <i class="fa fa-car" style={{ fontSize: 24 }}></i>
        </h1>
        <div className="content">
          <div className="mainSide">
            <div className="packagesHolder">
              {data.length > 0 &&
                data.map((packagee) => (
                  <div className="packageCard">
                    <h2>{packagee.heading}</h2>
                    <p>
                      {" "}
                      <b>Package Name : </b> {packagee.packageType}{" "}
                    </p>
                    <p>
                      {" "}
                      <b>Premium Bundles : </b> {packagee.premiumBundles}{" "}
                    </p>
                    <p>
                      {" "}
                      <b>Booster Packs : </b> {packagee.freeBoosterPack}{" "}
                    </p>
                    <p>
                      {" "}
                      <b>Actural Price : </b> {packagee.actualPrice}{" "}
                    </p>
                    <p>
                      {" "}
                      <b>Discounted Price : </b> {packagee.discountedRate}
                    </p>
                    <p>
                      {" "}
                      <b>Saved : </b> {packagee.saved}{" "}
                    </p>
                    <button onClick={() => handleBuyPackage(packagee)}>
                      Buy Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <aside>
            <div>THIS IS SIDE DIV INSTRUCTIONS WILL COME HERE</div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Bike_dealerPackages;
