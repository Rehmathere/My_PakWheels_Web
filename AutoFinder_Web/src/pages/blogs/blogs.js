import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "./blogs.scss";
// CSS
import "../AutoParts/Auto_Parts.css";

import axios from "axios";

const Blogs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/blog"
        );
        if (response.data.ok) {
          setData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
        setIsLoading(false);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, []);

  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/blogs/${itemId}`);
  };

  // Main Body
  return (
    <div className="Blogs">
      <div className="pageHeadingCont">
        <h1>Blog</h1>
      </div>
      <div className="carAdsCont">
        {isLoading && (
          <span className="loaderCont">
            <ReactLoading
              type={"bars"}
              color={"#cd0100"}
              height={"50px"}
              width={"50px"}
            />
          </span>
        )}
        {noDataError && <p>{noDataError}</p>}
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item._id}
              className="My_adCard"
              onClick={() => handleNavigateToSingleCarAd(item._id)}
            >
              <div className="My_imgHolder">
                <img src={item.thumbnail} alt="" />
              </div>
              <div className="My_detailHolder">
                <h4>{item.title}</h4>
                <p>{item.subTitle}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
