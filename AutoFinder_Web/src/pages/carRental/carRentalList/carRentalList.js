import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./buyNow.scss";
import { GeoAltFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Filter from "../../../components/filter/filter";


const CarRentalList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carRentalAd/getAll"
        );
        console.log(response.data);
        if (response.data.ok) {
          if (response.data.data.length < 1) {
            setNoDataError("No Data Found");
          }
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/filter",
        filterData
      );
      console.log(response.data);
      if (response.data.ok) {
        if (response.data.data.length > 0) {
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setNoDataError("No Data To Show");
          setData([]);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleNavigateToSingleCarAd = (Id) => {
    navigate("/service/car-rental/listings/" + Id);
  };

  return (
    <div className="CarRentalList">
      <div className="BuyNow">
        <div className="pageHeadingCont">
          <h1>Rent a Car</h1>
        </div>
        <div className="underHeadingCont">
          <aside className="filterCont" style={{ border: "0px solid transparent", }}>
            <Filter onFilterApply={handleFilterApply} />
          </aside>

          <div className="carAdsCont">
            {noDataError && <span className="loaderCont">NO DATA TO SHOW</span>}
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
                  className="adCard"
                  onClick={() => handleNavigateToSingleCarAd(item._id)}
                >
                  <div className="imgHolder">
                    <img src={item.images[0]} alt="" />
                  </div>
                  <div className="detailHolder">
                    <h4 className="adTitle">
                      {item.Brand} {item.Model} {item.Year} {item.Variant}
                    </h4>
                    <p> {item.city}</p>
                    <p>
                      {item.mileage} km | {item.carType} | {item.engineType} |{" "}
                      {item.driverAvailability}{" "}
                    </p>
                    <p>
                      {" "}
                      posted {formatDistanceToNow(
                        new Date(item.createdAt)
                      )} ago{" "}
                    </p>
                    <h4 className="adPrice">{item.price}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalList;
