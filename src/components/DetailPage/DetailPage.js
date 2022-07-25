import React, { useEffect, useState } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { Avatar, List } from "antd";

function DetailPage() {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const adSender = [
    {
      name: "CAU",
      email: "cau@cau.ac.kr",
      mailCount: 500,
    },
    {
      name: "Naver",
      email: "naver@naver.com",
      mailCount: 500,
    },
    {
      name: "Amazon",
      email: "amazon@amazon.com",
      mailCount: 500,
    },
    {
      name: "Google",
      email: "google@google.com",
      mailCount: 500,
    },
    {
      name: "sdads",
      email: "sdads@google.com",
      mailCount: 500,
    },
    {
      name: "Hollys",
      email: "hollys@gmail.com",
      mailCount: 500,
    },
    {
      name: "Kakao",
      email: "Kakao@kakao.com",
      mailCount: 500,
    },
    {
      name: "Kakao",
      email: "Kakao@kakao.com",
      mailCount: 500,
    },
    {
      name: "Kakao",
      email: "Kakao@kakao.com",
      mailCount: 500,
    },
    {
      name: "Kakao",
      email: "Kakao@kakao.com",
      mailCount: 500,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sender_list_container}>
        <div className={styles.account_name}>| {query.account}의 스팸 메일 발신자 순위</div>
        <List
          className={styles.sender_list}
          itemLayout="horizontal"
          dataSource={adSender}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{ color: "red", border: "1px solid red", backgroundColor: "white", marginLeft: "50px" }}>{index + 1}</Avatar>}
                title={item.name}
                description={item.email}
              />
              <div style={{ marginRight: "50px" }}>mail count: {item.mailCount}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default DetailPage;
