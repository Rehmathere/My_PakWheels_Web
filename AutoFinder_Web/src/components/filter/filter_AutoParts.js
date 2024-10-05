import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss";

const Filter_AutoParts = ({ onFilterApply }) => {
  // --- Hide & Seek ---
  const [showBox, setShowBox] = useState(false);
  const [showBox_1, setShowBox_1] = useState(false);
  // --- Hide & Seek ---
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const handleApplyFilter = () => {
    const data = {
      minPrice,
      maxPrice,
      selectedLocation,
      selectedCategoryName,
    };
    onFilterApply(data);
  };

  const handlePriceSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  return (
    <div className="Filter">
      <div id="My_Btn_Parent">
        <button
          style={{ padding: "6.5px 0px 6.5px 0px" }}
          onClick={handleApplyFilter}
        >
          Apply
        </button>
        <button
          onClick={() => {
            window.location.reload();
          }}
          style={{
            backgroundColor: "white",
            border: "0.1px solid #bc0000",
            color: "#bc0000",
          }}
        >
          Remove All
        </button>
      </div>

      {/* <h3>Auto Part Filter</h3> */}
      <div className="filterDiv">
        <label onClick={() => setShowBox_1(!showBox_1)}>Price Range :</label>
        {showBox_1 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_1 ? 1 : 0 }}
          >
            <Slider
              range
              min={0}
              max={10000000}
              defaultValue={[0, 10000000]}
              onChange={handlePriceSliderChange}
            />
            <div
              className="values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{minPrice.toLocaleString()}</p>
              <p>{maxPrice.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="filterDiv">
        <CityPicker label={"Location"} passValueFn={handleLocationChange} />
      </div>

      <div className="filterDiv">
        <label onClick={() => setShowBox(!showBox)}>Category :</label>
        {showBox && (
          <select
            value={selectedCategoryName}
            onChange={(e) => setSelectedCategoryName(e.target.value)}
            style={{ transition: "opacity 0.5s", opacity: showBox ? 1 : 0 }}
          >
            <option value="">Select Category</option>
            <option value="Exterior">Exterior</option>
            <option value="Interior">Interior</option>
            <option value="Internal">Internal</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Filter_AutoParts;
