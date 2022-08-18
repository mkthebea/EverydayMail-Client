import React, { useState, useEffect } from "react";
import { Input, Tabs, Switch, Button, message, List, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./SettingPage.module.css";
import moment from "moment";
import axios from "axios";

function SettingPage() {
  const { Option } = Select;

  // 세팅 데이터 GET
  const [settingData, setSettingData] = useState({
    setting: {
      spam: {
        status: true,
        value: "",
      },
      time: {
        status: true,
        value: [],
      },
      word: {
        status: true,
        value: "",
      },
    },
    accountsList: [],
    userInfo: {
      id: "",
      password: "",
    },
  });
  const fetchSettingData = async () => {
    const response = await axios.get("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/setting/");
    // console.log("setting response: ", response);
    setSettingData(response.data.settingData);
    // console.log(settingData);
  };
  useEffect(() => {
    fetchSettingData();
  }, []);
  // setting 페이지 데이터 전체
  // const settingData = {
  //   setting: {
  // spam: {
  //   status: true,
  //   value: "로또",
  // },
  // time: {
  //   status: true,
  //   value: ["3", "month"],
  // },
  // word: {
  //   status: false,
  //   value: "",
  // },
  //   },
  //   accountsList: ["abcd@naver.com", "1234@daum.net", "qwer@google.com", "1@naver.com", "2@naver.com"],
  //   userInfo: {
  //     id: "test123",
  //     password: "pwpw",
  //   },
  // };

  const { TabPane } = Tabs;

  // Tab 1
  const selectAfter = (
    <Select
      value={settingData.setting.time.value[1]}
      style={{
        width: 100,
      }}
      onChange={(event) => changeValue("time_select", event)}
    >
      <Option value="day">일</Option>
      <Option value="week">주</Option>
      <Option value="month">달</Option>
      <Option value="year">년</Option>
    </Select>
  );

  const changeValue = (key, value) => {
    if (key === "time") {
      setSettingData((current) => {
        let newValue = { ...current };
        newValue.setting["time"].value[0] = value;
        return newValue;
      });
    } else if (key === "time_select") {
      setSettingData((current) => {
        let newValue = { ...current };
        newValue.setting["time"].value[1] = value;
        return newValue;
      });
    } else {
      setSettingData((current) => {
        let newValue = { ...current };
        newValue.setting[key].value = value;
        return newValue;
      });
    }
  };

  const onChangeSwitch = (key, checked) => {
    // console.log(key, checked);
    setSettingData((current) => {
      let newValue = { ...current };
      newValue.setting[key].status = checked;
      return newValue;
    });
    if (!checked) changeValue(key, "");
  };

  const saveSetting = async () => {
    if (
      (settingData.setting.spam.status && settingData.setting.spam.value === "") ||
      (settingData.setting.time.status && (settingData.setting.time.value[0] === "" || settingData.setting.time.value[1] === "")) ||
      (settingData.setting.word.status && settingData.setting.word.value === "")
    ) {
      message.error("비어있는 값을 입력하세요");
    } else {
      // 설정 변경 요청 PUT
      const response = await axios.put("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/setting/setting/", settingData.setting);
      // console.log("setting send data: ", settingData.setting);
      // console.log("response: ", response);
      if (response.data.success) {
        message.success("저장됨");
      } else {
        message.error("에러 발생");
      }
    }
  };

  // Tab 2
  const onDelete = async (item) => {
    const response = await axios.delete("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/setting/accounts/", item);
    console.log("delete send data: ", item);
    console.log("delete response: ", response);
    if (response.data.success) {
      message.success("계정 삭제에 성공했습니다.");
      // 세팅 데이터 패치
      fetchSettingData();
    } else {
      message.error("에러 발생");
    }
  };

  // Tab3
  const saveInfo = async () => {
    if (settingData.userInfo.id === "" || settingData.userInfo.password === "") {
      message.error("비어있는 값을 입력하세요.");
    } else {
      // 저장 요청 보내기
      const response = await axios.put("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/setting/uesr_info/", settingData.userInfo);
      console.log("user info send data: ", settingData.userInfo);
      console.log("user info response: ", response);
      if (response.data.success) {
        message.success("저장되었습니다.");
        // 세팅 데이터 패치
        fetchSettingData();
      } else {
        message.error("에러 발생");
      }
    }
  };

  const changeInfo = (key, value) => {
    setSettingData((current) => {
      let newValue = { ...current };
      newValue.userInfo[key] = value;
      return newValue;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.setting_container}>
        <div className={styles.title}>Setting</div>
        <Tabs defaultActiveKey="1" className={styles.tabs}>
          <TabPane tab="실시간 관리 설정" key="1" className={styles.tab}>
            <div className={styles.option_container}>
              <div className={styles.option}>스팸 단어가 포함된 경우 즉시 삭제</div>
              <div>
                <Switch checked={settingData.setting.spam.status} onChange={(event) => onChangeSwitch("spam", event)} />
                {settingData.setting.spam.status ? (
                  <div>
                    <Input onChange={(event) => changeValue("spam", event.target.value)} value={settingData.setting.spam.value} placeholder="스팸 단어 입력" className={styles.input_box} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}>기간 내 읽지 않은 메일 자동 삭제</div>
              <div>
                <Switch checked={settingData.setting.time.status} onChange={(event) => onChangeSwitch("time", event)} />
                {settingData.setting.time.status ? (
                  <div className={styles.range_box}>
                    <Input
                      addonAfter={selectAfter}
                      onChange={(event) => changeValue("time", event.target.value)}
                      value={settingData.setting.time.value[0]}
                      placeholder="기간"
                      style={{ width: "18vw" }}
                    />
                    <span> 동안 읽지 않은 메일 삭제</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}> 중요 단어 포함 메일 삭제 안함</div>
              <div>
                <Switch checked={settingData.setting.word.status} onChange={(event) => onChangeSwitch("word", event)} />
                {settingData.setting.word.status ? (
                  <div>
                    <Input onChange={(event) => changeValue("word", event.target.value)} value={settingData.setting.word.value} placeholder="중요 단어 입력" className={styles.input_box} />
                  </div>
                ) : null}
              </div>
            </div>
            <Button className={styles.save_button} onClick={saveSetting}>
              저장
            </Button>
          </TabPane>
          <TabPane tab="메일 계정 관리" key="2">
            <div className={styles.scroll_list}>
              <List
                dataSource={settingData.accountsList}
                renderItem={(item) => (
                  <List.Item className={styles.list_item}>
                    {item}
                    <Button type="text" className={styles.delete_button} onClick={() => onDelete(item)}>
                      삭제
                    </Button>
                  </List.Item>
                )}
              />
            </div>
            <div className={styles.tab2_button_container}>
              <Button
                onClick={() => {
                  window.location.replace("/register");
                }}
              >
                계정 추가하기
              </Button>
            </div>
          </TabPane>
          <TabPane tab="사용자 정보" key="3">
            <div className={styles.tab3}>
              <div>
                <div className={styles.tab3_text_container}>ID</div>
                <Input size="large" onChange={(event) => changeInfo("id", event.target.value)} defaultValue={settingData.userInfo.id} prefix={<UserOutlined />} className={styles.input_box} />
              </div>
              <div>
                <div className={styles.tab3_text_container}>PW</div>
                <Input
                  size="large"
                  onChange={(event) => changeInfo("password", event.target.value)}
                  defaultValue={settingData.userInfo.password}
                  prefix={<UserOutlined />}
                  className={styles.input_box}
                />
              </div>
              <Button className={styles.save_button} onClick={saveInfo}>
                저장
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default SettingPage;
