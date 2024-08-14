import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "../blogs/blogs.scss";
// CSS
import "../AutoParts/Auto_Parts.css";

import axios from "axios";

const Videos = () => {
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
          "https://autofinder-backend.vercel.app/api/video"
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNavigateToLinkURL = (linkURL) => {
    const formattedURL = linkURL.startsWith('http') ? linkURL : `https://${linkURL}`;
    window.open(formattedURL, '_blank');
  };

  // Main Body
  return (
    <div className="Blogs">
      <div className="pageHeadingCont">
        <h1>Videos</h1>
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
              onClick={() => handleNavigateToLinkURL(item.LinkURL)}
            >
              <div className="My_imgHolder">
                <img src={item.thumbnail} alt="" />
              </div>
              <div className="My_detailHolder">
                <h4>{item.title}</h4>
                <h6 className="My_Date">Created At: {formatDate(item.createdAt)}</h6>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Videos;
