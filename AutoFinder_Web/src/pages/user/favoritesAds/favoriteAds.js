import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import ReactLoading from "react-loading";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const FavoriteAds = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [noDataError, setNoDataError] = useState("");
  useEffect(() => {
    async function fetchData() {
      console.log(user);
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/favoriteAds",
          { userId: user._id }
        );
        console.log(response.data.data);
        if (response.data.ok && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setNoDataError("No Data Exist!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // --- Delete All Favorite Ads ---
  const handleDeleteFavorite = async () => {
    try {
      if (user && user._id) {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/user/deleteFavorite",
          { userId: user._id }
        );
        alert(" All Favorite Ads Are Deleted ");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // --- Delete All Favorite Ads ---

  const handleNavigateToSingleCarAd = (itemId) => {
    // navigate(`/used-car/detail/${itemId}`);
    console.log(" Clicked Item ID : ", itemId);
  };
  return (
    <div className="UserAds">
      <br />
      <h2 style={{ textAlign: "center", letterSpacing: 3.5, fontWeight: "600", }}>
        Your Favorite Ads
      </h2>
      <div id="My_Del_Ad_Parent">
        <button id="My_Del_Ad" onClick={handleDeleteFavorite}>
          Delete All Ads
        </button>
      </div>
      <br />
      <div className="myAdsCont">
        {!data && (
          <span className="loaderCont">
            <ReactLoading
              type={"bars"}
              color={"#cd0100"}
              height={"50px"}
              width={"50px"}
            />
          </span>
        )}
        {data &&
          data.map((item) => (
            <div
              key={item._id}
              className="adCard"
              onClick={() => handleNavigateToSingleCarAd(item._id)}
            >
              <div className="imgHolder">
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : " - "
                  }
                  alt=""
                />
              </div>
              <div className="detailHolder">
                {/* --- Condition Here For Auto Part & Car , Bike --- */}
                {item.brand && item.model && item.year ? (
                  <h4 className="adTitle">
                    {item.brand} {item.model} {item.year}
                  </h4>
                ) : (
                  <h4 className="adTitle">{item.title ? item.title : " - "}</h4>
                )}
                {/* --- Condition Here For Auto Part & Car , Bike --- */}
                <p>{item.location ? item.location : " - "}</p>
                {/* --- Condition Here For Auto Part Category --- */}
                {item.fuelType ? (
                  <p>
                    {item.kmDriven ? item.kmDriven.toLocaleString() : " - "} km
                    | {item.fuelType ? item.fuelType : " - "}
                  </p>
                ) : (
                  <p>
                    {item.category && item.category.name
                      ? item.category.name
                      : " - "}
                  </p>
                )}
                {/* --- Condition Here For Auto Part Category --- */}
                <p>
                  Posted{" "}
                  {item.createdAt
                    ? formatDistanceToNow(new Date(item.createdAt))
                    : " - "}{" "}
                  ago
                </p>
                <h4 className="adPrice">
                  {item.price ? item.price.toLocaleString() : " - "}
                </h4>
              </div>
            </div>
          ))}
        <br />
      </div>
    </div>
  );
};

export default FavoriteAds;
