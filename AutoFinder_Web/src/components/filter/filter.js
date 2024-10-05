import React, { useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss";

const Filter = ({ onFilterApply }) => {
  // --- Hide & Seek ---
  const [showBox, setShowBox] = useState(false);
  const [showBox_1, setShowBox_1] = useState(false);
  const [showBox_2, setShowBox_2] = useState(false);
  const [showBox_3, setShowBox_3] = useState(false);
  const [showBox_4, setShowBox_4] = useState(false);
  const [showBox_5, setShowBox_5] = useState(false);
  // --- Hide & Seek ---
  const [minModelYear, setMinModelYear] = useState(2000);
  const [maxModelYear, setMaxModelYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minKMDriven, setMinKMDriven] = useState(0);
  const [maxKMDriven, setMaxKMDriven] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRegisteredLocation, setSelectedRegisteredIn] = useState("");
  const [selectedBodyColor, setSelectedBodyColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  //
  const colorData = [
    "Red",
    "White",
    "Black",
    "Gray",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Silver",
    "Brown",
    "Maroon",
    "Gold",
    "Purple",
    "Pink",
    "Beige",
  ];

  const handleApplyFilter = () => {
    const data = {
      minModelYear,
      maxModelYear,
      minPrice,
      maxPrice,
      minKMDriven,
      maxKMDriven,
      selectedLocation,
      selectedRegisteredLocation,
      selectedBodyColor,
      selectedFuelType,
      selectedTransmission,
    };
    onFilterApply(data);
  };

  const handleYearSliderChange = (values) => {
    setMinModelYear(values[0]);
    setMaxModelYear(values[1]);
  };

  const handlePriceSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleKMDrivenSliderChange = (value) => {
    setMinKMDriven(value[0]);
    setMaxKMDriven(value[1]);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleRegisteredInChange = (value) => {
    setSelectedRegisteredIn(value);
  };

  return (
    <div className="Filter">
      {/* <h3>Filter</h3> */}
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
      <div className="filterDiv">
        <label onClick={() => setShowBox(!showBox)}>Year Range :</label>
        {showBox && (
          <div style={{ transition: "opacity 0.5s", opacity: showBox ? 1 : 0 }}>
            <Slider
              range
              min={2000}
              max={2024}
              defaultValue={[2000, 2024]}
              onChange={handleYearSliderChange}
              // style={{
              //   border:"1px solid black",
              //   margin:0
              // }}
            />
            <div
              className="values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{minModelYear}</p>
              <p>{maxModelYear}</p>
            </div>
          </div>
        )}
      </div>
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
              // style={{
              //   border:"1px solid black",
              //   margin:0
              // }}
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
        <label onClick={() => setShowBox_2(!showBox_2)}>Mileage :</label>
        {showBox_2 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_2 ? 1 : 0 }}
          >
            <Slider
              range
              min={0}
              max={200000}
              defaultValue={[0, 200000]}
              onChange={handleKMDrivenSliderChange}
              // style={{
              //   border:"1px solid black",
              //   margin:0
              // }}
            />
            <div
              className="values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{minKMDriven.toLocaleString()}</p>
              <p>{maxKMDriven.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <CityPicker label={"Location"} passValueFn={handleLocationChange} />
      </div>
      <div className="filterDiv">
        <CityPicker
          label={"Registered In"}
          passValueFn={handleRegisteredInChange}
        />
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_3(!showBox_3)}>Exterior Color :</label>
        {showBox_3 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_3 ? 1 : 0 }}
          >
            <select
              name=""
              id=""
              value={selectedBodyColor}
              onChange={(e) => setSelectedBodyColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {colorData.length > 0 &&
                colorData.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_4(!showBox_4)}>Fuel Type :</label>
        {showBox_4 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_4 ? 1 : 0 }}
          >
            <select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value={"Gas"}>Gas</option>
              <option value={"Petrol"}>Petrol</option>
            </select>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_5(!showBox_5)}>Transmission :</label>
        {showBox_5 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_5 ? 1 : 0 }}
          >
            <div>
              <input
                type="radio"
                id="automatic"
                name="transmission"
                value="Automatic"
                onChange={(e) => setSelectedTransmission(e.target.value)}
              />
              <label htmlFor="automatic" style={{ padding: "0em 0em 0em 1em" }}>
                Automatic
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="manual"
                name="transmission"
                value="Manual"
                onChange={(e) => setSelectedTransmission(e.target.value)}
              />
              <label htmlFor="manual" style={{ padding: "0em 0em 0em 1em" }}>
                Manual
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
