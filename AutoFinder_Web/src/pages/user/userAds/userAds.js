import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const UserAds = () => {
  const navigate = useNavigate();
  const [user] = useOutletContext();
  const [data, setData] = useState(null);
  const [noDataError, setNoDataError] = useState("");
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          {
            user: user._id,
          }
        );
        setData(response.data.data);
      } catch (error) {
        if (error.response.status === 400) {
          setNoDataError("No Ads To Show!");
        }
      }
    }
    fetchData();
  }, [user]);

  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/used-car/detail/${itemId}`);
  };

  const handleBoostAd = async (carAdId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/boostAd",
        {
          carAdId: carAdId,
          userId: user._id,
        }
      );
      alert(" Your Ad Is Boosted ");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDeleteAd = async (carAdId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/deleteAd",
        {
          carAdId,
        }
      );
      if (response.data.ok) {
        alert(" Your Ad Is Deleted ");
        window.reload();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="UserAds">
      <h1 style={{ textAlign: "center" }}>Your Advertisements</h1>
      <div className="myAdsCont">
        {!data && !noDataError && (
          <span className="loaderCont">
            <ReactLoading
              type={"bars"}
              color={"#cd0100"}
              height={"50px"}
              width={"50px"}
            />
          </span>
        )}
        {!data && noDataError && (
          <span className="loaderCont">{noDataError}</span>
        )}
        {data &&
          data.map((item) => (
            <>
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
                    {item.brand} {item.model} {item.year} {item.varient}
                  </h4>
                  <p> {item.location}</p>
                  <p>
                    {item.kmDriven.toLocaleString()} km | {item.assembly} |{" "}
                    {item.fuelType} | {item.transmission}{" "}
                  </p>
                  <p>
                    {" "}
                    posted {formatDistanceToNow(
                      new Date(item.createdAt)
                    )} ago{" "}
                  </p>
                  <h4 className="adPrice">{item.price.toLocaleString()}</h4>
                </div>
              </div>
              {/* - Btn - */}
              <div id="My_Btn_Parent">
                <button
                  className="My_BtnHead_1"
                  onClick={() => handleBoostAd(item._id)}
                >
                  Boost Ad
                </button>
                <button
                  className="My_BtnHead_2"
                  onClick={() => handleDeleteAd(item._id)}
                >
                  Delete Ad
                </button>
              </div>
              <br />
              <br />
              <br />
            </>
          ))}
      </div>
    </div>
  );
};

export default UserAds;
