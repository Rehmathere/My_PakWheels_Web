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

  //COLUMNS
  const columns = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "25%",
    },
    {
      name: "Price",
      selector: (row) => (row.package.actualPrice && row.package.actualPrice ? row.package.actualPrice : " - "),
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
          " - "
        ),
      width: "15%",
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
      <DataTable data={data_1} columns={columns} />
      <br />
      <br />
    </div>
  );
};

export default UserPackage;
