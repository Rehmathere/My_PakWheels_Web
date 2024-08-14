import { useState } from "react";
import "./cityPicker.scss"
const CityPicker = ({passValueFn , label}) => {
  const cityData = ["Islamabad", "Lahore", "Karachi", "Multan", "Faisalabad"];
  const [city, setCity] = useState("");

  return (
    <div className="CityPicker">
      <label>{label}:</label>
      <select
        name=""
        id=""
        value={city}
        onChange={(e) => {setCity(e.target.value);passValueFn(e.target.value) }}
      >
        <option value="" disabled>
          Select City
        </option>
        {cityData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityPicker;
