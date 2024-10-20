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
  const [showBox_6, setShowBox_6] = useState(false);
  const [showBox_7, setShowBox_7] = useState(false);
  const [showBox_8, setShowBox_8] = useState(false);
  // --- Hide & Seek ---
  const [minModelYear, setMinModelYear] = useState(2000);
  const [maxModelYear, setMaxModelYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minKMDriven, setMinKMDriven] = useState(0);
  const [maxKMDriven, setMaxKMDriven] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedRegisteredLocation, setSelectedRegisteredIn] = useState([]);  
  const [selectedBodyColor, setSelectedBodyColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVarient, setSelectedVarient] = useState("");
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
  const brandData = [
    "MG",
    "Honda",
    "Hyundai",
    "Toyota",
    "Proton",
    "Audi",
    "Changan",
    "DFSK",
    "Tesla",
    "United",
    "Suzuki",
    "Prince",
    "JW Forland",
    "Kia",
    "Porsche",
    "Mercedes",
    "Peugeot",
    "BAIC",
    "Haval",
    "Daehan",
    "FAW",
    "Chery",
    "Isuzu",
    "BMW",
  ];
  const modelData = [
    // MG
    "ZS",
    "HS",
    "5",
    "6",
    "Hector",

    // Honda
    "Civic",
    "City",
    "Accord",
    "CR-V",
    "HR-V",

    // Hyundai
    "Tucson",
    "Elantra",
    "Sonata",
    "Santa Fe",
    "Kona",

    // Toyota
    "Corolla",
    "Yaris",
    "Fortuner",
    "Camry",
    "Land Cruiser",
    "Prius",

    // Proton
    "Saga",
    "X70",
    "X50",
    "Exora",
    "Persona",

    // Audi
    "A4",
    "A6",
    "Q7",
    "Q5",
    "A8",

    // Changan
    "Alsvin",
    "Karvaan",
    "CX70T",
    "Oshan X7",
    "Eado",

    // DFSK
    "Glory 580",
    "Glory 500",
    "C35",
    "K01S",
    "EC35",

    // Tesla
    "Model S",
    "Model 3",
    "Model X",
    "Model Y",
    "Cybertruck",

    // United
    "Bravo",
    "Alpha",
    "Usman",
    "US 125",
    "US 150",

    // Suzuki
    "Alto",
    "Cultus",
    "Swift",
    "WagonR",
    "Ciaz",

    // Prince
    "Pearl",
    "K07",
    "K01",
    "DFSK K07S",
    "DFSK K01S",

    // JW Forland
    "Bravo",
    "C19",
    "C31",
    "C35",
    "F7",

    // Kia
    "Sportage",
    "Picanto",
    "Sorento",
    "Stinger",
    "Optima",

    // Porsche
    "911",
    "Cayenne",
    "Macan",
    "Panamera",
    "Taycan",

    // Mercedes
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",

    // Peugeot
    "2008",
    "3008",
    "5008",
    "308",
    "508",

    // BAIC
    "BJ40",
    "X25",
    "X55",
    "Senova X65",
    "D20",

    // Haval
    "Jolion",
    "H6",
    "F7",
    "F5",
    "H9",

    // Daehan
    "Shehzore",
    "Super Star",
    "Top",
    "Sprinter",
    "A-One",

    // FAW
    "V2",
    "XPV",
    "Carrier",
    "Sirius",
    "Senya R7",

    // Chery
    "Tiggo 4",
    "Tiggo 8",
    "Arrizo 5",
    "Tiggo 2",
    "Tiggo 7",

    // Isuzu
    "D-Max",
    "N-Series",
    "MU-X",
    "FRR",
    "FVR",

    // BMW
    "3 Series",
    "5 Series",
    "7 Series",
    "X5",
    "X7",
  ];
  const varientData = [
    // MG
    "ZS Excite", "ZS Essence", "HS 1.5T", "HS PHEV", "Hector Plus",
  
    // Honda
    "Civic 1.8 i-VTEC", "Civic RS Turbo", "City 1.2L", "City 1.5L", "Accord Hybrid",
  
    // Hyundai
    "Tucson AWD", "Tucson FWD", "Elantra GLS", "Sonata GLS", "Santa Fe Ultimate",
  
    // Toyota
    "Corolla Altis 1.6", "Corolla Altis 1.8", "Fortuner 2.7 G", "Fortuner 2.7 V", "Fortuner Legender",
  
    // Proton
    "Saga Standard", "Saga Premium", "X70 Executive AWD", "X70 Premium 2WD", "Persona Standard",
  
    // Audi
    "A4 40 TFSI", "A6 45 TFSI", "Q7 45 TFSI", "Q5 45 TFSI", "A8 L 60 TFSI",
  
    // Changan
    "Alsvin 1.3 Comfort", "Alsvin 1.5 DCT", "Karvaan Plus", "CX70T Comfort", "Oshan X7 FutureSense",
  
    // DFSK
    "Glory 580 1.5T", "Glory 500 Elite", "C35 1.5", "K01S Base", "EC35 Van",
  
    // Tesla
    "Model S Long Range", "Model 3 Standard", "Model X Long Range", "Model Y Performance", "Cybertruck Tri-Motor",
  
    // United
    "Bravo Base", "Bravo Manual", "Alpha 1.0L", "US 125 Special", "US 150 Deluxe",
  
    // Suzuki
    "Alto VX", "Alto VXR", "Cultus VXL", "Swift GL", "WagonR VXL",
  
    // Prince
    "Pearl Manual", "Pearl Automatic", "K07 Base", "K01 Base", "K01S Plus",
  
    // JW Forland
    "Bravo Double Cab", "C19 Dump", "C31 Truck", "C35 Box", "F7 Cargo",
  
    // Kia
    "Sportage Alpha", "Sportage AWD", "Picanto MT", "Sorento 2.4 FWD", "Optima EX",
  
    // Porsche
    "911 Carrera", "Cayenne GTS", "Macan S", "Panamera 4S", "Taycan Turbo",
  
    // Mercedes
    "C-Class C180", "E-Class E200", "S-Class S350", "GLA 200", "GLC 300",
  
    // Peugeot
    "2008 Allure", "3008 Active", "5008 GT", "308 Premium", "508 Active",
  
    // BAIC
    "BJ40 Plus", "X25 Comfort", "X55 Luxury", "Senova X65 Elite", "D20 Standard",
  
    // Haval
    "Jolion Luxury", "H6 Supreme", "F7 Comfort", "F5 Premium", "H9 Luxury",
  
    // Daehan
    "Shehzore Base", "Super Star Standard", "Top Deluxe", "Sprinter Base", "A-One Comfort",
  
    // FAW
    "V2 VCT-i", "XPV Dual AC", "Carrier Standard", "Sirius S80", "Senya R7",
  
    // Chery
    "Tiggo 4 Comfort", "Tiggo 8 Luxury", "Arrizo 5 Standard", "Tiggo 2 Base", "Tiggo 7 Comfort",
  
    // Isuzu
    "D-Max Hi-Ride", "N-Series NPR", "MU-X LS", "FRR 90L", "FVR 1600",
  
    // BMW
    "3 Series 320i", "5 Series 530i", "7 Series 740Li", "X5 xDrive40i", "X7 xDrive40i"
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
      selectedBrand,
      selectedModel,
      selectedVarient,
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
              <option value="High-Octane Petrol">High-Octane Petrol</option>
              <option value={"Diesel"}>Diesel</option>
              <option value={"Electric"}>Electric</option>
              <option value={"Hybrid"}>Hybrid</option>
              <option value={"CNG"}>CNG</option>
              <option value={"LPG"}>LPG</option>
              <option value={"Hydrogen"}>Hydrogen</option>
              <option value={"Ethanol"}>Ethanol</option>
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
      <div className="filterDiv">
        <label onClick={() => setShowBox_6(!showBox_6)}>Brand :</label>
        {showBox_6 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_6 ? 1 : 0 }}
          >
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ width: "93%" }}
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
              style={{ width: "93%" }}
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
      <div className="filterDiv">
        <label onClick={() => setShowBox_8(!showBox_8)}>Varient :</label>
        {showBox_8 && (
          <div
            style={{ transition: "opacity 0.5s", opacity: showBox_8 ? 1 : 0 }}
          >
            <select
              value={selectedVarient}
              onChange={(e) => setSelectedVarient(e.target.value)}
              style={{ width: "93%" }}
            >
              <option value="">Select Model</option>
              {varientData.map((item) => (
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

export default Filter;
