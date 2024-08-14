import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";
import Modal from "react-modal";
import axios from "axios";
import { UserContext } from "../../context/userContext";
const Navbar = () => {
  const { user, dispatch } = useContext(UserContext);
  //login variables
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

  // CUSTOM FUNCTINOS ////////////////
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
        localStorage.setItem("token", response.data.token);
        setLoginError("");
        setDisableBtn(false);
        emptyLoginFields();
        dispatch({ type: "LOGIN", payload: response.data.data });
        closeModalLogin();
      }
    } catch (error) {
      // console.log(error.response.data.error)
      setLoginError(error.response.data.error);
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
    const phonePattern = /^03\d{9}$/; // Phone number should start with 03 and be followed by 9 digits

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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupValidation()) {
      return;
    }
    // console.log("here")
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

  //MODAL FUNCTIONS //////////////

  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignup, setIsOpenSignup] = useState(false);
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
    emptySignupFields();
    setIsOpenSignup(false);
  }

  // MODAL FUNCTION END ///////////////

  return (
    <div className="Navbar-Comp">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/packages/dealer">Packages</NavLink>
          {/* New Cars */}
          <NavLink>
            New Cars
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/My_NewCars">Comparison</NavLink>
              </div>
            </div>
          </NavLink>
          {/* New Cars */}
          <NavLink>
            More
            <div className="dropdown">
              <div className="dropdown-content">
                <NavLink to="/blogs">Blogs</NavLink>
                <NavLink to="/videos">Videos</NavLink>
              </div>
            </div>
          </NavLink>
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
      <Modal
        isOpen={modalIsOpenLogin}
        onRequestClose={closeModalLogin}
        style={customStyles}
        contentLabel="Login Modal"
        ariaHideApp={false}
        className="signUpModalll"
        overlayClassName="overlayyy"
      >
        <form className="modalForm">
          <h2>Login</h2>
          <div className="modalFormDiv">
            <label htmlFor="email">Email Address:</label>
            <input
              type="number"
              placeholder="03XX1234567"
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
            Don't have an account?{" "}
            <NavLink onClick={() => openModalSignup()}>Sign Up</NavLink>
          </p>
        </form>
      </Modal>
      <Modal
        isOpen={modalIsOpenSignup}
        onRequestClose={closeModalSignup}
        style={customStyles}
        contentLabel="Signup Modal"
        ariaHideApp={false}
        className="signUpModalll"
        overlayClassName="overlayyy"
      >
        <form className="modalForm">
          <h2>Signup</h2>
          <div className="modalFormDiv">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="e.g: John Doe"
              onChange={handleChangeSignupForm}
              value={signupForm.name}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="username@email.com"
              onChange={handleChangeSignupForm}
              value={signupForm.email}
            />
          </div>
          <div className="modalFormDiv">
            <label htmlFor="email">Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="12345"
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
            <label htmlFor="password">address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              onChange={handleChangeSignupForm}
              value={signupForm.address}
            />
          </div>
          {signupError && <p className="error">{signupError}</p>}
          {!disableBtn && <button onClick={handleSignup}>Submit</button>}
          {disableBtn && <button disabled>Submit</button>}

          <p>
            Already have an account?{" "}
            <NavLink onClick={() => openModalLogin()}>Login</NavLink>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default Navbar;

const customStyles = {
  // content: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  //   marginRight: "-50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "#f4f4f4",
  //   width:"30%",
  //   "@media (maxWidth: 768px)": {
  //     width: "100%", // Change width to 100% on devices with maximum width of 768px
  //   },
  // },
  // overlay: {
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
};
