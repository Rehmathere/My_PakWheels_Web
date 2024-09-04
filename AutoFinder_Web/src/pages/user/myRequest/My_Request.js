import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";

function My_Request() {
  // UserContext
  const { user } = useContext(UserContext);
  // --- API ( Inspection Report ) ---
  const [data, setData] = useState([]);
  // Fetch data from API
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/carInspectionReport"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  // Function to handle the "Download Report" button click
  const handleShowReport = async (id) => {
    try {
      console.log("Clicked ID:", id); // Log the clicked ID
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/api/carInspectionReport/${id}`,
        {
          responseType: "blob", // Specify that we expect a binary response
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element, set its href to a URL created from the Blob, and simulate a click to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${id}.pdf`); // Set the download file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };
  // Columns Data
  const coulmns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Reports ID",
      selector: (row) => row._id,
    },
    {
      name: "Download Report",
      cell: (row) => (
        <button
          // className="dataTableActionBtn red"
          id="My_Report_Btn"
          onClick={() => handleShowReport(row._id)} // Pass the item's _id here
        >
          Download Report
        </button>
      ),
      width: "20%",
    },
  ];
  // --- Service Data ---
  const [selectedService, setSelectedService] = useState("002"); // Default service
  const [noDataMessage, setNoDataMessage] = useState("");

  // Functions
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/",
          {
            service: selectedService,
            approved: true,
          }
        );
        const fetchedData = response.data.data;
        if (fetchedData.length === 0) {
          setNoDataMessage("No Data In This Service");
          setData([]);
        } else {
          setNoDataMessage("");
          setData(fetchedData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [selectedService]);

  // Column
  const coulmns_1 = [
    {
      name: "Client Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Phone No.",
      selector: (row) =>
        row.user && row.user.phoneNumber ? row.user.phoneNumber : " - ",
      width: "15%",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.year && row.brand && row.model && row.varient
          ? `${row.year} ${row.brand} ${row.model} ${row.varient}`
          : " - ",
      width: "25%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "15%",
    },
    {
      name: "Service",
      selector: (row) => (row.service ? row.service : " - "),
      width: "15%",
    },
    {
      name: "Inspector Allocate",
      selector: (row) =>
        row.userAllocate
          ? row.userAllocate.name
            ? row.userAllocate.name
            : " - "
          : "Not Appointed",
      width: "15%",
    },
  ];
  // Main Body
  return (
    <div id="My_Request_Parent">
      <h2>My Car Inspection Request Status</h2>
      {/* Box */}
      {/* --- Show Service Select Portion --- */}
      {/* --- Show Service Select Portion --- */}
      <div style={{ padding: "1em 0em" }}>
        <span style={{ padding: "1em 0em 0em 0em" }}>Choose Service</span>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          style={{ width: "10%" }}
        >
          <option value="001">001</option>
          <option value="002">002</option>
          <option value="003">003</option>
          <option value="004">004</option>
        </select>
        <br />
        <br />
        <br />
        {noDataMessage ? (
          <p>{noDataMessage}</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            {/* Service Data */}
            <DataTable data={data} columns={coulmns_1} />
            {/* Inspection Report */}
            <DataTable data={data} columns={coulmns} />
          </div>
        )}
      </div>
      <br />
      <br />
    </div>
  );
}

export default My_Request;
