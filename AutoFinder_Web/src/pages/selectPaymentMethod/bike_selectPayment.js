import { useLocation, useNavigate } from "react-router-dom";
import "./selectPaymentMethod.scss";
import Modal from "react-modal";
import { useState } from "react";


const Bike_selectPayment = () => {
  const location = useLocation();
  const adData = location.state.adData;
  const navigate = useNavigate();
  console.log(adData)
  const handleSelectPaymentMethod = (paymentMethod) => {
   
    switch (paymentMethod) {
      case "Online-Payment":
        navigate("/Bike_VerifyPayment", {
          state: { ...adData, paymentMethod: paymentMethod },
        });
        break;
      case "EasyPaisa":
        navigate("/Bike_VerifyPayment", {
          state: { ...adData, paymentMethod: paymentMethod },
        });
        break;
    }
  };

  // MODAL FUNCTIONS
  const [modalIsOpenEasyPaisa, setIsOpenEasyPaisa] = useState(false);
  const [modalIsOpenOnlinePayment, setIsOpenOnlinePayment] = useState(false);
  function openModalEasyPaisa() {
    setIsOpenEasyPaisa(true);
  }
  function closeModalEasyPaisa() {
    setIsOpenEasyPaisa(false);
  }

  function openModalOnlinePayment() {
    setIsOpenOnlinePayment(true);
  }
  function closeModalOnlinePayment() {
    setIsOpenOnlinePayment(false);
  }

  return (
    <div className="SelectPaymentMethod">
      <h1>Select Payment Method</h1>
      <div className="importantNoticeHolder">
        <p> <span>⚠️</span> <strong>NOTE : </strong> Select Payment Carefully Otherwise It Cannot Be Refund !</p>
      </div>
      <div>
        <button onClick={() => openModalOnlinePayment()}>Online-Payment</button>
        <button onClick={() => openModalEasyPaisa()}>EasyPaisa</button>

      </div>
      <div>
        <p>
          Price to Pay: <span className="price">{adData.priceToPay?adData.priceToPay:""}</span>/-pkr
        </p>
      </div>
      {/* =======================MODALS FOR DETAILS =========================== */}
      <Modal
        isOpen={modalIsOpenEasyPaisa}
        onRequestClose={closeModalEasyPaisa}
        style={customStyles}
        contentLabel="Easy Paisa Detail"
        ariaHideApp={false}
      >
        <div className="paymentDetailModal">
          <h1>Details EASYPAISA Payment</h1>
          <div className="detailsHolder">
            <p>YOUR DETAILS WILL COME HERE</p>
          </div>
          <div className="btnHolder">
          <button className={"proceedBtn"}onClick={() => handleSelectPaymentMethod("Online-Payment")}>
            Proceed
          </button>
          <button className="closeBtn" onClick={() => closeModalEasyPaisa()}>Close</button>
          </div>
        </div>
      </Modal>
      {/* ================================== */}
      <Modal
        isOpen={modalIsOpenOnlinePayment}
        onRequestClose={closeModalOnlinePayment}
        style={customStyles}
        contentLabel="Online-Payment Detail"
        ariaHideApp={false}
      >
        <div className="paymentDetailModal">
          <h1>Details Online-Payment</h1>
          <div className="detailsHolder">
            <p>YOUR DETAILS WILL COME HERE</p>
          </div>
          <div className="btnHolder">
          <button className={"proceedBtn"}onClick={() => handleSelectPaymentMethod("Online-Payment")}>
            Proceed
          </button>
          <button className="closeBtn" onClick={() => closeModalOnlinePayment()}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bike_selectPayment;

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
