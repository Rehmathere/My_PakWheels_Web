import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";
import Modal from "react-modal";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(UserContext);

  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [otpError, setOtpError] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignup, setIsOpenSignup] = useState(false);
  const [modalIsOpenOtp, setIsOpenOtp] = useState(false);

  const handleOpenLoginModal = () => {
    openModalLogin();
  };

  const loginValidation = () => {
    if (loginPhoneNumber === "" || loginPassword === "") return false;
    else return true;
  };

  const emptyLoginFields = () => {
    setLoginPhoneNumber("");
    setLoginPassword("");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!loginValidation()) {
  //     setLoginError("Please enter your email and password.");
  //     return;
  //   }
  //   setDisableBtn(true);
  //   try {
  //     const response = await axios.post(
  //       "https://autofinder-backend.vercel.app/api/user/login",
  //       { phoneNumber: loginPhoneNumber, password: loginPassword }
  //     );
  //     if (response.data.ok) {
  //       localStorage.setItem("token", response.data.token);
  //       setLoginError("");
  //       setDisableBtn(false);
  //       emptyLoginFields();
  //       dispatch({ type: "LOGIN", payload: response.data.data });
  //       closeModalLogin();
  //     }
  //   } catch (error) {
  //     setLoginError(error.response.data.error);
  //     setDisableBtn(false);
  //     emptyLoginFields();
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginValidation()) {
      setLoginError("Please enter your email and password.");
      return;
    }
    setDisableBtn(true);
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/login",
        { phoneNumber: loginPhoneNumber, password: loginPassword }
      );
  
      if (response.data.ok) {
        const userData = response.data.data;
        
        // Check if the user type is 'USER'
        if (userData.userType !== "USER") {
          alert("Only 'USER' type accounts are allowed to log in.");
          setDisableBtn(false);
          emptyLoginFields();
          return;
        }
  
        localStorage.setItem("token", response.data.token);
        setLoginError("");
        setDisableBtn(false);
        emptyLoginFields();
        dispatch({ type: "LOGIN", payload: userData });
        closeModalLogin();
      }
    } catch (error) {
      setLoginError(error.response?.data?.error || "An error occurred during login.");
      setDisableBtn(false);
      emptyLoginFields();
    }
  };  

  const handleChangeSignupForm = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const signupValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^03\d{9}$/;

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.phoneNumber ||
      !signupForm.password ||
      !signupForm.address
    ) {
      setSignupError("Please Fill All The Fields");
      return false;
    }

    if (signupForm.name.length < 3) {
      setSignupError("Name should be minimum of 3 characters long");
      return false;
    }

    if (!emailPattern.test(signupForm.email)) {
      setSignupError("Please enter a valid email address");
      return false;
    }

    if (signupForm.address.length < 3) {
      setSignupError("Address should be minimum of 3 characters long");
      return false;
    }

    if (!phonePattern.test(signupForm.phoneNumber)) {
      setSignupError("Phone number should be in the format 03xxxxxxxxx");
      return false;
    }

    if (
      signupForm.password.length < 8 ||
      !/\d/.test(signupForm.password) ||
      !/[a-zA-Z]/.test(signupForm.password)
    ) {
      setSignupError(
        "Password should be minimum of 8 characters and should include text and at least one number"
      );
      return false;
    }

    return true;
  };

  const emptySignupFields = () => {
    setSignupForm({
      name: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
    });
  };

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    if (!signupValidation()) {
      return;
    }
    try {
      setDisableBtn(true);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/generateotp",
        // { phone: "+923315261836" }
        { phone: "+923335448744" }
      );
      if (response.data.ok) {
        setDisableBtn(false);
        setSignupError("");
        // Do not close the signup modal here
        openModalOtp(); // Open OTP modal
      }
    } catch (error) {
      console.log(error);
      setDisableBtn(false);
      setSignupError(error.response.data.error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/verifyotp",
        { codeOTP: otpCode }
      );
      if (response.data.ok) {
        setOtpError("OTP Code Is Correct");
        setTimeout(() => {
          closeModalOtp(); // Close OTP modal
          handleSignup();
        }, 1000);
        // openModalSignup(); // Open Signup modal again
      } else {
        setOtpError("OTP Code Is Wrong");
      }
    } catch (error) {
      setOtpError("OTP Code Is Wrong");
    }
  };  

  const handleSignup = async () => {
    // No need to call e.preventDefault() if there's no event object
    if (!signupValidation()) {
      return;
    }
    try {
      setDisableBtn(true);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/signup",
        signupForm
      );
      if (response.data.ok) {
        setDisableBtn(false);
        setSignupError("");
        emptySignupFields();
        closeModalOtp(); // Close OTP modal on successful signup
        openModalLogin();
      }
    } catch (error) {
      console.log(error);
      setDisableBtn(false);
      setSignupError(error.response.data.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  function openModalLogin() {
    closeModalSignup();
    setIsOpenLogin(true);
  }

  function openModalSignup() {
    closeModalLogin();
    setIsOpenSignup(true);
  }

  function closeModalLogin() {
    setLoginError("");
    emptyLoginFields();
    setIsOpenLogin(false);
  }

  function closeModalSignup() {
    setSignupError("");
    // Do not reset signupForm here
    setIsOpenSignup(false);  }

  function openModalOtp() {
    setIsOpenOtp(true);
  }

  function closeModalOtp() {
    setOtpError("");
    setOtpCode("");
    setIsOpenOtp(false);
  }
  // Button Logic
  const [isButton2Visible, setIsButton2Visible] = useState(false);
  // Main Body
  return (
    <div className="Navbar-Comp">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          {/* Used Cars */}
          <NavLink to="/used-car/buy">Used Cars</NavLink>
          {/* New Cars */}
          <NavLink>
            New Cars
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/My_FindNewCars">Find New Cars</NavLink>
                <NavLink to="/My_NewCars">Comparison</NavLink>
              </div>
            </div>
          </NavLink>
          {/* Bikes */}
          <NavLink>
            Bikes
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/bikes">Bikes</NavLink>
              </div>
            </div>
          </NavLink>
          {/* Auto Parts */}
          <NavLink>
            Auto Parts
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/Auto_Part">Auto Parts</NavLink>
              </div>
            </div>
          </NavLink>
          {/* Auto Parts */}
          <NavLink to="/packages/dealer">Packages</NavLink>
          <NavLink>
            More
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/blogs">Blogs</NavLink>
                <NavLink to="/videos">Videos</NavLink>
              </div>
            </div>
          </NavLink>
          <NavLink
            className="standout-color speacial-btn "
            to="/service/free-ad"
          >
            Post Ad
          </NavLink>
          {!user && (
            <NavLink className="speacial-btn" onClick={handleOpenLoginModal}>
              Login
            </NavLink>
          )}
          {user && (
            <>
              <NavLink className="speacial-btn" onClick={handleLogout}>
                Logout
              </NavLink>
              <NavLink className="speacial-btn" to="/user/profile">
                Profile
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* --- Login --- */}
      <Modal
        isOpen={modalIsOpenLogin}
        onRequestClose={closeModalLogin}
        contentLabel="Login Modal"
        ariaHideApp={false}
        className="signUpModalll"
        overlayClassName="overlayyy"
      >
        <form className="modalForm">
          <div id="My_Img_Parent">
            <img src={logo} alt="" />
          </div>
          <h2>Login</h2>
          <div className="modalFormDiv">
            <label htmlFor="email">Email Address:</label>
            <input
              type="number"
              placeholder=" Enter Email Or Number "
              onChange={(e) => setLoginPhoneNumber(e.target.value)}
              value={loginPhoneNumber}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
          {!disableBtn && <button onClick={handleLogin}>Login</button>}
          {disableBtn && (
            <button onClick={handleLogin} disabled>
              Login
            </button>
          )}
          <p>
            Don't have an account? &nbsp;&nbsp;
            <NavLink onClick={() => openModalSignup()}>Sign Up</NavLink>
          </p>
        </form>
      </Modal>

      {/* --- Signup --- */}
      <Modal
        isOpen={modalIsOpenSignup}
        onRequestClose={closeModalSignup}
        contentLabel="Signup Modal"
        ariaHideApp={false}
        className="signUpModalll"
        overlayClassName="overlayyy"
      >
        <form className="modalForm">
          <div id="My_Img_Parent">
            <img src={logo} alt="" />
          </div>
          <h2>Sign Up</h2>
          <div className="modalFormDiv">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder=" Enter Your Name "
              onChange={handleChangeSignupForm}
              value={signupForm.name}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder=" Enter Your Email "
              onChange={handleChangeSignupForm}
              value={signupForm.email}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder=" Enter Your Phone Number "
              onChange={handleChangeSignupForm}
              value={signupForm.phoneNumber}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChangeSignupForm}
              value={signupForm.password}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Address"
              onChange={handleChangeSignupForm}
              value={signupForm.address}
            />
          </div>
          {signupError && <p className="error">{signupError}</p>}
          {/* {!disableBtn && <button onClick={handleGenerateOtp}>Submit</button>} */}
          {!disableBtn && <button onClick={handleSignup}>Sign Up</button>}
          {disableBtn && (
            // <button onClick={handleGenerateOtp} disabled>
            //   Sign Up
            // </button>
            <button onClick={handleSignup} disabled>
              Sign Up
            </button>
          )}
          <p>
            Already have an account? &nbsp;&nbsp;
            <NavLink onClick={() => openModalLogin()}>Login</NavLink>
          </p>
        </form>
      </Modal>
      {/* --- OTP --- */}
      <Modal
        isOpen={modalIsOpenOtp}
        onRequestClose={closeModalOtp}
        contentLabel="OTP Modal"
        ariaHideApp={false}
        className="signUpModalll"
        overlayClassName="overlayyy"
      >
        <form className="modalForm">
          <br />
          <div id="My_Img_Parent">
            <img src={logo} alt="" />
          </div>
          <h2>Verify OTP</h2>
          <div className="modalFormDiv">
            <label htmlFor="otp">OTP Code:</label>
            <input
              type="number"
              name="otp"
              placeholder=" Enter OTP Code "
              onChange={(e) => setOtpCode(e.target.value)}
              value={otpCode}
            />
          </div>
          {otpError && <p className="error">{otpError}</p>}
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          <br />
          <br />
        </form>
      </Modal>
    </div>
  );
};

export default Navbar;
