import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../../../usedCar/carDetail/carDetail.scss";
import { Carousel } from "react-bootstrap";
import { UserContext } from "../../../../context/userContext";
import LoaderComponent from "../../../../components/loaderComponent/loaderComponent";

const BuyBikes_Detail = () => {
  const { user } = useContext(UserContext);
  const [showNumber, setShowNumber] = useState(false);
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getCarDetail() {
      try {
        const response = await axios.get(
          `https://autofinder-backend.vercel.app/api/bike/${id}`
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

  const handleAddToFavorite = async ()=>{
    try {
      const response = await axios.post("https://autofinder-backend.vercel.app/api/user/addFavorite" , {carAdId : carDetail._id , userId:user._id})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading && <LoaderComponent />}

      <div className={`CarDetails ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && (
          <div className="parallel-layout">
            <div className="leftSide">
              <div><button onClick={handleAddToFavorite}>Add to Favorite</button></div>
              <div className="car-name-location">
                <h1>
                  {carDetail.brand} {carDetail.model} {carDetail.year}
                </h1>
                <p>
                  {carDetail.location}
                </p>
              </div>
              <div className="car-images">
                {/* <CCarousel controls indicators> */}
                <Carousel>
                  {carDetail.images.map((image) => (
                    <Carousel.Item as={"div"}>
                      <img src={image} alt="" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                {/* </CCarousel> */}
              </div>
              <div className="car-basic-specs">
                <div>{carDetail.KmDriven} km</div>
                <div>{carDetail.year}</div>
                <div>{carDetail.fuelType}</div>
              </div>
              <div className="car-detailed-specs">
                <div className="car-detailed-specs-child">
                  <p>Registered In :</p>
                  <p>{carDetail.registeredIn} </p>
                </div>
                <div className="car-detailed-specs-child">
                  <p>color :</p>
                  <p>{carDetail.color} </p>
                </div>
                <div className="car-detailed-specs-child">
                  <p>Engine Type :</p>
                  <p>{carDetail.engineType} </p>
                </div>
                <div className="car-detailed-specs-child">
                  <p>Uploaded On :</p>
                  <p>{carDetail.createdAt.split("T")[0]} </p>
                </div>
                <div className="car-detailed-specs-child">
                  <p>Uploaded On :</p>
                  <p>{carDetail.createdAt.split("T")[0]} </p>
                </div>
              </div>
              <div>
                <h3>Seller Description:</h3>
                <div>
                  <p>{carDetail.description}</p>
                </div>
              </div>
            </div>
            <div className="rightSide">
              <div className="price-and-contact">
                <h1>PKR {carDetail.price}</h1>
                <div
                  className="show-number-btn"
                  onClick={() =>
                    user
                      ? setShowNumber(!showNumber)
                      : alert("Please Login First")
                  }
                >
                  Show Contact Number
                </div>
                {user && showNumber ? (
                  <> {carDetail.user.phoneNumber}</>
                ) : (
                  <>XXXXXXXXXXX</>
                )}
              </div>
              <div className="user-detail">
                <p>Name: {carDetail.user?.name ?? "N/A"}</p>
                <p>
                  Email:{" "}
                  <a>
                    {carDetail.user?.email ?? "N/A"}
                  </a>{" "}
                </p>
                <p>Member Since: {carDetail.createdAt.split("T")[0]}</p>
              </div>
              <div className="imp-rules">
                <h6>Safety Tips For Transactions</h6>
                <ul>
                  <li>This is a rule</li>
                  <li>This is a rule</li>
                  <li>This is a rule</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyBikes_Detail;
