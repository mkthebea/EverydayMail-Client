import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "./tree.png";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    deletedMails: 0,
    userID: "",
  });

  const fetchDashboardData = async () => {
    const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api");
    setDashboardData(response.data);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // const [accountsList, setAccountsList] = useState([]);
  // const fetchAccountsList = async () => {
  //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/accounts");
  //   setAccountsList(response.data.accounts);
  // };
  // useEffect(() => {
  //   fetchAccountsList();
  // }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Dashboard</h1>
      <div>User ID: {dashboardData.userID}</div>
      <div>Deleted Mails Count: {dashboardData.deletedMails}</div>
      <div style={{ width: "95vw", height: "65vh", backgroundColor: "rgb(143, 188, 143, 0.5)", color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", textAlign: "center", height: "10vh" }}>절감한 탄소 배출량: {dashboardData.deletedMails * 4}g</div>
        <img src={Tree} style={{ height: "55vh" }}></img>
      </div>
      {/* <div>Accounts List: {accountsList}</div> */}
    </div>
  );
}

export default Dashboard;
