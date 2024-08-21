import React, { useEffect, useState } from "react";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
import "../AutoParts/Auto_Parts.css";
// Images
import True_Img from "../../assets/images/True_Img.png";
import False_Img from "../../assets/images/False_Img.png";

function Compare() {
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      const car1Make = localStorage.getItem("car1Make");
      const car2Make = localStorage.getItem("car2Make");

      if (!car1Make || !car2Make) {
        console.error("No car makes found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://autofinder-backend.vercel.app/api/newCar"
        );
        const data = await response.json();

        // Filter data based on makes
        const filteredData = data.data.filter(
          (car) => car.make === car1Make || car.make === car2Make
        );

        setCarData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data", error);
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  // Image Function
  const renderFeature = (value) => {
    if (value === true) {
      return <img id="My_Icon_Img" src={True_Img} alt="True" />;
    } else if (value === false) {
      return <img id="My_Icon_Img" src={False_Img} alt="False" />;
    } else {
      return value;
    }
  };

  // Main Body
  return (
    <>
      {isLoading && <LoaderComponent />}

      <div className={`BuyNow ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && carData.length > 0 && (
          <>
            <div className="pageHeadingCont">
              <h1>Car Details</h1>
            </div>
            <div className="underHeadingCont">
              <div id="My_CarDetails_Parent">
                {/* 2 Cars Detail */}
                <div id="My_CarDetails_Parent_Box_0">
                  <div id="My_CarDetails_Parent_Box_0_Sub">
                    {/* Box */}
                    <div id="My_CarDetails_Box">
                      <h2>Car 1</h2>
                      <div id="My_CarDetails_Box_Img">
                        <img src={carData[0].image} alt="NA" />
                      </div>
                      <span>
                        Year : <b id="My_B">{carData[0].year}</b>
                      </span>
                      <span>
                        Make : <b id="My_B">{carData[0].make}</b>
                      </span>
                      <span>
                        Model : <b id="My_B">{carData[0].model}</b>
                      </span>
                    </div>
                    {/* Box */}
                    <div
                      id="My_CarDetails_Box"
                      style={{ border: "0px solid transparent" }}
                    >
                      <h2 id="My_VS">Vs</h2>
                    </div>
                    {/* Box */}
                    <div id="My_CarDetails_Box">
                      <h2>Car 2</h2>
                      <div id="My_CarDetails_Box_Img">
                        <img src={carData[1].image} alt="NA" />
                      </div>
                      <span>
                        Year : <b id="My_B">{carData[1].year}</b>
                      </span>
                      <span>
                        Make : <b id="My_B">{carData[1].make}</b>
                      </span>
                      <span>
                        Model : <b id="My_B">{carData[1].model}</b>
                      </span>
                    </div>
                  </div>
                </div>
                {/* --- First Table Data Portion --- */}
                <br />
                <br />
                <h2 id="MyExtra_h2">Compare Specifications :</h2>
                {/* Key Specifications Table */}
                <table>
                  <thead>
                    <tr>
                      <th colSpan={3}>Key Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Price</td>
                      <td id="Td_Mid">
                        PKR {carData[0].keySpecifications.price}
                      </td>
                      <td id="Td_Mid">
                        PKR {carData[1].keySpecifications.price}
                      </td>
                    </tr>
                    <tr>
                      <td>Body Type</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.bodyType}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.bodyType}
                      </td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td id="Td_Mid">
                        {renderFeature(
                          carData[0].keySpecifications.transmission
                        )}
                      </td>
                      <td id="Td_Mid">
                        {renderFeature(
                          carData[1].keySpecifications.transmission
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Fuel Type</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.fuelType}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.fuelType}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Compare;
