import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./oneBlog.scss";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";

const OneBlog = () => {
  const [showNumber, setShowNumber] = useState(false);
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCarDetail() {
      try {
        const response = await axios.get(
          `https://autofinder-backend.vercel.app/api/blog/${id}`
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

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Main Body
  return (
    <>
      {isLoading && <LoaderComponent />}

      <div className={`CarDetails ${isLoading ? "Fade-out" : "Fade-in"}`}>
        {!isLoading && (
          <div className="parallel-layout">
            <div className="leftSide">
              <div className="car-name-location">
                <div className="My_imgHolder_Detail">
                  <img src={carDetail.thumbnail} alt="" />
                </div>
                <h1>{carDetail.title}</h1>
                <h6>{carDetail.subTitle}</h6>
                <p className="My_Date">Author : {carDetail.author}</p>
                <p className="My_Date">Created At : {formatDate(carDetail.createdAt)}</p>
                <p dangerouslySetInnerHTML={createMarkup(carDetail.body)}></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OneBlog;
