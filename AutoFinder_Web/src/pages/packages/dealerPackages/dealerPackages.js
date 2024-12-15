import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";
import "./dealerPackages.scss";

const DealerPackages = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        console.time("timer");
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAll"
        );
        console.timeLog("timer");
        // Sort data based on the numeric value of the heading
        const sortedData = response.data.data.sort((a, b) => {
          const headingA = parseInt(a.heading, 10);
          const headingB = parseInt(b.heading, 10);
          return headingA - headingB;
        });
        setData(sortedData);
        setIsLoading(false);
        console.log(sortedData);
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
      navigate("/select-payment-method", {
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
          Car Dealer Packages{"  "}
          &nbsp;<i class="fa fa-car" style={{ fontSize: 40 }}></i>
        </h1>
        <div className="content">
          <div className="mainSide">
            <div className="packagesHolder">
              {data.length > 0 &&
                data.map((packagee) => (
                  <div key={packagee._id} className="packageCard">
                    <div id="Parent_Heading">
                      <h2>{packagee.heading}</h2>
                    </div>
                    <p>
                      <span>Package Name : </span> &nbsp;
                      {packagee.packageType}
                    </p>
                    <p>
                      <span>Booster Packs : </span> &nbsp;
                      {packagee.freeBoosterPack}
                    </p>
                    <p>
                      <span>Actual Price : </span> &nbsp;
                      {packagee.actualPrice}
                    </p>
                    <p>
                      <span>Discounted Price : &nbsp; </span>
                      {packagee.discountedRate}
                    </p>
                    <p>
                      <span>Saved : </span> &nbsp; {packagee.saved}
                    </p>
                    <button onClick={() => handleBuyPackage(packagee)}>
                      Buy Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {/* <aside>
            <div>THIS IS SIDE DIV INSTRUCTIONS WILL COME HERE</div>
          </aside> */}
        </div>
      </div>
    </>
  );
};

export default DealerPackages;
