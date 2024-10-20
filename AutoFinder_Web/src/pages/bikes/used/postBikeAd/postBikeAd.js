// Import necessary dependencies and components
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRehydrateUser from "../../../../hooks/user/rehydrateUser";
import { UserContext } from "../../../../context/userContext";
import LoaderComponent from "../../../../components/loaderComponent/loaderComponent";
// import CityPicker from "../../../../components/cityPicker/cityPicker";
import CityPicker from "../../../../components/cityPicker/my_cityPicker";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import axios from "axios";
import YearPicker from "../../../../components/yearPicker/yearPicker";
import Modal from "react-modal";

import "./postBikeAd.scss";

const PostBikeAd = () => {
  // Define state variables
  const [location, setLocation] = useState("");
  const [registeredIn, setRegisteredIn] = useState("");
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [description, setDescription] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [pictures, setPictures] = useState([]);
  const [images, setImages] = useState([]);

  // disabled
  const [disabled, setDisabled] = useState(false);

  // Define valid types
  const validTypes = ["standard", "featured"];

  // Get type from query
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [formType, setFormType] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!type || !validTypes.includes(type)) {
      alert("Invalid type provided. Redirecting to home.");
      navigate("/");
    } else {
      setFormType(type);
    }
  }, [type]);

  // Color Data
  const colorData = ["Red", "White", "Black", "Gray"];

  // Function to handle form submission
  const handlePostFreeAd = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all the fields");
    }
    setDisabled(true);
    const adData = await gatherAdData();
    console.log(adData);
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/bike/add",
        adData
      );
      if (response.data.ok) {
        alert("Your Ad Has Been Posted");
        setModel("");
        setBrand("");
        setLocation("");
        setRegisteredIn("");
        setColor("");
        setImages([]);
        setKmDriven("");
        setPictures([]);
        setEngineType("");
        setDisabled(false);
      }
    } catch (error) {
      alert("Error occurred while posting ad. Please Try Again Later.");
    }
  };

  // Function to handle city selection
  const handleChangeCity = (value) => {
    setLocation(value);
  };

  // Function to handle "Registered In" selection
  const handleRegisteredIn = (value) => {
    setRegisteredIn(value);
  };

  // Function to handle year selection
  const handleChangeYear = (value) => {
    setYear(value);
  };

  // Function to handle radio button selection
  const handleFuelChange = (e) => {
    setFuelType(e.target.value);
  };

  const handleEngineChange = (e) => {
    setEngineType(e.target.value);
  };

  // Function to upload files to Cloudinary
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

  // Function to handle picture changes
  const handlePictureChange = (fileList) => {
    setPictures(fileList);
  };

  // Effect to update images state when pictures change
  useEffect(() => {
    setImages(pictures.map((picture) => picture.originFileObj));
  }, [pictures]);

  // Is Form Valid

  const isFormValid = () => {
    return (
      images.length > 0 &&
      location.trim() !== "" &&
      registeredIn.trim() !== "" &&
      year.trim() !== "" &&
      brand.trim() !== "" &&
      model.trim() !== "" &&
      color.trim() !== "" &&
      kmDriven.trim() !== "" &&
      price.trim() !== "" &&
      fuelType.trim() !== "" &&
      engineType.trim() !== "" &&
      description.trim() !== ""
    );
  };

  // Function to gather ad data
  const gatherAdData = async () => {
    const imagesURLPromises = images.map((imageObj) =>
      uploadToCloudinary(imageObj)
    );
    const imagesURL = await Promise.all(imagesURLPromises);
    const adData = {
      images: imagesURL,
      location: location,
      year: parseInt(year),
      brand: brand,
      model: model,
      registeredIn: registeredIn,
      color: color,
      KmDriven: parseInt(kmDriven),
      price: parseInt(price),
      fuelType: fuelType,
      engineType: engineType,
      description: description,
    };
    return adData;
  };

  // Navigation and user context
  const { rehydrateUser } = useRehydrateUser();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function checkUser() {
      if (!localStorage.getItem("token")) {
        alert("please Login First");
        navigate("/");
      } else {
        if (!user) {
          const userr = await rehydrateUser();
          if (userr) {
            setLoading(false);
          } else {
            navigate("/");
          }
        } else {
          setLoading(false);
        }
      }
    }
    checkUser();
  }, [user]);

  // MODAL
  const [modalIsOpenSelectPackage, setIsSelectPackage] = useState(false);
  function openModal() {
    setIsSelectPackage(true);
  }

  function closeModal() {
    setIsSelectPackage(false);
  }

  // HANDLE POST "FEATURED AD"
  const handlePostFeaturedAd = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // const adData = await gatherAdData();
      // console.log(adData)
      openModal();
    } else {
      alert("Please fill all the fields");
    }
    // const adData = createAdData();
  };

  const handlePackageSelect = async (days, priceToPay) => {
    setDisabled(true);
    let adData = await gatherAdData();
    adData = { ...adData, days, priceToPay, service: "005" };
    setDisabled(false);
    navigate("/select-payment-method", { state: { adData } });
  };

  if (loading) return <LoaderComponent />;
  return (
    <div className="PostBikeAd">
      <br />
      <h1 className="postAdHeading">Post Bike Ad</h1>
      <form>
        <div className="formFirstDiv padding-10">
          <CityPicker passValueFn={handleChangeCity} label={"City"} />
        </div>
        <div className="formFirstDiv padding-10">
          <CityPicker
            passValueFn={handleRegisteredIn}
            label={"Registered In"}
          />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Year:</label>
          <YearPicker passValueFn={handleChangeYear} />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Exterior Color:</label>
          <select
            name=""
            id=""
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {colorData.length > 0 &&
              colorData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className="formFirstDiv padding-10">
          <label>Price:</label>
          <input
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Km Driven:</label>
          <input
            type="number"
            value={kmDriven}
            onChange={(e) => setKmDriven(e.target.value)}
          />
        </div>
        <div className="formFirstDiv padding-10">
          <Form.Item
            label="Image Upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload
              listType="picture-card"
              fileList={pictures}
              onChange={({ fileList }) => handlePictureChange(fileList)}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </div>
        <div className="formFirstDiv padding-10">
          <label>Fuel Type:</label>
          <div>
            <input
              type="radio"
              id="petrol"
              name="fuelType"
              value="petrol"
              checked={fuelType === "petrol"}
              onChange={handleFuelChange}
            />
            &nbsp;&nbsp;<label htmlFor="petrol">Petrol</label>
          </div>
          <div>
            <input
              type="radio"
              id="electric"
              name="fuelType"
              value="electric"
              checked={fuelType === "electric"}
              onChange={handleFuelChange}
            />
            &nbsp;&nbsp;<label htmlFor="electric">Electric</label>
          </div>
        </div>

        <div className="formFirstDiv padding-10">
          <label>Engine Type:</label>
          <div>
            <input
              type="radio"
              id="2stroke"
              name="engineType"
              value="2stroke"
              checked={engineType === "2stroke"}
              onChange={handleEngineChange}
            />
            &nbsp;&nbsp;<label htmlFor="2stroke">2 Stroke</label>
          </div>
          <div>
            <input
              type="radio"
              id="4stroke"
              name="engineType"
              value="4stroke"
              checked={engineType === "4stroke"}
              onChange={handleEngineChange}
            />
            &nbsp;&nbsp;<label htmlFor="4stroke">4 Stroke</label>
          </div>
        </div>
        <div className="formFirstDiv padding-10">
          <label>Description</label>
          <textarea
            name=""
            id=""
            cols="60"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {formType && formType === "standard" && (
          <div className="formFirstDiv padding-10">
            <button onClick={handlePostFreeAd} disabled={disabled}>
              Post Free Ad
            </button>
          </div>
        )}
        {formType && formType === "featured" && (
          <div className="formFirstDiv padding-10">
            <button onClick={handlePostFeaturedAd} disabled={disabled}>
              Post Featured Ad
            </button>
          </div>
        )}
      </form>
      {/* ===========================  MODAL    ====================== */}
      <Modal
        isOpen={modalIsOpenSelectPackage}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Pacakge"
        ariaHideApp={false}
      >
        <div className="modalDiv">
          <h1>Please Select A Desired Pacakge</h1>

          <div className="modalButtonHolder">
            <button
              onClick={() => handlePackageSelect("7", "225")}
              className="color3"
              disabled={disabled}
            >
              7-Days Package For PKR 225
            </button>
            <button
              onClick={() => handlePackageSelect("30", "525")}
              className="color2"
              disabled={disabled}
            >
              30-Days Package For PKR 525
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostBikeAd;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f4f4f4",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 150,
  },
};
