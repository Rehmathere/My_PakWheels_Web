import { useState } from "react";

const YearPicker = ({ passValueFn }) => {
  // Create an array of years from 2000 to 2024
  const years = Array.from({ length: 25 }, (_, index) => 2000 + index);

  const [selectedYear, setSelectedYear] = useState("");

  const handleChangeYear = (year) => {
    setSelectedYear(year);
    passValueFn(year);
  };

  return (
    <>
      <select value={selectedYear} onChange={(e) => handleChangeYear(e.target.value)}>
        <option value="" disabled>Select Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </>
  );
};

export default YearPicker;
