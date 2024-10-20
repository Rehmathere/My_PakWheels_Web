import { useState } from "react";
import "./cityPicker.scss";

const My_citypicker = ({ passValueFn, label }) => {
  // --- Hide & Seek ---
  const [showBox, setShowBox] = useState(false);
  // --- Hide & Seek ---
  // const cityData = [
  //   "Islamabad",
  //   "Lahore",
  //   "Karachi",
  //   "Multan",
  //   "Faisalabad",
  //   "Rawalpindi",
  //   "Sukkur",
  //   "Peshawar",
  // ];
  const cityData = [
    "Islamabad",
    "Lahore",
    "Karachi",
    "Multan",
    "Faisalabad",
    "Rawalpindi",
    "Sukkur",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Abbottabad",
    "Mardan",
    "Sahiwal",
    "Rahim Yar Khan",
    "Gujrat",
    "Kasur",
    "Jhelum",
    "Dera Ghazi Khan",
    "Mingora",
    "Muzaffargarh",
    "Khanewal",
    "Okara",
    "Vehari",
    "Dadu",
    "Mirpur Khas",
    "Nawabshah",
    "Larkana",
    "Jhang",
    "Tando Allahyar",
    "Chiniot",
    "Khushab",
    "Hafizabad",
    "Mansehra",
    "Attock",
    "Kamoke",
    "Mandi Bahauddin",
    "Toba Tek Singh",
    "Bhakkar",
    "Jacobabad",
    "Shikarpur",
    "Kohat",
    "Chaman",
    "Dera Ismail Khan",
    "Gwadar",
    "Hangu",
    "Narowal",
    "Pakpattan",
    "Chakwal",
    "Haripur",
    "Kotli",
    "Muzaffarabad",
    "Mirpur",
    "Zhob",
    "Kharan",
    "Sibi",
    "Turbat",
  ];
  const [city, setCity] = useState("");

  return (
    <div className="CityPicker">
      <label>{label} :</label>
      <select
        name=""
        id=""
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          passValueFn(e.target.value);
        }}
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

export default My_citypicker;

