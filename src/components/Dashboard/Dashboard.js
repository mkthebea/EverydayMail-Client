import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "./tree.png";
import Forest from "./forest.png";
import Background from "./background.png";

function Dashboard() {
  // 대시보드 데이터 가져오기
  // const [dashboardData, setDashboardData] = useState({
  //   deletedMails: 0,
  //   userID: "",
  // });
  // const fetchDashboardData = async () => {
  //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api");
  //   console.log(response);
  //   setDashboardData(response.data);
  // };
  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);

  const dashboardData = { deletedMails: 55, userID: "test1" };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundImage: `url(${Background})`, backgroundSize: "100vw 100vh" }}>
      {/* <h1>Dashboard</h1>
      <div>User ID: {dashboardData.userID}</div>
      <div>Deleted Mails Count: {dashboardData.deletedMails}</div> */}
      {/* <div style={{ height: "100vh", color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          height: "10vh",
          backgroundColor: "rgb(144, 238, 144, 0.6)",
          borderRadius: "50px",
          color: "green",
          fontSize: "20px",
          fontWeight: "bolder",
          padding: "50px",
          margin: "50px",
        }}
      >
        절감한 탄소 배출량: {dashboardData.deletedMails * 4}g
      </div>
      <img src={Tree} style={{ height: "70vh", position: "absolute", bottom: "0px", backgroundColor: "rgb(255,255,255,0.5)", borderRadius: "50px" }}></img>
      {/* </div> */}
      {/* <div>Accounts List: {accountsList}</div> */}
    </div>
  );
}

export default Dashboard;
