import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
import "../AutoParts/Auto_Parts.css";
import { UserContext } from "../../context/userContext";
// Images
import True_Img from "../../assets/images/True_Img.png";
import False_Img from "../../assets/images/False_Img.png";

function My_NewCarsDetail_2() {
  const { user } = useContext(UserContext);
  const [showNumber, setShowNumber] = useState(false);
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getCarDetail() {
      try {
        const response = await axios.get(
          `https://autofinder-backend.vercel.app/api/newCar/${id}`
        );
        if (response.data.ok) {
          setCarDetail(response.data.data);
          setIsLoading(false);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCarDetail();
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
        {!isLoading && carDetail && (
          <>
            <div className="pageHeadingCont">
              <h1>Car Details</h1>
            </div>
            <div className="underHeadingCont">
              <div id="My_CarDetails_Parent">
                <div id="My_CarDetails_Parent_Box_0">
                  <div id="My_CarDetails_Parent_Box_0_Sub">
                    <div id="My_CarDetails_Box">
                      <h2>
                        {carDetail.make} {carDetail.model}
                      </h2>
                      <div id="My_CarDetails_Box_Img">
                        <img src={carDetail.image} alt={carDetail.model} />
                      </div>
                      <span>
                        Year : <b id="My_B">{carDetail.year}</b>
                      </span>
                      <span>
                        Make : <b id="My_B">{carDetail.make}</b>
                      </span>
                      <span>
                        Model : <b id="My_B">{carDetail.model}</b>
                      </span>
                      {/* You can add more details here if needed */}
                    </div>
                  </div>
                </div>
                {/* Table */}
                <div id="My_CarDetails_Parent_Box">
                  {/* --- First Portion Data Items --- */}
                  <h2 id="MyExtra_h2">Key Specifications :</h2>
                  <table>
                  <thead>
                      <tr>
                        <th colSpan={3}>Key Specifications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <td id="Td_Mid">PKR {carDetail.keySpecifications.price}</td>
                      </tr>
                      <tr>
                        <td>Body Type</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.bodyType}
                        </td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.dimensions}
                        </td>
                      </tr>
                      <tr>
                        <td>Ground Clearance</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.groundClearance}
                        </td>
                      </tr>
                      <tr>
                        <td>Horse Power</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.horsePower}
                        </td>
                      </tr>
                      <tr>
                        <td>Boot Space</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.bootSpace}
                        </td>
                      </tr>
                      <tr>
                        <td>Fuel Type</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.fuelType}
                        </td>
                      </tr>
                      <tr>
                        <td>Battery Capacity</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.batteryCapacity || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Charging Time</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.chargingTime || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Top Speed</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.topSpeed}
                        </td>
                      </tr>
                      <tr>
                        <td>Range</td>
                        <td id="Td_Mid">{carDetail.keySpecifications.range || "-"}</td>
                      </tr>
                      <tr>
                        <td>Transmission</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.transmission}
                        </td>
                      </tr>
                      <tr>
                        <td>Kerb Weight</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.kerbWeight}
                        </td>
                      </tr>
                      <tr>
                        <td>Seating Capacity</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.seatingCapacity}
                        </td>
                      </tr>
                      <tr>
                        <td>Tyre Size</td>
                        <td id="Td_Mid">
                          {carDetail.keySpecifications.tyreSize}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* --- First Portion Data Items --- */}
                  {/* --- All Table Portion Starts --- */}
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
                          {carDetail.specifications.dimensions.overallLength}
                        </td>
                      </tr>
                      <tr>
                        <td>Overall Width</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.overallWidth}
                        </td>
                      </tr>
                      <tr>
                        <td>Overall Height</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.overallHeight}
                        </td>
                      </tr>
                      <tr>
                        <td>Wheel Base</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.wheelBase}
                        </td>
                      </tr>
                      <tr>
                        <td>Ground Clearance</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.groundClearance}
                        </td>
                      </tr>
                      <tr>
                        <td>Kerb Weight</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.kerbWeight}
                        </td>
                      </tr>
                      <tr>
                        <td>Boot Space</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.bootSpace}
                        </td>
                      </tr>
                      <tr>
                        <td>Seating Capacity</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.seatingCapacity}
                        </td>
                      </tr>
                      <tr>
                        <td>No. of Doors</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.dimensions.noOfDoors}
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
                          {carDetail.specifications.engineMotor.engineType ||
                            "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Battery Type</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.engineMotor.batteryType ||
                            "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Battery Capacity</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.engineMotor
                            .batteryCapacity || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Range</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.engineMotor.range || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Max Speed</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.engineMotor.maxSpeed}
                        </td>
                      </tr>
                      <tr>
                        <td>Power</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.engineMotor.power}
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
                            carDetail.specifications.transmission
                              .transmissionType
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Gearbox</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.transmission.gearbox}
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
                          {carDetail.specifications.steering.steeringType}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Assisted</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.steering.powerAssisted}
                        </td>
                      </tr>
                      <tr>
                        <td>Minimum Turning Radius</td>
                        <td id="Td_Mid">
                          {
                            carDetail.specifications.steering
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
                            carDetail.specifications.suspensionBrakes
                              .frontSuspension
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Suspension</td>
                        <td id="Td_Mid">
                          {
                            carDetail.specifications.suspensionBrakes
                              .rearSuspension
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Front Brakes</td>
                        <td id="Td_Mid">
                          {
                            carDetail.specifications.suspensionBrakes
                              .frontBrakes
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Brakes</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.suspensionBrakes.rearBrakes}
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
                          {carDetail.specifications.wheelsTyres.wheelType}
                        </td>
                      </tr>
                      <tr>
                        <td>Wheel Size</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.wheelsTyres.wheelSize}
                        </td>
                      </tr>
                      <tr>
                        <td>Tyre Size</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.wheelsTyres.tyreSize}
                        </td>
                      </tr>
                      <tr>
                        <td>Spare Tyre</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.wheelsTyres.spareTyre}
                        </td>
                      </tr>
                      <tr>
                        <td>PCD</td>
                        <td id="Td_Mid">
                          {carDetail.specifications.wheelsTyres.pcd}
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
                          {carDetail.features.safety.noOfAirbags}
                        </td>
                      </tr>
                      <tr>
                        <td>Number of Seatbelts</td>
                        <td id="Td_Mid">
                          {carDetail.features.safety.noOfSeatbelts}
                        </td>
                      </tr>
                      <tr>
                        <td>Driver Seatbelt Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.driverSeatBeltWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Passenger Seatbelt Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.passengerSeatBeltWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Door Ajar Warning</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.doorAjarWarning
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Adjustable Seats</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.adjustableSeats
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Vehicle Stability Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.vehicleStabilityControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Traction Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.tractionControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Hill Start Assist Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.hillStartAssistControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Hill Descent Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.hillDescentControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Child Safety Lock</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.childSafetyLock
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Speed Sensing Auto Door Lock</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.speedSensingAutoDoorLock
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Anti-Lock Braking System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.antiLockBrakingSystem
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Brake Assist</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.safety.brakeAssist)}
                        </td>
                      </tr>
                      <tr>
                        <td>Electronic Brake Force Distribution</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety
                              .electronicBrakeForceDistribution
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Brake Override System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.safety.brakeOverrideSystem
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
                            carDetail.features.exterior.alloyWheels
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Colored Outside Door Handles</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior
                              .coloredOutsideDoorHandles
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Body Colored Bumpers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.bodyColoredBumpers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Sun Roof</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.sunRoof)}
                        </td>
                      </tr>
                      <tr>
                        <td>Moon Roof</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.moonRoof)}
                        </td>
                      </tr>
                      <tr>
                        <td>Fog Lamps</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.fogLamps)}
                        </td>
                      </tr>
                      <tr>
                        <td>Roof Rail</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.roofRail)}
                        </td>
                      </tr>
                      <tr>
                        <td>Side Steps</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.sideSteps)}
                        </td>
                      </tr>
                      <tr>
                        <td>Adjustable Headlights</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.adjustableHeadlights
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Daytime Running Lights</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.daytimeRunningLights
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Headlight Washer</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.headlightWasher
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Xenon Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.xenonHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Spoiler</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.exterior.rearSpoiler
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Wiper</td>
                        <td id="Td_Mid">
                          {renderFeature(carDetail.features.exterior.rearWiper)}
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
                            carDetail.features.instrumentation.tachometer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Information Cluster</td>
                        <td id="Td_Mid">
                          {carDetail.features.instrumentation
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
                            carDetail.features.infotainment.cdPlayer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>DVD Player</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.dvdPlayer
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Number of Speakers</td>
                        <td id="Td_Mid">
                          {carDetail.features.infotainment.numberOfSpeakers ||
                            "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Front Speakers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.frontSpeakers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Speakers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.rearSpeakers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Bluetooth Connectivity</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment
                              .bluetoothConnectivity
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>USB and Auxiliary Cable</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.usbAndAuxiliaryCable
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Seat Entertainment</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment
                              .rearSeatEntertainment
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Android Auto</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.androidAuto
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Apple CarPlay</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.infotainment.appleCarPlay
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Touchscreen</td>
                        <td id="Td_Mid">
                          {carDetail.features.infotainment.touchscreen || "N/A"}
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
                            carDetail.features.comfortConvenience.airConditioner
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Climate Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.climateControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Air Purifier</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.airPurifier
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear AC Vents</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.rearAcVents
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Heater</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.rearHeater
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Heated Seats</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.heatedSeats
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Front Seat Ventilation</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .frontSeatVentilation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Seat Ventilation</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .rearSeatVentilation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Remote Controlled Boot</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .remoteControlledBoot
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Navigation System</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .navigationSystem
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Keyless Entry</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.keylessEntry
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Push Button Start</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .pushButtonStart
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Central Locking</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.centralLocking
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Cruise Control</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.cruiseControl
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Parking Sensors</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.parkingSensors
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Parking Camera</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.parkingCamera
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Auto Rain Sensing Wipers</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .autoRainSensingWipers
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Auto Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.autoHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Windows</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.powerWindows
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Steering</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.powerSteering
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Door Locks</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.powerDoorLocks
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Power Folding Mirrors</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .powerFoldingMirrors
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Wiper</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.rearWiper
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Rear Defogger</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience.rearDefogger
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Follow Me Home Headlamps</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
                              .followMeHomeHeadlamps
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Headlamp Beam Adjuster</td>
                        <td id="Td_Mid">
                          {renderFeature(
                            carDetail.features.comfortConvenience
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
        {!isLoading && !carDetail && (
          <div className="pageHeadingCont">
            <h1>No Data Available</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default My_NewCarsDetail_2;
