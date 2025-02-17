import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "../../bikes/used/buyBikes/buyBikes.scss";

import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Filter from "../../../components/filter/filter_AutoParts";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";

const Buy_Auto_PartAd = () => {
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
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/autoPart/"
        );
        if (response.data.ok) {
          console.log(response.data.data);
          // setData((prevData) => [...prevData, ...response.data.data]);
          // setData(response.data.data);
          // setIsLoading(false);
          // setLoadingMore(false);
          // --- New ---
          const sortedData = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setData(sortedData);
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
    navigate(`/Buy_Auto_PartAd_Detail/${itemId}`);
  };

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/autopart/filter",
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
              <h1>Buy Auto Parts</h1>
            </div>
            <div className="underHeadingCont">
              <aside className="filterCont">
                <Filter onFilterApply={handleFilterApply} />
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
                          {item.title} {item.year}
                        </h4>
                        <p> {item.location}</p>
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
                  <button
                    style={{
                      border: "0px solid transparent",
                      padding: "0.3em 0em 0.3em 0em",
                      letterSpacing: "2px",
                      backgroundColor: "#bc0000",
                      color: "white",
                      margin: "1em 0em 1em 0em",
                    }}
                    onClick={() => setPage(page + 1)}
                  >
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

export default Buy_Auto_PartAd;
