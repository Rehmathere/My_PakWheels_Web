import React, { useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss";

const Filter_Bike = ({ onFilterApply }) => {
  // --- Hide & Seek ---
  const [showBox, setShowBox] = useState(false);
  const [showBox_1, setShowBox_1] = useState(false);
  const [showBox_2, setShowBox_2] = useState(false);
  const [showBox_3, setShowBox_3] = useState(false);
  const [showBox_4, setShowBox_4] = useState(false);
  const [showBox_5, setShowBox_5] = useState(false);
  const [showBox_6, setShowBox_6] = useState(false);
  const [showBox_7, setShowBox_7] = useState(false);
  // --- Hide & Seek ---
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minKmDriven, setMinKmDriven] = useState(0);
  const [maxKmDriven, setMaxKmDriven] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRegisteredLocation, setSelectedRegisteredLocation] =
    useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

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
  const engineTypeData = ["2 Stroke", "4 Stroke"];
  const brandData = [
    "honda",
    "suzuki",
    "Yamaha",
    "road prince",
    "united",
    "super power",
    "kawasaki",
    "hero",
    "zongshen",
    "unique",
    "hi-speed",
    "metro",
    "super star",
    "ravi",
    "pak hero",
    "power",
    "qingqi",
    "derbi",
    "benelli",
  ];
  const modelData = [
    "honda cd 70",
    "Honda CG 125",
    "suzuki gs 150",
    "suzuki gd 110",
    "yamaha ybr 125",
    "yamaha ybz 125",
    "road prince rp 70",
    "road prince rp 110",
    "united us 70",
    "united us 125",
    "super power sp 70",
    "super power archi 150",
    "kawasaki gto 125",
    "hero rf 70",
    "zongshen zs 150",
    "unique ud 70",
    "unique ud 125",
    "hi-speed infinity 150",
    "metro mr 70",
    "super star ss 70",
    "ravi piaggio storm 125",
    "pak hero ph 70",
    "power pk 70",
    "qingqi qm 70",
    "derbi stx 150",
    "benelli tnt 150",
  ];

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
      {/* <h3>Bike Filter</h3> */}
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
            />
            <div
              className="values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{minYear}</p>
              <p>{maxYear}</p>
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
              onChange={handleKmDrivenSliderChange}
            />
            <div
              className="values"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{minKmDriven.toLocaleString()}</p>
              <p>{maxKmDriven.toLocaleString()}</p>
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
          passValueFn={handleRegisteredLocationChange}
        />
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_3(!showBox_3)}>Exterior Color :</label>
        {showBox_3 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_3 ? 1 : 0 }}
          >
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {colorData.map((item) => (
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
              <option value="Gas">Gas</option>
              <option value="Petrol">Petrol</option>
              <option value="High-Octane Petrol">High-Octane Petrol</option>
            </select>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_5(!showBox_5)}>Engine Type :</label>
        {showBox_5 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_5 ? 1 : 0 }}
          >
            <select
              value={selectedEngineType}
              onChange={(e) => setSelectedEngineType(e.target.value)}
            >
              <option value="">Select Engine Type</option>
              {engineTypeData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_6(!showBox_6)}>Brand :</label>
        {showBox_6 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_6 ? 1 : 0 }}
          >
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Select Brand</option>
              {brandData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="filterDiv">
        <label onClick={() => setShowBox_7(!showBox_7)}>Model :</label>
        {showBox_7 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_7 ? 1 : 0 }}
          >
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select Model</option>
              {modelData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter_Bike;
