import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import Sprout from "./sprout1.png";
import Tree1 from "./t1.png";
import Tree2 from "./t2.png";
import Tree3 from "./tree1.png";

function Dashboard() {
  const [deletedMails, setDeletedMails] = useState(0);
  const fetchDeletedMails = async () => {
    const response = await axios.get("/api/dashboard/");
    if (response.data.success) setDeletedMails(response.data.deletedMails);
    // console.log("dashboard response: ", response);
  };
  useEffect(() => {
    fetchDeletedMails();
  }, []);

  const [descBox, setDescBox] = useState(false);
  const [descBoxSprout, setDescBoxSprout] = useState(false);

  const co2 = deletedMails * 4;
  const phase = co2 < 500 ? 0 : co2 < 2000 ? 1 : co2 < 4000 ? 2 : 3;

  return (
    <div className={styles.container}>
      <div className={styles.co2Cut}>
        <div style={{ color: "white", fontSize: "20px", margin: "10px" }}>절감한 탄소 배출량</div>
        <div>{co2} g</div>
      </div>

      {phase === 0 ? (
        <img
          className={styles.sprout}
          src={Sprout}
          onMouseEnter={() => {
            setDescBoxSprout(true);
          }}
          onMouseLeave={() => {
            setDescBoxSprout(false);
          }}
        />
      ) : (
        <img
          className={styles.trees}
          src={phase === 1 ? Tree1 : phase === 2 ? Tree2 : Tree3}
          onMouseEnter={() => {
            setDescBox(true);
          }}
          onMouseLeave={() => {
            setDescBox(false);
          }}
        />
      )}
      {descBoxSprout ? (
        <div className={styles.desc_box_sprout}>
          <div style={{ color: "white", fontSize: "20px", margin: "10px" }}>현재 단계</div>
          <div>새싹</div>
        </div>
      ) : (
        <></>
      )}
      {descBox ? (
        <div className={styles.desc_box}>
          <div style={{ color: "white", fontSize: "20px", margin: "10px" }}>현재 단계</div>
          <div>나무 {phase}단계</div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.ground}>My tree</div>
      <div className={styles.bird_container}>
        <div className={styles.bird}></div>
      </div>
      <div className={styles.bird_container_two}>
        <div className={styles.bird_two}></div>
      </div>
    </div>
  );
}

export default Dashboard;
