import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <>
      <h1>Dashboard</h1>
      <div>User ID: {dashboardData.userID}</div>
      <div>Deleted Mails Count: {dashboardData.deletedMails}</div>
      {/* <div>Accounts List: {accountsList}</div> */}
    </>
  );
}

export default Dashboard;
