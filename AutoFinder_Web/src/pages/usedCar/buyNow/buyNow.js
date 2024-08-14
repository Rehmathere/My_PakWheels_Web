import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./buyNow.scss";
import { GeoAltFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Filter from "../../../components/filter/filter";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";

const UsedCarBuyNow = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore , setLoadingMore] = useState(true)
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true)
        const response = await axios.post("https://autofinder-backend.vercel.app/api/carAd", {
          page,
          limit:3
        });
        if (response.data.ok) {
          // console.log(response.data.data);
          setData((prevData) => [...prevData, ...response.data.data]);
          setIsLoading(false)
          setLoadingMore(false)
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
        setIsLoading(false)
        setLoadingMore(false)

      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);

  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/used-car/detail/${itemId}`);
  };

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true)
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/filter",
        filterData
      );
      console.log(response.data);
      if (response.data.ok) {
        if (response.data.data.length > 0) {
          setData(response.data.data);
          setIsLoading(false)
        } else {
          setNoDataError("No Data To Show");
          setData([]);
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };


  return (
    <>
    {isLoading && <LoaderComponent/>}
    
    <div className={`BuyNow ${isLoading?"Fade-out":"Fade-in"}`}>
      {
        !isLoading && 
        <>
        
       
      <div className="pageHeadingCont">
        <h1>Buy Cars</h1>
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
                    {item.brand} {item.model} {item.year} {item.varient}
                  </h4>
                  <p> {item.location}</p>
                  <p>
                    {item.kmDriven.toLocaleString()} km | {item.assembly} |{" "}
                    {item.fuelType} | {item.transmission}{" "}
                  </p>
                  <p>
                    {" "}
                    posted {formatDistanceToNow(
                      new Date(item.createdAt)
                    )} ago{" "}
                  </p>
                  <h4 className="adPrice">{item.price.toLocaleString()}</h4>
                  {item.featured && <div className="featuredTag">Featured</div>}
                </div>
              </div>
            ))}
            {!noDataError && <button onClick={() => setPage(page + 1)}>{loadingMore?"LOADING MORE...":"LOAD MORE"}</button> }
          
          {noDataError && <span className="loaderCont">No Data To Show</span>}
        </div>
      </div>
      </>
      }
    </div>
    </>
  );
};

export default UsedCarBuyNow;
