import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
import "../AutoParts/Auto_Parts.css";
import ReactLoading from "react-loading";
import axios from "axios";

function My_FindNewCars() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [searchResult, setSearchResult] = useState(null); // State to hold search result

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingMore(true);
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/newCar"
        );
        if (response.data.ok) {
          console.log(response.data.data);
          setData(response.data.data);
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
    navigate(`/My_NewCarsDetail_2/${itemId}`);
  };

  const handleSearch = () => {
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    <div>
      {isLoading && <LoaderComponent />} {/* Show loader if loading */}
      <div className={`BuyNow ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && ( // Show content only if not loading
          <>
            <div className="pageHeadingCont">
              <h1>Find New Cars</h1>
            </div>
            <br />
            <br />
            {/* --- Find New Cars --- */}
            <br />
            <span id="New_Cars_Popular_heading">Find New Cars</span>
            <p id="New_Cars_Popular_P">
              Find information about the latest cars in the market
            </p>
            <div id="New_Cars_Find_Parent">
              <div id="New_Cars_Find_Parent_Sub">
                <div id="New_Cars_Find_Parent_Sub_Box">
                  <div id="New_Cars_Find_Parent_Sub_Box_Main">
                    {/* Input */}
                    <input
                      type="text"
                      name=""
                      id="New_Cars_My_Input"
                      placeholder=" Search Any New Car By ( Brand | Model ) "
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                    {/* Button */}
                    <button
                      id="New_Cars_My_Input_Btn"
                      onClick={handleSearch} // Search handler
                    >
                      <i id="New_Cars_My_Input_Btn_I" class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Display search result */}
            {searchResult && (
              <>
                <h3 id="New_Cars_Popular_heading">Your Searched Car</h3>
                <div id="New_Cars_Box_Parent">
                  <div id="New_Cars_Box_Parent_Sub">
                    <div
                      id="New_Cars_Box"
                      onClick={() =>
                        handleNavigateToSingleCarAd(searchResult._id)
                      }
                    >
                      <div id="My_NewCar_imgHolder">
                        <img
                          src={searchResult.image}
                          alt={searchResult.model}
                        />
                      </div>
                      <div id="My_NewCar_detailHolder">
                        <span id="My_New_adMake">{searchResult.make}</span>
                        <span id="My_New_adMake_2">{searchResult.model}</span>
                        <span id="My_New_adPrice">
                          PKR {searchResult.keySpecifications.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* --- Popular New Cars --- */}
            <br /><br />
            <h3 id="New_Cars_Popular_heading">Popular New Cars</h3>
            <div id="New_Cars_Box_Parent">
              <div id="New_Cars_Box_Parent_Sub">
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
                      id="New_Cars_Box"
                      onClick={() => handleNavigateToSingleCarAd(item._id)}
                    >
                      <div id="My_NewCar_imgHolder">
                        <img src={item.image} alt={item.model} />
                      </div>
                      <div id="My_NewCar_detailHolder">
                        <span id="My_New_adMake">{item.make}</span>
                        <span id="My_New_adMake_2">{item.model}</span>
                        <span id="My_New_adPrice">
                          PKR {item.keySpecifications.price}
                        </span>
                      </div>
                    </div>
                  ))}
                {noDataError && (
                  <span className="loaderCont">No Data To Show</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default My_FindNewCars;
