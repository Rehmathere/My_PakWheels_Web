import React, { useEffect, useState } from "react";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
// Images
import True_Img from "../../assets/images/True_Img.png";
import False_Img from "../../assets/images/False_Img.png";
import "../AutoParts/Auto_Parts.css";

function My_NewCarsDetail() {
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
                      <td>Dimensions</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.dimensions}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.dimensions}
                      </td>
                    </tr>
                    <tr>
                      <td>Ground Clearance</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.groundClearance}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.groundClearance}
                      </td>
                    </tr>
                    <tr>
                      <td>Horse Power</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.horsePower}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.horsePower}
                      </td>
                    </tr>
                    <tr>
                      <td>Boot Space</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.bootSpace}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.bootSpace}
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
                    <tr>
                      <td>Battery Capacity</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.batteryCapacity}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.batteryCapacity || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>Charging Time</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.chargingTime}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.chargingTime || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>Top Speed</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.topSpeed}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.topSpeed}
                      </td>
                    </tr>
                    <tr>
                      <td>Range</td>
                      <td id="Td_Mid">{carData[0].keySpecifications.range}</td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.range || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.transmission}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.transmission}
                      </td>
                    </tr>
                    <tr>
                      <td>Kerb Weight</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.kerbWeight}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.kerbWeight}
                      </td>
                    </tr>
                    <tr>
                      <td>Seating Capacity</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.seatingCapacity}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.seatingCapacity}
                      </td>
                    </tr>
                    <tr>
                      <td>Tyre Size</td>
                      <td id="Td_Mid">
                        {carData[0].keySpecifications.tyreSize}
                      </td>
                      <td id="Td_Mid">
                        {carData[1].keySpecifications.tyreSize}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* --- First Table Data Portion --- */}
                {/* Table */}
                <div id="My_CarDetails_Parent_Box">
                  {/* --- All Table Portion Starts --- */}
                  <br />
                  <br />
                  <h2>Compare Specifications :</h2>
                  {/* Dimensions Table */}
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Dimensions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Overall Length</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.overallLength}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.overallLength}
                        </td>
                      </tr>
                      <tr>
                        <td>Overall Width</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.overallWidth}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.overallWidth}
                        </td>
                      </tr>
                      <tr>
                        <td>Overall Height</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.overallHeight}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.overallHeight}
                        </td>
                      </tr>
                      <tr>
                        <td>Wheel Base</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.wheelBase}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.wheelBase}
                        </td>
                      </tr>
                      <tr>
                        <td>Ground Clearance</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.groundClearance}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.groundClearance}
                        </td>
                      </tr>
                      <tr>
                        <td>Kerb Weight</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.kerbWeight}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.kerbWeight}
                        </td>
                      </tr>
                      <tr>
                        <td>Boot Space</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.bootSpace}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.bootSpace}
                        </td>
                      </tr>
                      <tr>
                        <td>Seating Capacity</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.seatingCapacity}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.seatingCapacity}
                        </td>
                      </tr>
                      <tr>
                        <td>No. of Doors</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.dimensions.noOfDoors}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.dimensions.noOfDoors}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Engine and Motor Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Engine and Motor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Engine Type</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.engineMotor.engineType}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.engineMotor.engineType}
                        </td>
                      </tr>
                      <tr>
                        <td>Battery Type</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.engineMotor.batteryType}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.engineMotor.batteryType}
                        </td>
                      </tr>
                      <tr>
                        <td>Battery Capacity</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.engineMotor
                              .batteryCapacity
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.engineMotor
                              .batteryCapacity
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Range</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.engineMotor.range}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.engineMotor.range}
                        </td>
                      </tr>
                      <tr>
                        <td>Max Speed</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.engineMotor.maxSpeed}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.engineMotor.maxSpeed}
                        </td>
                      </tr>
                      <tr>
                        <td>Power</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.engineMotor.power}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.engineMotor.power}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Transmission Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Transmission</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Transmission Type</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.transmission
                              .transmissionType
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.transmission
                              .transmissionType
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Gearbox</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.transmission.gearbox}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.transmission.gearbox}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Steering Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Steering</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Steering Type</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.steering.steeringType}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.steering.steeringType}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Assisted</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.steering.powerAssisted}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.steering.powerAssisted}
                        </td>
                      </tr>
                      <tr>
                        <td>Minimum Turning Radius</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.steering
                              .minimumTurningRadius
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.steering
                              .minimumTurningRadius
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Suspension and Brakes Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Suspension and Brakes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Front Suspension</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.suspensionBrakes
                              .frontSuspension
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.suspensionBrakes
                              .frontSuspension
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Suspension</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.suspensionBrakes
                              .rearSuspension
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.suspensionBrakes
                              .rearSuspension
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Front Brakes</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.suspensionBrakes
                              .frontBrakes
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.suspensionBrakes
                              .frontBrakes
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Brakes</td>
                        <td id="Td_Mid">
                          {
                            carData[0].specifications.suspensionBrakes
                              .rearBrakes
                          }
                        </td>
                        <td id="Td_Mid">
                          {
                            carData[1].specifications.suspensionBrakes
                              .rearBrakes
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Wheels and Tyres Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Wheels and Tyres</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Wheel Type</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.wheelsTyres.wheelType}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.wheelsTyres.wheelType}
                        </td>
                      </tr>
                      <tr>
                        <td>Wheel Size</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.wheelsTyres.wheelSize}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.wheelsTyres.wheelSize}
                        </td>
                      </tr>
                      <tr>
                        <td>Tyre Size</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.wheelsTyres.tyreSize}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.wheelsTyres.tyreSize}
                        </td>
                      </tr>
                      <tr>
                        <td>Spare Tyre</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.wheelsTyres.spareTyre}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.wheelsTyres.spareTyre}
                        </td>
                      </tr>
                      <tr>
                        <td>PCD</td>
                        <td id="Td_Mid">
                          {carData[0].specifications.wheelsTyres.pcd}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].specifications.wheelsTyres.pcd}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* --- Features Heading --- */}
                  <br />
                  <br />
                  <br />
                  <h2>Compare Features :</h2>
                  {/* Safety Features Table */}
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Safety</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Number of Airbags</td>
                        <td id="Td_Mid">
                          {carData[0].features.safety.noOfAirbags}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].features.safety.noOfAirbags}
                        </td>
                      </tr>
                      <tr>
                        <td>Number of Seatbelts</td>
                        <td id="Td_Mid">
                          {carData[0].features.safety.noOfSeatbelts}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].features.safety.noOfSeatbelts}
                        </td>
                      </tr>
                      <tr>
                        <td>Driver Seatbelt Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.driverSeatBeltWarning
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.driverSeatBeltWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Passenger Seatbelt Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.passengerSeatBeltWarning
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.passengerSeatBeltWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Door Ajar Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.doorAjarWarning
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.doorAjarWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Adjustable Seats</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.adjustableSeats
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.adjustableSeats
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Vehicle Stability Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.vehicleStabilityControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.vehicleStabilityControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Traction Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.tractionControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.tractionControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Hill Start Assist Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.hillStartAssistControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.hillStartAssistControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Hill Descent Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.hillDescentControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.hillDescentControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Child Safety Lock</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.childSafetyLock
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.childSafetyLock
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Speed Sensing Auto Door Lock</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.speedSensingAutoDoorLock
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.speedSensingAutoDoorLock
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Anti-Lock Braking System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.antiLockBrakingSystem
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.antiLockBrakingSystem
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Brake Assist</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.brakeAssist
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.brakeAssist
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Electronic Brake Force Distribution</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety
                              .electronicBrakeForceDistribution
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety
                              .electronicBrakeForceDistribution
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Brake Override System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.safety.brakeOverrideSystem
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.safety.brakeOverrideSystem
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Exterior Features Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Exterior</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alloy Wheels</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.alloyWheels
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.alloyWheels
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Colored Outside Door Handles</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior
                              .coloredOutsideDoorHandles
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior
                              .coloredOutsideDoorHandles
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Body Colored Bumpers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.bodyColoredBumpers
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.bodyColoredBumpers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Sun Roof</td>
                        <td id="Td_Mid">
                          {renderFeature(carData[0].features.exterior.sunRoof)}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(carData[1].features.exterior.sunRoof)}
                        </td>
                      </tr>
                      <tr>
                        <td>Moon Roof</td>
                        <td id="Td_Mid">
                          {renderFeature(carData[0].features.exterior.moonRoof)}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(carData[1].features.exterior.moonRoof)}
                        </td>
                      </tr>
                      <tr>
                        <td>Fog Lamps</td>
                        <td id="Td_Mid">
                          {renderFeature(carData[0].features.exterior.fogLamps)}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(carData[1].features.exterior.fogLamps)}
                        </td>
                      </tr>
                      <tr>
                        <td>Roof Rail</td>
                        <td id="Td_Mid">
                          {renderFeature(carData[0].features.exterior.roofRail)}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(carData[1].features.exterior.roofRail)}
                        </td>
                      </tr>
                      <tr>
                        <td>Side Steps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.sideSteps
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.sideSteps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Adjustable Headlights</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.adjustableHeadlights
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.adjustableHeadlights
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Daytime Running Lights</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.daytimeRunningLights
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.daytimeRunningLights
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Headlight Washer</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.headlightWasher
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.headlightWasher
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Xenon Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.xenonHeadlamps
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.xenonHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Spoiler</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.rearSpoiler
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.rearSpoiler
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Wiper</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.exterior.rearWiper
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.exterior.rearWiper
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Instrumentation Features Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Instrumentation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tachometer</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.instrumentation.tachometer
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.instrumentation.tachometer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Information Cluster</td>
                        <td id="Td_Mid">
                          {carData[0].features.instrumentation
                            .informationCluster || "N/A"}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].features.instrumentation
                            .informationCluster || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Infotainment Features Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={3}>Infotainment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CD Player</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.cdPlayer
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.cdPlayer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>DVD Player</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.dvdPlayer
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.dvdPlayer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Number of Speakers</td>
                        <td id="Td_Mid">
                          {carData[0].features.infotainment.numberOfSpeakers ||
                            "N/A"}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].features.infotainment.numberOfSpeakers ||
                            "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Front Speakers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.frontSpeakers
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.frontSpeakers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Speakers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.rearSpeakers
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.rearSpeakers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Bluetooth Connectivity</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment
                              .bluetoothConnectivity
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment
                              .bluetoothConnectivity
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>USB and Auxiliary Cable</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment
                              .usbAndAuxiliaryCable
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment
                              .usbAndAuxiliaryCable
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Seat Entertainment</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment
                              .rearSeatEntertainment
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment
                              .rearSeatEntertainment
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Android Auto</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.androidAuto
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.androidAuto
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Apple CarPlay</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.infotainment.appleCarPlay
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.infotainment.appleCarPlay
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Touchscreen</td>
                        <td id="Td_Mid">
                          {carData[0].features.infotainment.touchscreen ||
                            "N/A"}
                        </td>
                        <td id="Td_Mid">
                          {carData[1].features.infotainment.touchscreen ||
                            "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Comfort and Convenience Table */}
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>Comfort & Convenience</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Air Conditioner</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .airConditioner
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .airConditioner
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Climate Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .climateControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .climateControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Air Purifier</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.airPurifier
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.airPurifier
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear AC Vents</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.rearAcVents
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.rearAcVents
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Heater</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.rearHeater
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.rearHeater
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Heated Seats</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.heatedSeats
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.heatedSeats
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Front Seat Ventilation</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .frontSeatVentilation
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .frontSeatVentilation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Seat Ventilation</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .rearSeatVentilation
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .rearSeatVentilation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Remote Controlled Boot</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .remoteControlledBoot
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .remoteControlledBoot
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Navigation System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .navigationSystem
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .navigationSystem
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Keyless Entry</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.keylessEntry
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.keylessEntry
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Push Button Start</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .pushButtonStart
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .pushButtonStart
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Central Locking</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .centralLocking
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .centralLocking
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Cruise Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.cruiseControl
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.cruiseControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Parking Sensors</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .parkingSensors
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .parkingSensors
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Parking Camera</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.parkingCamera
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.parkingCamera
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Auto Rain Sensing Wipers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .autoRainSensingWipers
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .autoRainSensingWipers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Auto Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.autoHeadlamps
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.autoHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Windows</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.powerWindows
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.powerWindows
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Steering</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.powerSteering
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.powerSteering
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Door Locks</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .powerDoorLocks
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .powerDoorLocks
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Folding Mirrors</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .powerFoldingMirrors
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .powerFoldingMirrors
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Wiper</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.rearWiper
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.rearWiper
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Defogger</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience.rearDefogger
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience.rearDefogger
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Follow Me Home Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .followMeHomeHeadlamps
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .followMeHomeHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Headlamp Beam Adjuster</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[0].features.comfortConvenience
                              .headlampBeamAdjuster
                          )}
                        </td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carData[1].features.comfortConvenience
                              .headlampBeamAdjuster
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  {/* --- All Table Portion Ends --- */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default My_NewCarsDetail;
