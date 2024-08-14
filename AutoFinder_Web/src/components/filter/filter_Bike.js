import React, { useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss";

const Filter_Bike = ({ onFilterApply }) => {
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minKmDriven, setMinKmDriven] = useState(0);
  const [maxKmDriven, setMaxKmDriven] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRegisteredLocation, setSelectedRegisteredLocation] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const colorData = ["Red", "White", "Black", "Gray"];
  const engineTypeData = ["2 Stroke", "4 Stroke"];
  const brandData = ["honda", "suzuki", "road prince", "yamaha", "united", "super power"];

  const handleApplyFilter = () => {
    const data = {
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minKmDriven,
      maxKmDriven,
      selectedLocation,
      selectedRegisteredLocation,
      selectedColor,
      selectedFuelType,
      selectedEngineType,
      selectedBrand,
    };
    onFilterApply(data);
  };

  const handleYearSliderChange = (values) => {
    setMinYear(values[0]);
    setMaxYear(values[1]);
  };

  const handlePriceSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleKmDrivenSliderChange = (value) => {
    setMinKmDriven(value[0]);
    setMaxKmDriven(value[1]);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleRegisteredLocationChange = (value) => {
    setSelectedRegisteredLocation(value);
  };

  return (
    <div className="Filter">
      <h3>Bike Filter</h3>
      <div className="filterDiv">
        <label><b>Year Range: </b></label>
        <Slider
          range
          min={2000}
          max={2024}
          defaultValue={[2000, 2024]}
          onChange={handleYearSliderChange}
        />
        <div className="values" style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{minYear}</p>
          <p>{maxYear}</p>
        </div>
      </div>
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
        <label><b>Mileage: </b></label>
        <Slider
          range
          min={0}
          max={200000}
          defaultValue={[0, 200000]}
          onChange={handleKmDrivenSliderChange}
        />
        <div className="values" style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{minKmDriven.toLocaleString()}</p>
          <p>{maxKmDriven.toLocaleString()}</p>
        </div>
      </div>
      <div className="filterDiv">
        <CityPicker label={"Location"} passValueFn={handleLocationChange} />
      </div>
      <div className="filterDiv">
        <CityPicker label={"Registered In"} passValueFn={handleRegisteredLocationChange} />
      </div>
      <div className="filterDiv">
        <label>Exterior Color:</label>
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">Select Color</option>
          {colorData.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="filterDiv">
        <label>Fuel Type:</label>
        <select value={selectedFuelType} onChange={(e) => setSelectedFuelType(e.target.value)}>
          <option value="" disabled>Select Fuel Type</option>
          <option value="Gas">Gas</option>
          <option value="Petrol">Petrol</option>
        </select>
      </div>
      <div className="filterDiv">
        <label>Engine Type:</label>
        <select value={selectedEngineType} onChange={(e) => setSelectedEngineType(e.target.value)}>
          <option value="">Select Engine Type</option>
          {engineTypeData.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="filterDiv">
        <label>Brand:</label>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">Select Brand</option>
          {brandData.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
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

export default Filter_Bike;
