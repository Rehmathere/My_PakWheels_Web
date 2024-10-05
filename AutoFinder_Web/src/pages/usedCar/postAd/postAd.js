import { useEffect, useState, useContext } from "react";
import CarModelPicker from "../../../components/carModelPicker/carModelPicker";
import CityPicker from "../../../components/cityPicker/cityPicker";
import FeatureSelector from "../../../components/featureSelector/featureSelector";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./postAd.scss";
import useRehydrateUser from "../../../hooks/user/rehydrateUser";
import Modal from "react-modal";

const UsedCarPostAd = () => {
  const { rehydrateUser } = useRehydrateUser();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [disabledBtn, setDisableBtn] = useState(false);
  //
  const colorData = [
    "Red",
    "White",
    "Black",
    "Gray",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Silver",
    "Brown",
    "Maroon",
    "Gold",
    "Purple",
    "Pink",
    "Beige",
  ];

  //
  const [city, setCity] = useState("");
  const [registeredIn, setRegisteredIn] = useState("");
  const [color, setColor] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([]);
  const [pictures, setPictures] = useState([]); // State to store selected pictures
  const [images, setImages] = useState([]);
  const [transmission, setTransmission] = useState("");
  const [assembly, setAssembly] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [description, setDescription] = useState("");
  // CAR MODEL PICKER FUNCTIONS

  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const setYearFn = (value) => {
    setYear(value);
  };
  const setBrandFn = (value) => {
    setBrand(value);
  };
  const setModelFn = (value) => {
    setModel(value);
  };
  const setVariantFn = (value) => {
    setVariant(value);
  };

  //////////

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      images.length > 0 &&
      city &&
      year &&
      brand &&
      model &&
      registeredIn &&
      color &&
      kmDriven &&
      price &&
      features.length > 0 &&
      transmission &&
      assembly &&
      engineCapacity &&
      user._id &&
      fuelType &&
      description
    );
  };

  const setAdData = async () => {
    const imagesURLPromises = images.map(async (imageObj) => {
      return await uploadToCloudinary(imageObj);
    });
    const imagesURL = await Promise.all(imagesURLPromises);
    const adData = {
      images: imagesURL,
      location: city,
      year: year,
      brand: brand,
      model: model,
      varient: variant,
      registeredIn: registeredIn,
      bodyColor: color,
      kmDriven: kmDriven,
      price: price,
      features: features,
      transmission: transmission,
      assembly: assembly,
      engineCapacity: engineCapacity,
      user: user._id,
      fuelType: fuelType,
      description: description,
    };
    return adData;
  };

  const uploadToCloudinary = async (file) => {
    const NAME_OF_UPLOAD_PRESET = "fzjlnas0";
    const YOUR_CLOUDINARY_ID = "dzofo9uh0";
    /////////// TESTING
    // upload preset ml_default
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
    // console.log(img.url)
    return img.url;
  };

  const handlePostFreeAd = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please Fill all the fields");
      return;
    }

    const adData = await setAdData();
    // console.log(adData.images)
    try {
      setDisableBtn(true);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/upload",
        adData
      );
      console.log(response);
      if (response.data.ok) {
        alert("Your Ad Has Been Uploaded");
        setDisableBtn(false);
      }
    } catch (error) {
      console.log(error);
      openFreeModal();
      setDisableBtn(false);
    }
  };

  const handlePictureChange = (fileList) => {
    setPictures(fileList);
  };

  useEffect(() => {
    setTimeout(() => {
      setImages(pictures.map((picture) => picture.originFileObj));
    }, 1000);
  }, [pictures]);

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

  const handleChangeFeature = (value) => {
    setFeatures(value);
  };

  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeRegisteredIn = (value) => {
    setRegisteredIn(value);
  };

  const handlePostFeaturedAd = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please Fill all the fields");
      return;
    }

    openModal();
  };

  const handlePackageSelect = async (days, priceToPay) => {
    let adData = await setAdData();
    adData = { ...adData, days, priceToPay, service: "000" };
    navigate("/select-payment-method", { state: { adData } });
  };

  // MODAL FUNCTIONS
  const [modalIsOpenSelectPackage, setIsSelectPackage] = useState(false);
  const [modalIsOpenSelectFreePackage, setIsOpenSelectFreePackage] =
    useState(false);
  function openModal() {
    setIsSelectPackage(true);
  }
  function openFreeModal() {
    setIsOpenSelectFreePackage(true);
  }
  function closeModal() {
    setIsSelectPackage(false);
  }
  function closeFreeModal() {
    setIsOpenSelectFreePackage(false);
  }

  if (loading) return <div>LOADING...</div>;
  if (!loading)
    return (
      <div className="UsedCarPostAd">
        <h1 className="postAdHeading">Sell your used car</h1>
        <form>
          <div className="formFirstDiv padding-10">
            <CityPicker passValueFn={handleChangeCity} label={"City"} />
          </div>
          <div className="formFirstDiv">
            <CarModelPicker
              setYearPropFn={setYearFn}
              setBrandPropFn={setBrandFn}
              setModelPropFn={setModelFn}
              setVariantPropFn={setVariantFn}
            />
          </div>
          <div className="formFirstDiv padding-10">
            <CityPicker
              passValueFn={handleChangeRegisteredIn}
              label={"Registered In"}
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
            <label>Mileage:</label>
            <input
              type="Number"
              value={kmDriven}
              onChange={(e) => setKmDriven(e.target.value)}
            />
          </div>
          <div className="formFirstDiv padding-10">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="formFirstDiv padding-10">
            <label>Engine Capacity:</label>
            <input
              type="number"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(e.target.value)}
            />
          </div>
          <div className="formFirstDiv padding-10">
            <label>Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value={"Gas"}>Gas</option>
              <option value={"Petrol"}>Petrol</option>
            </select>
          </div>
          <div className="formFirstDiv padding-10">
            <FeatureSelector passValueFn={handleChangeFeature} />
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
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
          </div>

          <div className="formFirstDiv padding-10">
            <label>Transmission:</label>
            <div>
              <input
                type="radio"
                id="manual"
                name="transmission"
                value="Manual"
                onChange={(e) => setTransmission(e.target.value)}
              />
              <label htmlFor="manual">Manual</label>
            </div>
            <div>
              <input
                type="radio"
                id="automatic"
                name="transmission"
                value="Automatic"
                onChange={(e) => setTransmission(e.target.value)}
              />
              <label htmlFor="automatic">Automatic</label>
            </div>
          </div>
          <div className="formFirstDiv padding-10">
            <label>Assembly:</label>
            <div>
              <input
                type="radio"
                id="imported"
                name="assembly"
                value="Imported"
                onChange={(e) => setAssembly(e.target.value)}
              />
              <label htmlFor="imported">Imported</label>
            </div>
            <div>
              <input
                type="radio"
                id="local"
                name="assembly"
                value="Local"
                onChange={(e) => setAssembly(e.target.value)}
              />
              <label htmlFor="local">Local</label>
            </div>
          </div>
          <div className="formFirstDiv padding-10">
            <label>Description</label>
            <textarea
              name=""
              id=""
              cols="60"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="formFirstDiv padding-10">
            <button onClick={handlePostFreeAd} disabled={disabledBtn}>
              Post Free Ad
            </button>
          </div>
          <div className="formFirstDiv padding-10">
            <button onClick={handlePostFeaturedAd} disabled={disabledBtn}>
              Post Featured Ad
            </button>
          </div>
        </form>
        {/* ===============================MODAL================================================== */}

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
                onClick={() => handlePackageSelect("7", "1500")}
                className="color3"
              >
                7-Days Package For PKR 1500
              </button>
              <button
                onClick={() => handlePackageSelect("15", "2250")}
                className="color1"
              >
                15-Days Package For PKR 2250
              </button>
              <button
                onClick={() => handlePackageSelect("30", "3150")}
                className="color2"
              >
                30-Days Package For PKR 3150
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={modalIsOpenSelectFreePackage}
          onRequestClose={closeFreeModal}
          style={customStyles}
          contentLabel="Select Pacakge"
          ariaHideApp={false}
        >
          <div className="modalDiv">
            <h4>
              Your monthly limit has been reached. Want to post another ad?{" "}
            </h4>

            <div className="modalButtonHolder">
              <button
                onClick={() => handlePackageSelect("", "525")}
                className="color1"
              >
                Post Ad For Only 525 RS
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
};

export default UsedCarPostAd;

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
