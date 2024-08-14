import React, { useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import CityPicker from "../cityPicker/cityPicker";
import "./filter.scss"
const Filter = ({ onFilterApply }) => {
  const [minModelYear, setMinModelYear] = useState(2000);
  const [maxModelYear, setMaxModelYear] = useState(2024);
  const [minPrice , setMinPrice] = useState(0)
  const [maxPrice , setMaxPrice] = useState(10000000)
  const [minKMDriven , setMinKMDriven] = useState(0)
  const [maxKMDriven , setMaxKMDriven] = useState(200000)
  const [selectedLocation , setSelectedLocation] = useState("")
  const [selectedRegisteredLocation , setSelectedRegisteredIn] = useState("")
  const [selectedBodyColor , setSelectedBodyColor] = useState("")
  const [selectedFuelType , setSelectedFuelType] = useState("")
  const [selectedTransmission,setSelectedTransmission] = useState("")
  //
  const colorData = ["Red", "White", "Black", "Gray"];


  const handleApplyFilter = () => {
    const data = {
      minModelYear , maxModelYear , minPrice , maxPrice , minKMDriven , maxKMDriven , selectedLocation , selectedRegisteredLocation , selectedBodyColor , selectedFuelType , selectedTransmission
    }
    onFilterApply(data);
  };

  const handleYearSliderChange = (values) => {
    setMinModelYear(values[0]);
    setMaxModelYear(values[1]);
  };

  const handlePriceSliderChange =(value)=>{
    setMinPrice(value[0])
    setMaxPrice(value[1])
  }

  const handleKMDrivenSliderChange = (value)=>{
    setMinKMDriven(value[0])
    setMaxKMDriven(value[1]) 
  }

  const handleLocationChange = (value)=>{
    setSelectedLocation(value)
  }

  const handleRegisteredInChange = (value)=>{
    setSelectedRegisteredIn(value)
  }

  return (
    <div className="Filter">
      <h3>Filter</h3>
      <div className="filterDiv">
        <label> <b>Year Range: </b> </label>
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
        <div className="values" style={{display:"flex",justifyContent:"space-between"}}>
          <p>{minModelYear}</p>
          <p>{maxModelYear}</p>
        </div>
      </div>
      <div className="filterDiv">
        <label> <b>Price Range: </b> </label>
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
        <div className="values" style={{display:"flex",justifyContent:"space-between"}}>
          <p>{minPrice.toLocaleString()}</p>
          <p>{maxPrice.toLocaleString()}</p>
        </div>
      </div>
      <div className="filterDiv">
        <label> <b>Mileage: </b> </label>
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
        <div className="values" style={{display:"flex",justifyContent:"space-between"}}>
          <p>{minKMDriven.toLocaleString()}</p>
          <p>{maxKMDriven.toLocaleString()}</p>
        </div>
      </div>
      <div className="filterDiv">
        <CityPicker label={"Location"} passValueFn={handleLocationChange} />
      </div>
      <div className="filterDiv">
        <CityPicker label={"Registered In"}  passValueFn={handleRegisteredInChange}/>
      </div>
      <div className="filterDiv">
            <label>Exterior Color:</label>
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
          <div className="filterDiv">
            <label>Fuel Type</label>
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
          <div className="filterDiv">
            <label>Transmission:</label>
            <div>
              <input
                type="radio"
                id="manual"
                name="transmission"
                value="Manual"
                onChange={(e) => setSelectedTransmission(e.target.value)}
              />
              <label htmlFor="manual">Manual</label>
            </div>
            <div>
              <input
                type="radio"
                id="automatic"
                name="transmission"
                value="Automatic"
                onChange={(e) => setSelectedTransmission(e.target.value)}
              />
              <label htmlFor="automatic">Automatic</label>
            </div>
          </div>
      <button onClick={handleApplyFilter}>Apply</button>
      <button onClick={()=>{window.location.reload()}} style={{width:"100px",backgroundColor:"red"}}>Remove All</button>
    </div>
  );
};

export default Filter;
