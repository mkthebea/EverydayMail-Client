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
    const response = await axios.get(`/account/${query.account}/`);
    // console.log("요청 url: ", `https://87e22f10-f2a1-494c-8ae5-71f15eaa1823.mock.pstmn.io/api/ad_senders?account=${query.account}`);
    // console.log("adsender response: ", response);
    setAdSender(response.data.adSender);
  };
  useEffect(() => {
    fetchAdSender();
  }, []);

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
                title={item.senderName}
                description={item.senderAddr}
              />
              {item.unsubscribeLink ? (
                <a href={item.unsubscribeLink} className={styles.unsubscribe_link}>
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
