// Import necessary dependencies and components
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRehydrateUser from "../../../hooks/user/rehydrateUser";
import { UserContext } from "../../../context/userContext";
import LoaderComponent from "../../../components/loaderComponent/loaderComponent";
import CityPicker from "../../../components/cityPicker/cityPicker";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import axios from "axios";
import Modal from "react-modal";

import "../../bikes/used/postBikeAd/postBikeAd.scss";



const Post_AutoPartAd = () => {
  // Define state variables
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [pictures, setPictures] = useState([]);
  const [images, setImages] = useState([]);
  const [bikeTypes, setBikeTypes] = useState([]);
  const [bikeTypeMap, setBikeTypeMap] = useState({});
  const [selectedBikeType, setSelectedBikeType] = useState("");

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

  // Function to handle form submission
  const handlePostFreeAd = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all the fields");
      return;
    }
    setDisabled(true);
    const adData = await gatherAdData();
    console.log(adData);
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/autoPart/add",
        adData
      );
      if (response.data.ok) {
        alert("Your Ad Has Been Posted");
        setLocation("");
        setTitle("");
        setImages([]);
        setPrice("");
        setPictures([]);
        setSelectedBikeType("");
        setDisabled(false);
      }
    } catch (error) {
      alert("Error occurred while posting ad. Please Try Again Later.");
      setDisabled(false);
    }
  };

  // Function to handle city selection
  const handleChangeCity = (value) => {
    setLocation(value);
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

  // Effect to fetch bike types from API
  useEffect(() => {
    const fetchBikeTypes = async () => {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/autoPartCategory"
        );
        if (response.data.ok) {
          const types = response.data.data;
          setBikeTypes(types.map((item) => item.name));
          const typeMap = {};
          types.forEach((type) => {
            typeMap[type.name] = type._id;
          });
          setBikeTypeMap(typeMap);
        }
      } catch (error) {
        console.error("Error fetching bike types: ", error);
      }
    };

    fetchBikeTypes();
  }, []);

  // Is Form Valid

  const isFormValid = () => {
    return (
      images.length > 0 &&
      location.trim() !== "" &&
      title.trim() !== "" &&
      selectedBikeType.trim() !== "" &&
      price.trim() !== "" &&
      description.trim() !== ""
    );
  };

  // Function to gather ad data
  const gatherAdData = async () => {
    const imagesURLPromises = images.map((imageObj) =>
      uploadToCloudinary(imageObj)
    );
    const uploadedImages = await Promise.all(imagesURLPromises);
    const adData = {
      images: uploadedImages,
      location: location,
      price: parseInt(price),
      description: description,
      title: title,
      category: { _id: bikeTypeMap[selectedBikeType] },
      user: user, // Include the user object
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
      openModal();
    } else {
      alert("Please fill all the fields");
    }
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
      <h1 className="postAdHeading">Post Auto Part Ad</h1>
      <form>
        <div className="formFirstDiv padding-10">
          <CityPicker passValueFn={handleChangeCity} label={"City"} />
        </div>
        <div className="formFirstDiv padding-10">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <Form.Item
            label="Upload"
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
          <label>Category:</label>
          <select
            value={selectedBikeType}
            onChange={(e) => setSelectedBikeType(e.target.value)}
          >
            <option value="">Select Category</option>
            {bikeTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
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
              Select Ad Package
            </button>
          </div>
        )}
      </form>
      <Modal
        isOpen={modalIsOpenSelectPackage}
        onRequestClose={closeModal}
        contentLabel="Select Package"
      >
        <h2>Select Package</h2>
        <button onClick={closeModal}>close</button>
        <button
          onClick={() => {
            handlePackageSelect(30, 500);
          }}
        >
          30 days - $500
        </button>
        <button
          onClick={() => {
            handlePackageSelect(60, 800);
          }}
        >
          60 days - $800
        </button>
      </Modal>
    </div>
  );
};

export default Post_AutoPartAd;


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
