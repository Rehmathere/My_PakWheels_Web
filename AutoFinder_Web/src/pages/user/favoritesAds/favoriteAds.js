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

  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/used-car/detail/${itemId}`);
  };
  return (
    <div className="UserAds">
      <br />
      <h2 style={{ textAlign: "center", letterSpacing: 1.5 }}>Your Favorite Ads</h2>
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
                <img src={item.images[0]} alt="" />
              </div>
              <div className="detailHolder">
                <h4 className="adTitle">
                  {item.brand} {item.model} {item.year}
                </h4>
                <p> {item.location}</p>
                <p>
                  {item.kmDriven.toLocaleString()} km | {item.fuelType}
                </p>
                <p>
                  {" "}
                  Posted {formatDistanceToNow(
                    new Date(item.createdAt)
                  )} ago{" "}
                </p>
                <h4 className="adPrice">{item.price.toLocaleString()}</h4>
              </div>
            </div>
          ))}
        <br />
      </div>
    </div>
  );
};

export default FavoriteAds;
