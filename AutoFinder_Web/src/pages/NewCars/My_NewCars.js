import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";

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
      const response = await fetch(
        "https://autofinder-backend.vercel.app/api/newCar/compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data successfully posted");
        navigate("/My_NewCarsDetail");
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error("Error posting data", error);
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
            <div id="My_NewCars_Box">
              <div id="My_NewCars_Box_Sub">
                {/* Inputs for Car 1 */}
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
                {/* Inputs for Car 2 */}
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
                {/* Button to navigate to the next page */}
                <button onClick={handleSubmit}>Compare Cars</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default My_NewCars;
