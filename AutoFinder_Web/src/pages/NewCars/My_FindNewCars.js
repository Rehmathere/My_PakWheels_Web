import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
import ReactLoading from "react-loading";
import axios from "axios";
import MG from "../../assets/images/mg.png";
import Honda from "../../assets/images/Honda.png";
import Hyundai from "../../assets/images/hyundai.png";
import Toyota from "../../assets/images/Tyota.png";
import Proton from "../../assets/images/proton.png";
import Audi from "../../assets/images/audi.png";
import Changan from "../../assets/images/changan.jpg";
import Dfsk from "../../assets/images/DFSK.png";
import Tesla from "../../assets/images/Tesla.png";
import United from "../../assets/images/united.png";
import Suzuki from "../../assets/images/Suzuki.png";
import Prince from "../../assets/images/prince.png";
import fordland from "../../assets/images/JW-Forland.png";
import kia from "../../assets/images/kia.png";
import porche from "../../assets/images/porche.png";
import mercedes from "../../assets/images/mercedes.png";
import peugeot from "../../assets/images/peugeot.png";
import baic from "../../assets/images/baic.png";
import haval from "../../assets/images/hava.png";
import daehan from "../../assets/images/Daehan.png";
import faw from "../../assets/images/FAW.png";
import chery from "../../assets/images/chery.png";
import isuzu from "../../assets/images/Isuzu.png";
import bmw from "../../assets/images/bmw.png";
import "./NC.scss";
import "../AutoParts/Auto_Parts.css";

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
  // Brand Function
  const handleSearch_Toyota = () => {
    const searchTerm = "toyota"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_MG = () => {
    const searchTerm = "mg"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_Honda = () => {
    const searchTerm = "honda"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_Hyundai = () => {
    const searchTerm = "hyundai"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_changan = () => {
    const searchTerm = "changan"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_audi = () => {
    const searchTerm = "audi"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_proton = () => {
    const searchTerm = "proton"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Brand Function
  const handleSearch_dfsk = () => {
    const searchTerm = "dfsk"; // Hardcoded search term
    const result = data.find(
      (car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };
  // Main Body
  return (
    <div>
      {isLoading && <LoaderComponent />} {/* Show loader if loading */}
      <div className={`BuyNow ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && ( // Show content only if not loading
          <>
            <div className="pageHeadingCont">
              <h1>Find New Cars</h1>
            </div>
            {/* --- Search New Cars By Brands --- */}
            <br />
            <br />
            <br />
            <h3 id="New_Cars_Popular_heading">New Cars by Make</h3>
            <br />
            <div id="New_Cars_Box_Parent">
              {/* --- 1 - Brand Row --- */}
              <div id="New_Cars_Box_Parent_Sub">
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_MG}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={MG} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_Honda}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Honda} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_Hyundai}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Hyundai} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_Toyota}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Toyota} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_changan}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Changan} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_audi}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Audi} alt="" />
                  </div>
                </div>
              </div>
              {/* --- 2 - Brand Row --- */}
              <div id="New_Cars_Box_Parent_Sub">
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_proton}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Proton} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_dfsk}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Dfsk} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Tesla} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Prince} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={Suzuki} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={United} alt="" />
                  </div>
                </div>
              </div>
              {/* --- 3 - Brand Row --- */}
              <div id="New_Cars_Box_Parent_Sub">
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_proton}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={fordland} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_dfsk}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={kia} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={peugeot} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={mercedes} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={porche} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={baic} alt="" />
                  </div>
                </div>
              </div>
              {/* --- 4 - Brand Row --- */}
              <div id="New_Cars_Box_Parent_Sub">
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_proton}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={faw} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box" onClick={handleSearch_dfsk}>
                  <div id="My_NewCar_imgHolder_E">
                    <img src={bmw} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={haval} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={daehan} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={chery} alt="" />
                  </div>
                </div>
                {/* Box */}
                <div id="New_Cars_Box">
                  <div id="My_NewCar_imgHolder_E">
                    <img src={isuzu} alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/* - End - */}
            <br />
            {/* --- Find New Cars --- */}
            <br />
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
                <br />
                <br />
                <h3 id="New_Cars_Popular_heading">Your Searched Car</h3>
                <div id="New_Cars_Box_Parent">
                  <div id="New_Cars_Box_Parent_Sub">
                    <div
                      id="New_Cars_Box_Simple"
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
            {/* - End - */}
            <br />
            {/* --- Popular New Cars --- */}
            <br />
            <br />
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
                      id="New_Cars_Box_Simple"
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
