import React, { useEffect, useState } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { Avatar, List, Popconfirm } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import axios from "axios";

function DetailPage() {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [adSender, setAdSender] = useState([]);
  const fetchAdSender = async () => {
    const response = await axios.get(`https://87e22f10-f2a1-494c-8ae5-71f15eaa1823.mock.pstmn.io/api/ad_senders?account=${query.account}`);
    // console.log("요청 url: ", `https://87e22f10-f2a1-494c-8ae5-71f15eaa1823.mock.pstmn.io/api/ad_senders?account=${query.account}`);
    // console.log("adsender response: ", response);
    setAdSender(response.data.adSender);
  };
  useEffect(() => {
    fetchAdSender();
  }, []);

  // const adSender = [
  //   {
  //     name: "CAU",
  //     email: "cau@cau.ac.kr",
  //     mailCount: 500,
  //     url: "https://mportal.cau.ac.kr/main.do",
  //   },
  //   {
  //     name: "Naver",
  //     email: "naver@naver.com",
  //     mailCount: 450,
  //     url: "https://www.naver.com/",
  //   },
  //   {
  //     name: "Amazon",
  //     email: "amazon@amazon.com",
  //     mailCount: 400,
  //   },
  //   {
  //     name: "Google",
  //     email: "google@google.com",
  //     mailCount: 350,
  //   },
  //   {
  //     name: "sdads",
  //     email: "sdads@google.com",
  //     mailCount: 300,
  //   },
  //   {
  //     name: "Hollys",
  //     email: "hollys@gmail.com",
  //     mailCount: 250,
  //   },
  //   {
  //     name: "Kakao",
  //     email: "Kakao@kakao.com",
  //     mailCount: 200,
  //   },
  //   {
  //     name: "test",
  //     email: "test@test.com",
  //     mailCount: 150,
  //   },
  //   {
  //     name: "example",
  //     email: "example@example.com",
  //     mailCount: 100,
  //   },
  //   {
  //     name: "fennexc",
  //     email: "fennexc@fennexc.com",
  //     mailCount: 50,
  //     url: "https://fennec.co.kr/?NaPm=ct%3Dl6uiv2io%7Cci%3D0Bm0001e2JDwyQtQKf1z%7Ctr%3Dbrnd%7Chk%3D8d1334898aa995feb31d488690e40750cff72668",
  //   },
  // ];

  return (
    <div className={styles.container}>
      <div className={styles.sender_list_container}>
        <div className={styles.list_header}>
          <div className={styles.account_text}>| {query.account}의 스팸 메일 발신자 순위</div>
          <Popconfirm
            title="광고 메일에 구독 해지 링크가 포함되어 있는 경우 추출하여 표시합니다."
            placement="left"
            showCancel={false}
            // onConfirm={confirm}
            // onCancel={cancel}
            okText="확인"
            icon={
              <QuestionCircleFilled
                style={{
                  color: "green",
                }}
              />
            }
            // cancelText="No"
          >
            <div className={styles.unsubscribe_desc}>구독 해지하기 링크란?</div>
          </Popconfirm>
        </div>
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
              {item.url ? (
                <a href={item.url} className={styles.unsubscribe_link}>
                  구독 해지하기
                </a>
              ) : (
                <></>
              )}
              <div style={{ marginRight: "50px", marginLeft: "50px" }}>mail count: {item.mailCount}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default DetailPage;
