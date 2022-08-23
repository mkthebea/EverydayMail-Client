import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

import Sprout from "./sprout.png";
import BabyTree from "./baby tree.png";
import Tree1 from "./tree1.png";
import Orangetree from "./orangetree.png";

function Dashboard() {
  const [deletedMails, setDeletedMails] = useState(0);
  const fetchDeletedMails = async () => {
    const response = await axios.get("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/dashboard/");
    // console.log("dashboard response: ", response);
    setDeletedMails(response.data.deletedMails);
  };
  useEffect(() => {
    fetchDeletedMails();
  }, []);

  const co2 = deletedMails * 4;

  return (
    <div className={styles.container}>
      <div className={styles.co2Cut}>
        <div style={{ color: "white", fontSize: "20px" }}>절감한 탄소 배출량</div>
        {/* <div>{co2} g</div> */}
        <div>1500 g</div>
      </div>
      <img className={styles.trees} src={Tree1} />
      {/* {co2 < 500 ? <img className={styles.sprout} src={Sprout} /> : <img className={styles.trees} src={co2 < 2000 ? BabyTree : co2 < 4000 ? Tree1 : Orangetree} />} */}
      <div className={styles.ground}>MY TREE</div>
      <div className={styles.bird_container}>
        <div className={styles.bird}></div>
      </div>
      <div class={styles.bird_container_two}>
        <div className={styles.bird_two}></div>
      </div>
    </div>
  );
}

export default Dashboard;
