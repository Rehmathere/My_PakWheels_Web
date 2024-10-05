import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
// Image
import Car_Compare_Pic from "../../assets/images/car_Compare.jpg";
import VS_Pic from "../../assets/images/VS.png";

function My_NewCars() {
  const navigate = useNavigate();

  // State for car1, car2, and loading
  const [car1, setCar1] = useState({ year: "", make: "", model: "" });
  const [car2, setCar2] = useState({ year: "", make: "", model: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to handle input changes
  const handleInputChange = (e, carNumber) => {
    const { name, value } = e.target;
    if (carNumber === 1) {
      setCar1({ ...car1, [name]: value });
    } else {
      setCar2({ ...car2, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const data = { car1, car2 };
    setIsLoading(true); // Start loading

    try {
      // Save car makes to localStorage
      localStorage.setItem("car1Make", car1.make);
      localStorage.setItem("car2Make", car2.make);

      navigate("/My_NewCarsDetail");
    } catch (error) {
      console.error("Error saving data", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {isLoading && <LoaderComponent />} {/* Show loader if loading */}
      <div className={`BuyNow ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && ( // Show content only if not loading
          <>
            <div className="pageHeadingCont">
              <h1>Cars Comparison</h1>
            </div>
            {/* --- Remove Part --- */}
            {/* <div id="My_NewCars_Box">
              <div id="My_NewCars_Box_Sub">
                Inputs for Car 1
                <h2>Car 1</h2>
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={car1.year}
                  onChange={(e) => handleInputChange(e, 1)}
                />
                <input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={car1.make}
                  onChange={(e) => handleInputChange(e, 1)}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={car1.model}
                  onChange={(e) => handleInputChange(e, 1)}
                />
                Inputs for Car 2
                <br />
                <h2>Car 2</h2>
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={car2.year}
                  onChange={(e) => handleInputChange(e, 2)}
                />
                <input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={car2.make}
                  onChange={(e) => handleInputChange(e, 2)}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={car2.model}
                  onChange={(e) => handleInputChange(e, 2)}
                />
                <br />
                <br />
                Button to navigate to the next page
                <button onClick={handleSubmit}>Compare Cars</button>
                </div>
                </div> */}
            {/* --- My New Compare --- */}
            <div id="Cars_Compare_X_Parent">
              <div id="Cars_Compare_X_Parent_Sub">
                <div id="Cars_Compare_X_Parent_Sub_Box">
                  {/* Part 1 */}
                  <div id="Cars_Compare_X_Box_Part_1">
                    <img src={Car_Compare_Pic} alt="NA" />
                  </div>
                  {/* Part 2 */}
                  <div id="Cars_Compare_X_Box_Part_2">
                    {/* Input Box 1 */}
                    <div id="Cars_Compare_X_Box_Part_2_1">
                      {/* Inputs for Car 1 */}
                      <h2>Car 1</h2>
                      <input
                        type="number"
                        name="year"
                        placeholder=" Enter Year "
                        value={car1.year}
                        onChange={(e) => handleInputChange(e, 1)}
                      />
                      <input
                        type="text"
                        name="make"
                        placeholder=" Enter Make"
                        value={car1.make}
                        onChange={(e) => handleInputChange(e, 1)}
                      />
                      <input
                        type="text"
                        name="model"
                        placeholder=" Enter Model"
                        value={car1.model}
                        onChange={(e) => handleInputChange(e, 1)}
                      />
                    </div>
                    {/* Input Box 3 */}
                    <div id="Cars_Compare_X_Box_Part_2_E">
                      <img src={VS_Pic} alt="NA" />
                    </div>
                    {/* Input Box 2 */}
                    <div id="Cars_Compare_X_Box_Part_2_2">
                      <h2>Car 2</h2>
                      <input
                        type="number"
                        name="year"
                        placeholder=" Enter Year"
                        value={car2.year}
                        onChange={(e) => handleInputChange(e, 2)}
                      />
                      <input
                        type="text"
                        name="make"
                        placeholder=" Enter Make"
                        value={car2.make}
                        onChange={(e) => handleInputChange(e, 2)}
                      />
                      <input
                        type="text"
                        name="model"
                        placeholder=" Enter Model"
                        value={car2.model}
                        onChange={(e) => handleInputChange(e, 2)}
                      />
                    </div>
                  </div>
                  {/* Part 3 */}
                  <div id="Cars_Compare_X_Box_Part_3">
                    <button onClick={handleSubmit}>Compare Cars</button>
                  </div>
                </div>
              </div>
            </div>
            {/* --- My New Compare --- */}
          </>
        )}
      </div>
    </div>
  );
}

export default My_NewCars;
