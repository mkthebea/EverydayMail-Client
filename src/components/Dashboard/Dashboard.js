import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

import Sprout from "./sprout.png";
import BabyTree from "./baby tree.png";
import Tree1 from "./tree1.png";
import Orangetree from "./orangetree.png";

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

  const dashboardData = { deletedMails: 700, userID: "test1" };
  const co2 = dashboardData.deletedMails * 4;

  return (
    <div className={styles.container}>
      <div className={styles.co2Cut}>
        <div style={{ color: "white" }}>절감한 탄소 배출량</div>
        <div>{co2}g</div>
      </div>
      {/* Sprout < 500 - BabyTree < 2000 - Tree1 < 4000 - Orangetree */}
      {co2 < 500 ? <img className={styles.sprout} src={Sprout} /> : <img className={styles.trees} src={co2 < 2000 ? BabyTree : co2 < 4000 ? Tree1 : Orangetree} />}
      <div className={styles.ground}>MY TREE</div>
    </div>
  );
}

export default Dashboard;
