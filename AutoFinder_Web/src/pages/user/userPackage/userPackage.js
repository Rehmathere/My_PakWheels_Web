import axios from "axios";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
// Images
import True_Img from "../../../assets/images/True_Img.png";
import False_Img from "../../../assets/images/False_Img.png";

const UserPackage = () => {
  // User
  const [user] = useOutletContext();
  // --- API ---
  //Variables
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);

  // FUNCTIONS
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll"
        );
        const response_1 = await axios.post(
          "https://autofinder-backend.vercel.app/api/bikePackageRequest/getAll"
        );

        if (response.data.ok && response_1.data.ok) {
          // Filter car and bike package data where the user._id matches the logged-in user._id
          const filteredCarData = response.data.data.filter(
            (item) => item.user && item.user._id === user._id
          );
          const filteredBikeData = response_1.data.data.filter(
            (item) => item.user && item.user._id === user._id
          );

          setData(filteredCarData);
          setData_1(filteredBikeData);
        }
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
      }
    }
    // Only run fetchData if `user` is defined (i.e., user is logged in)
    if (user) {
      fetchData();
    }
  }, [user]);

  // --- Delete Function - ( Car Package ) ---
  const handleDelete = async (packageId) => {
    try {
      const res = await axios.delete(
        `https://autofinder-backend.vercel.app/api/buyPackageRequest/${packageId}`
      );
      if (res.data.ok) {
        const newData = data.filter((item) => item.package._id !== packageId);
        setData(newData);
        console.log(" Car Dealer Package Request Deleted ", packageId);  // Log success message
      }
    } catch (error) {
      console.log(" Failed To Delete Car Dealer Request ", packageId);  // Log failure message
      console.log(error.response?.data?.error || error.message);  // Log the actual error
    }
  };
  
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `https://autofinder-backend.vercel.app/api/buyPackageRequest/${id}`
  //     );
  //     if (res.data.ok) {
  //       const newData = data.filter((item) => item._id !== id);
  //       setData(newData);
  //       console.log(" Car Dealer Package Request Deleted ", id); // Log success message
  //     }
  //   } catch (error) {
  //     console.log(" Failed To Delete Car Dealer Request ", id); // Log failure message
  //     console.log(error.response?.data?.error || error.message); // Log the actual error
  //   }
  // };

  // COLUMNS For Car ( Data )
  const columns = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Price",
      selector: (row) =>
        row.package && row.package.actualPrice
          ? row.package.actualPrice
          : " - ",
      width: "15%",
    },
    {
      name: "Premium Bundles",
      selector: (row) =>
        row.package && row.package.premiumBundles
          ? row.package.premiumBundles
          : " - ",
      width: "15%",
    },
    {
      name: "Live Ad Days",
      selector: (row) =>
        row.package && row.package.liveAdDays ? row.package.liveAdDays : " - ",
      width: "15%",
    },
    {
      name: "Free Booster Pack",
      selector: (row) =>
        row.package && row.package.freeBoosterPack
          ? row.package.freeBoosterPack
          : " - ",
      width: "15%",
    },
    {
      name: "Status",
      selector: (row) =>
        row.package && row.approved !== undefined ? (
          <>
            <img
              src={row.approved ? True_Img : False_Img}
              alt="Approval Status"
              width="30"
            />
            {/* // Delete Btn Here */}
            {/* <button
              className="dataTableActionBtn red"
              onClick={() => handleDelete(row.package._id)}
              style={{
                backgroundColor: "red",
                padding: "0.5em 2em 0.5em 2em",
                border: "0px solid transparent",
                margin: "0em 0em 0em 2em",
                borderRadius: "20px",
              }}
            >
              <i
                class="fa fa-trash"
                style={{ color: "white", fontSize: "1.4em" }}
              ></i>
            </button> */}
          </>
        ) : (
          " - "
        ),
      width: "25%",
    },
  ];
  // COLUMNS For Bike ( Data )
  const columns_1 = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Price",
      selector: (row) =>
        row.package && row.package.actualPrice
          ? row.package.actualPrice
          : " - ",
      width: "15%",
    },
    {
      name: "Premium Bundles",
      selector: (row) =>
        row.package && row.package.premiumBundles
          ? row.package.premiumBundles
          : " - ",
      width: "15%",
    },
    {
      name: "Live Ad Days",
      selector: (row) =>
        row.package && row.package.liveAdDays ? row.package.liveAdDays : " - ",
      width: "15%",
    },
    {
      name: "Free Booster Pack",
      selector: (row) =>
        row.package && row.package.freeBoosterPack
          ? row.package.freeBoosterPack
          : " - ",
      width: "15%",
    },
    {
      name: "Status",
      selector: (row) =>
        row.package && row.approved !== undefined ? (
          <img
            src={row.approved ? True_Img : False_Img}
            alt="Approval Status"
            width="30"
          />
        ) : (
          // Delete Btn Here
          " - "
        ),
      width: "25%",
    },
  ];
  // --- API ---
  // Main Body
  return (
    <div className="UserPackage">
      <h1>Your Package</h1>
      <h4>Car Dealer Packeges Requests :</h4>
      <DataTable data={data} columns={columns} />
      <br />
      <br />
      <h4>Bike Dealer Packeges Requests :</h4>
      <DataTable data={data_1} columns={columns_1} />
      <br />
      <br />
    </div>
  );
};

export default UserPackage;
