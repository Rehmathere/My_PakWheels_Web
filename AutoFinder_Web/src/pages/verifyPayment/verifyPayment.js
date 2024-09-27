import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./selectPaymentMethod.scss";

const VerifyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let adData = location.state;
  const [file, setFile] = useState(null);

  // Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const NAME_OF_UPLOAD_PRESET = "fzjlnas0";
    const YOUR_CLOUDINARY_ID = "dzofo9uh0";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    return img.url;
  };

  // Handle file input selection
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    try {
      // Upload the file to Cloudinary and get the image URL
      const imageUrl = await uploadToCloudinary(file);
      adData = { ...adData, image: imageUrl };
      console.log(adData);

      let response;
      if (adData.service === "000") {
        response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAdRequest/upload",
          adData
        );
      } else if (
        adData.service === "002" ||
        adData.service === "001" ||
        adData.service === "003"
      ) {
        response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/upload",
          { ...adData, price: adData.priceToPay }
        );
      } else if (adData.service === "004") {
        response = await axios.post(
          "https://autofinder-backend.vercel.app/api/buyPackageRequest/upload",
          { ...adData, price: adData.priceToPay }
        );
        console.log(adData);
      } else if (adData.service === "005") {
        response = await axios.post("http://localhost:8000/api/bikeRequest/add" , adData)
        console.log(response.data)
      }

      if (response && response.data.ok) {
        alert("Your Request Has Been Submitted");
        navigate("/");
      } else if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="VerifyPayment">
      <h1>Verify Payment</h1>
      <div className="importantNoticeHolder">
        <p>
          <span>⚠️</span> <strong>NOTE: </strong> This is the important Notice!!!!
          This is the important Notice!!!! This is the important Notice!!!! This is
          the important Notice!!!! This is the important Notice!!!!
        </p>
      </div>
      <form>
        <input type="file" onChange={handleFileInputChange} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default VerifyPayment;
