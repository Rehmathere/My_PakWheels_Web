import { useContext, useEffect, useState } from "react";
import CityPicker from "../../components/cityPicker/cityPicker";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./serviceRequest.scss";
import { UserContext } from "../../context/userContext";
import useRehydrateUser from "../../hooks/user/rehydrateUser";

const ServiceRequest = () => {
  const { rehydrateUser } = useRehydrateUser();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const webLocation = useLocation();

  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // CAR MODEL PICKER FUNCTIONS

  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [varient, setVarient] = useState("");

  const handleChangeLocation = (value) => {
    setLocation(value);
  };

  const setData = () => {
    const data = {
      location,
      brand,
      model,
      varient,
      year,
      service,
      user: user?._id,
    };
    return data;
  };

  const validation = () => {
    return location && brand && model && year && service;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) openModal();
    else alert("Please Fill All the Fields");
  };

  const handleSelectPackage = (packageType) => {
    let adData = setData();
    let priceToPay = 0;
    if (adData.service === "001") {
      if (packageType === "Silver") {
        priceToPay = "1800";
      }
      if (packageType === "Diamond") {
        priceToPay = "4000";
      }
      if (packageType === "Platinum") {
        priceToPay = "5500";
      }
    }
    if (adData.service === "002") {
      if (packageType === "Silver") {
        priceToPay = "3200";
      }
      if (packageType === "Diamond") {
        priceToPay = "4250";
      }
      if (packageType === "Platinum") {
        priceToPay = "6500";
      }
    }
    if (adData.service === "003") {
      priceToPay = "5000";
    }

    navigate("/select-payment-method", {
      state: { adData: { ...adData, priceToPay, packageType } },
    });
  };

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

  useEffect(() => {
    const service = webLocation.state?.service;
    setService(service);
    if (!service) {
      navigate("/");
    }
  }, []);

  // MODAL FUNCTIONs
  const [modalIsOpenSelectPackage, setIsSelectPackage] = useState(false);
  function openModal() {
    setIsSelectPackage(true);
  }
  function closeModal() {
    setIsSelectPackage(false);
  }

  if (loading) return <div>LOADING...</div>;

  if (!loading)
    return (
      <div className="UsedCarPostAd">
        {service === "001" && (
          <h1 className="postAdHeading">List It For You Service</h1>
        )}
        {service === "002" && (
          <h1 className="postAdHeading">Car Inspection Service</h1>
        )}
        {service === "003" && (
          <h1 className="postAdHeading">Buy Car For Me Service</h1>
        )}

        <form action="">
          {/* --- User ID --- */}
          <p id="My_Para">User ID : {user ? user._id : ""} </p>
          <p id="My_Para">User Name : {user ? user.name : ""} </p>
          {/* --- User ID --- */}
          <div className="formFirstDiv">
            <CityPicker passValueFn={handleChangeLocation} label={"Location"} />
          </div>
          {/* Year Input */}
          <div className="formFirstDiv">
            <label>Year :</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder=" Enter Year "
              className="My_Input"
              />
          </div>
          {/* Brand Input */}
          <div className="formFirstDiv">
            <label>Brand :</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder=" Enter Brand "
              className="My_Input"
              />
          </div>
          {/* Model Input */}
          <div className="formFirstDiv">
            <label>Model :</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder=" Enter Model "
              className="My_Input"
              />
          </div>
          {/* Variant Input */}
          <div className="formFirstDiv">
            <label>Varient :</label>
            <input
              type="text"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
              placeholder=" Enter Varient "
              className="My_Input"
            />
          </div>
          <div className="formFirstDiv padding-10">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
        {/* ======================================================== */}
        <Modal
          isOpen={modalIsOpenSelectPackage}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Select Package"
          ariaHideApp={false}
        >
          <div className="modalDiv">
            <h1>Please Select A Desired Package</h1>
            <div>
              {service !== "003" ? (
                <>
                  <p>
                    ✔️ Silver Package: For vehicles up to 1000cc - Price{" "}
                    <strong>
                      {service === "002" && "$3200"}
                      {service === "001" && "$1800"}
                    </strong>{" "}
                  </p>
                  <p>
                    ✔️ Diamond Package: For vehicles up to 2000cc - Price{" "}
                    <strong>
                      {service === "002" && "$4250"}
                      {service === "001" && "$4000"}
                    </strong>{" "}
                  </p>
                  <p>
                    ✔️ Platinum Package: For vehicles over 2000cc, SUVs, Jeeps,
                    and German cars - Price{" "}
                    <strong>
                      {service === "002" && "$5200"}
                      {service === "001" && "$5500"}
                    </strong>{" "}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    ✔️ This initial payment that you have to make
                    <strong>$5000</strong>{" "}
                  </p>
                </>
              )}
            </div>
            <div className="modalButtonHolder">
              {service !== "003" ? (
                <>
                  <button
                    className="silver"
                    onClick={() => handleSelectPackage("Silver")}
                  >
                    Silver Package
                  </button>
                  <button
                    className="deepSkyBlue"
                    onClick={() => handleSelectPackage("Diamond")}
                  >
                    Diamond Package
                  </button>
                  <button
                    className="silver"
                    onClick={() => handleSelectPackage("Platinum")}
                  >
                    Platinum Package
                  </button>
                </>
              ) : (
                <button
                  className="silver"
                  onClick={() => handleSelectPackage("Standard")}
                >
                  Standard Payment
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
};

export default ServiceRequest;

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
    zIndex: 15,
  },
};
