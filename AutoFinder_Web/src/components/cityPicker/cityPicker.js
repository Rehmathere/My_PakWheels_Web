// import { useState } from "react";
// import "./cityPicker.scss";
// const CityPicker = ({ passValueFn, label }) => {
//   // --- Hide & Seek ---
//   const [showBox, setShowBox] = useState(false);
//   // --- Hide & Seek ---
//   // const cityData = [
//   //   "Islamabad",
//   //   "Lahore",
//   //   "Karachi",
//   //   "Multan",
//   //   "Faisalabad",
//   //   "Rawalpindi",
//   //   "Sukkur",
//   //   "Peshawar",
//   // ];
//   const cityData = [
//     "Islamabad",
//     "Lahore",
//     "Karachi",
//     "Multan",
//     "Faisalabad",
//     "Rawalpindi",
//     "Sukkur",
//     "Peshawar",
//     "Quetta",
//     "Sialkot",
//     "Gujranwala",
//     "Hyderabad",
//     "Bahawalpur",
//     "Sargodha",
//     "Sheikhupura",
//     "Abbottabad",
//     "Mardan",
//     "Sahiwal",
//     "Rahim Yar Khan",
//     "Gujrat",
//     "Kasur",
//     "Jhelum",
//     "Dera Ghazi Khan",
//     "Mingora",
//     "Muzaffargarh",
//     "Khanewal",
//     "Okara",
//     "Vehari",
//     "Dadu",
//     "Mirpur Khas",
//     "Nawabshah",
//     "Larkana",
//     "Jhang",
//     "Tando Allahyar",
//     "Chiniot",
//     "Khushab",
//     "Hafizabad",
//     "Mansehra",
//     "Attock",
//     "Kamoke",
//     "Mandi Bahauddin",
//     "Toba Tek Singh",
//     "Bhakkar",
//     "Jacobabad",
//     "Shikarpur",
//     "Kohat",
//     "Chaman",
//     "Dera Ismail Khan",
//     "Gwadar",
//     "Hangu",
//     "Narowal",
//     "Pakpattan",
//     "Chakwal",
//     "Haripur",
//     "Kotli",
//     "Muzaffarabad",
//     "Mirpur",
//     "Zhob",
//     "Kharan",
//     "Sibi",
//     "Turbat",
//   ];
//   const [city, setCity] = useState("");

//   return (
//     <div className="CityPicker">
//       <label onClick={() => setShowBox(!showBox)}>{label} :</label>
//       {showBox && (
//         <select
//           name=""
//           id=""
//           value={city}
//           onChange={(e) => {
//             setCity(e.target.value);
//             passValueFn(e.target.value);
//           }}
//         >
//           <option value="" disabled>
//             Select City
//           </option>
//           {cityData.map((item) => (
//             <option key={item} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default CityPicker;

// ----------------------------------------------

import { useState } from "react";
import "./cityPicker.scss";

const CityPicker = ({ passValueFn, label }) => {
  // State to manage the visibility of the dropdown
  const [showBox, setShowBox] = useState(false);

  // State to hold selected cities (array for multiple values)
  const [selectedCities, setSelectedCities] = useState([]);

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

  // Handle selection of multiple cities using checkboxes
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setSelectedCities([...selectedCities, value]);
    } else {
      setSelectedCities(selectedCities.filter((city) => city !== value));
    }

    passValueFn(selectedCities); // Pass selected cities to parent component
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowBox(!showBox);
  };

  return (
    <div className="CityPicker">
      <label
        onClick={() => {
          setShowBox(!showBox);
          toggleDropdown();
        }}
      >
        {label} :
      </label>
      <div className="dropdown-wrapper">
        {/* Button to manually open/close the dropdown
        <p className="MeraBtn_Multiple_Location" onClick={toggleDropdown}>
          {showBox ? "Close" : "Select Cities"}
        </p> */}

        {/* Dropdown for selecting cities */}
        {showBox && (
          <div className="checkbox-dropdown">
            {cityData.map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  id={item}
                  value={item}
                  onChange={handleCheckboxChange}
                  checked={selectedCities.includes(item)}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;<label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        )}

        {/* Display selected cities */}
        <br />
        <div className="selected-cities">
          {selectedCities.length > 0 && (
            <p style={{ color: "#bc0000" }}>Selected Cities : {<br />}{<br />} {selectedCities.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityPicker;
