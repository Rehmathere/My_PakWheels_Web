import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./buyBikes.scss";

import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import LoaderComponent from "../../../../components/loaderComponent/loaderComponent";
// Bike Filter
import Filter_Bike from "../../../../components/filter/filter_Bike";


const BuyBikes = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        // const response = await axios.get("http://localhost:8000/api/bike");
        const response = await axios.get("https://autofinder-backend.vercel.app/api/bike/");
        if (response.data.ok) {
          console.log(response.data.data);
          setData((prevData) => [...prevData, ...response.data.data]);
          setIsLoading(false);
          setLoadingMore(false);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
        setIsLoading(false);
        setLoadingMore(false);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);

  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/BuyBikes_Detail/${itemId}`);
  };

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/bike/filter",
        // "http://localhost:8000/api/bike/filter",
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

  return (
    <>
      {isLoading && <LoaderComponent />}

      <div className={`BuyNow ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && (
          <>
            <div className="pageHeadingCont">
              <h1>Buy Bikes</h1>
            </div>
            <div className="underHeadingCont">
              <aside className="filterCont">
              <Filter_Bike onFilterApply={handleFilterApply} />
              </aside>

              <div className="carAdsCont">
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
                          {item.brand} {item.model} {item.year}
                        </h4>
                        <p> {item.location}</p>
                        <p>
                          {item.KmDriven.toLocaleString()} km | {item.fuelType}{" "}
                        </p>
                        <p>
                          {" "}
                          posted {formatDistanceToNow(
                            new Date(item.createdAt)
                          )}{" "}
                          ago{" "}
                        </p>
                        <h4 className="adPrice">
                          {item.price.toLocaleString()}
                        </h4>
                        {item.featured && (
                          <div className="featuredTag">Featured</div>
                        )}
                      </div>
                    </div>
                  ))}
                {!noDataError && (
                  <button onClick={() => setPage(page + 1)}>
                    {loadingMore ? "LOADING MORE..." : "LOAD MORE"}
                  </button>
                )}

                {noDataError && (
                  <span className="loaderCont">No Data To Show</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BuyBikes;