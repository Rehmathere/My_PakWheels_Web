import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss";

const Filter_AutoParts = ({ onFilterApply }) => {
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
      <h3>Auto Part Filter</h3>
      <div className="filterDiv">
        <label><b>Price Range: </b></label>
        <Slider
          range
          min={0}
          max={10000000}
          defaultValue={[0, 10000000]}
          onChange={handlePriceSliderChange}
        />
        <div className="values" style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{minPrice.toLocaleString()}</p>
          <p>{maxPrice.toLocaleString()}</p>
        </div>
      </div>
      <div className="filterDiv">
        <CityPicker label={"Location"} passValueFn={handleLocationChange} />
      </div>
      <div className="filterDiv">
        <label>Category:</label>
        <select value={selectedCategoryName} onChange={(e) => setSelectedCategoryName(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Exterior">Exterior</option>
          <option value="Interior">Interior</option>
          <option value="Internal">Internal</option>
        </select>
      </div>
      <button onClick={handleApplyFilter}>Apply</button>
      <button
        onClick={() => {
          window.location.reload();
        }}
        style={{ width: "100px", backgroundColor: "red" }}
      >
        Remove All
      </button>
    </div>
  );
};

export default Filter_AutoParts;










