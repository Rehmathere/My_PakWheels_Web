import { useEffect, useState } from "react";
import axios from "axios";
import "./carModelPicker.scss"
const CarModelPicker = ({
  setYearPropFn,
  setBrandPropFn,
  setModelPropFn,
  setVariantPropFn,
}) => {
  //
  const [yearsData, setYearsData] = useState(null);
  const [brandsData, setBrandsData] = useState(null);
  const [modelData, setModelData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  //
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  async function getYears() {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/api/year"
      );
      setYearsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBrands() {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/brands"
      );
      setBrandsData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getModel(brandId) {
    try {
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/Model/${brandId}`
      );
      setModelData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getVariant(modelId) {
    try {
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/varient/${modelId}`
      );
      setVariantData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeYear = (value) => {
    setYear(value);
    setYearPropFn(value);
  };

  const handleBrandChange = (elem) => {
    // const [brandValue, brandId] = value.split("|");
    const selectedOption = elem.options[elem.selectedIndex];
    const brandId = selectedOption.dataset.id;
    setBrand(elem.value);
    setBrandPropFn(elem.value);
    getModel(brandId);
  };

  const handleModelChange = (elem) => {
    const selectedOption = elem.options[elem.selectedIndex];
    const modelId = selectedOption.dataset.id;
    setModel(elem.value);
    setModelPropFn(elem.value);
    getVariant(modelId);
  };

  const handleVariantChange = (elem) => {
    setVariant(elem.value);
    setVariantPropFn(elem.value);
  };

  useEffect(() => {
    getYears();
    getBrands();
  }, []);

  return (
    <div className="CarModelPicker">
      {/* ================================================================== */}
      <div>
        <label>Car Year:</label>
        <select value={year} onChange={(e) => handleChangeYear(e.target.value)}>
          <option value="" disabled>
            Select Car Year
          </option>
          {yearsData &&
            yearsData.map((item) => (
              <option value={item.year} key={item._id}>
                {item.year}
              </option>
            ))}
        </select>
      </div>
      {/* ===================================================================== */}
      <div>
        <label>Car Brand:</label>
        <select value={brand} onChange={(e) => handleBrandChange(e.target)} disabled={year.length>0 ? false : true}>
          <option value="" disabled>
            Car Brand
          </option>
          {brandsData &&
            brandsData.map((item) => (
              <option value={item.name} data-id={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {/* ================================================================ */}
      <div>
        <label>Car Model:</label>
        <select value={model} onChange={(e) => handleModelChange(e.target)} disabled={brand.length>0 ? false : true}>
          <option value="" disabled>
            Select Car Model
          </option>
          {modelData &&
            modelData.map((item) => (
              <option value={item.name} data-id={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {/* ========================================================= */}
      <div>
        <label>Car Variant:</label>
        <select value={variant} onChange={(e) => handleVariantChange(e.target)} disabled={model.length>0 ? false : true}>
          <option value="" disabled>
            Select Variant
          </option>
          {variantData &&
            variantData.length > 0 &&
            variantData.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default CarModelPicker;
