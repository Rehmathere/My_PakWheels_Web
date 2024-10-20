import { useOutletContext } from "react-router-dom";

const UserProfile = () => {
  const [user] = useOutletContext();

  return (
    <div className="UserProfile">
      <h1 style={{ textAlign: "center" }}>User Profile</h1>
      <div className="Profile_Head">
        <div className="Profile_data">
          <p>
            <i
              class="fa fa-user"
              style={{
                fontSize: "20px",
                marginRight: "15px",
                color: "#bc0000",
                padding: "0em 0em 0em 1.5em"
              }}
              ></i>{" "}
            <b>User ID : </b> &nbsp;&nbsp; {user ? user._id.substring(0, 8) : ""}{" "}
          </p>
          <p>
            <i
              class="fa fa-address-card-o"
              style={{
                fontSize: "20px",
                marginRight: "15px",
                color: "#bc0000",
                padding: "0em 0em 0em 1.5em"
              }}
              ></i>{" "}
            <b>Name : </b> &nbsp;&nbsp; {user ? user.name : ""}{" "}
          </p>
        </div>
        <div className="Profile_data">
          <p>
            <i
              class="fa fa-envelope"
              style={{
                fontSize: "20px",
                marginRight: "15px",
                color: "#bc0000",
                padding: "0em 0em 0em 1.5em"
              }}
              ></i>{" "}
            <b>Email : </b> &nbsp;&nbsp; {user ? user.email : ""}{" "}
          </p>
          <p>
            <i
              class="fa fa-phone"
              style={{
                fontSize: "20px",
                marginRight: "15px",
                color: "#bc0000",
                padding: "0em 0em 0em 1.5em"
              }}
            ></i>{" "}
            <b>Phone-Number : </b> &nbsp;&nbsp; {user ? user.phoneNumber : ""}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
