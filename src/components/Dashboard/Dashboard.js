import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

import Sprout from "./sprout1.png";
import Tree1 from "./t1.png";
import Tree2 from "./t2.png";
import Tree3 from "./tree1.png";

import cookies from "react-cookies";

// axios.defaults.withCredentials = true;

function Dashboard() {
  const [deletedMails, setDeletedMails] = useState(0);
  const fetchDeletedMails = async () => {
    // const response = await axios.get("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/dashboard/");
    // const response = await axios.get("/dashboard/", { headers: { JSESSIONID: cookies.load("JSESSIONID") } });
    const response = await axios.get("/api/dashboard/");

    console.log("dashboard response: ", response);
    setDeletedMails(response.data.deletedMails);
  };
  useEffect(() => {
    fetchDeletedMails();
  }, []);

  const [descBox, setDescBox] = useState(false);
  const [descBoxSprout, setDescBoxSprout] = useState(false);

  // const co2 = deletedMails * 4;
  const co2 = 564;
  const phase = co2 < 500 ? 0 : co2 < 2000 ? 1 : co2 < 4000 ? 2 : 3;
  // const phase = 3;

  return (
    <div className={styles.container}>
      <div className={styles.co2Cut}>
        <div style={{ color: "white", fontSize: "20px", margin: "10px" }}>절감한 탄소 배출량</div>
        <div>{co2} g</div>
        {/* <div>1500 g</div> */}
      </div>
      {/* <img className={styles.trees} src={Tree3} /> */}
      {/* <img className={styles.sprout} src={Sprout} /> */}

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
      {/* {co2 < 500 ? <img className={styles.sprout} src={Sprout} /> : <img className={styles.trees} src={co2 < 2000 ? BabyTree : co2 < 4000 ? Tree1 : Orangetree} />} */}
      <div className={styles.ground}>My tree</div>
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
