import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Input, Tabs, Switch, Button, message, List, Select, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./SettingPage.module.css";
import axios from "axios";

function SettingPage() {
  const { Option } = Select;

  // 세팅 데이터 GET
  const [settingData, setSettingData] = useState({
    spam: {
      status: 1,
      value: "",
    },
    time: {
      status: 1,
      numValue: 0,
      unitValue: "",
    },
    word: {
      status: 1,
      value: "",
    },
  });
  const fetchSettingData = async () => {
    const response = await axios.get("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/myinfo/setting/");
    // console.log("setting response: ", response);
    setSettingData(response.data);
  };
  const [accountsList, setAccountsList] = useState([]);
  const fetchAccountsList = async () => {
    const response = await axios.get("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/account/accounts/");
    setAccountsList(response.data.accountsList);
  };
  useEffect(() => {
    fetchSettingData();
    fetchAccountsList();
  }, []);

  const { TabPane } = Tabs;

  // Tab 1
  const selectAfter = (
    <Select
      value={settingData.time.unitValue}
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
        newValue.time.numValue = value;
        return newValue;
      });
    } else if (key === "time_select") {
      setSettingData((current) => {
        let newValue = { ...current };
        newValue.time.unitValue = value;
        return newValue;
      });
    } else {
      setSettingData((current) => {
        let newValue = { ...current };
        newValue[key].value = value;
        return newValue;
      });
    }
  };

  const onChangeSwitch = (key, checked) => {
    // console.log(key, checked);
    setSettingData((current) => {
      let newValue = { ...current };
      newValue[key].status = checked;
      return newValue;
    });
    if (!checked) changeValue(key, "");
  };

  const saveSetting = async () => {
    if (
      (settingData.spam.status && settingData.spam.value === "") ||
      (settingData.time.status && (settingData.time.numValue === 0 || settingData.time.unitValue === "")) ||
      (settingData.word.status && settingData.word.value === "")
    ) {
      message.error("비어있는 값을 입력하세요");
    } else {
      console.log("setting send data: ", settingData);

      // 설정 변경 요청 POST
      const response = await axios.post("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/myinfo/setting/", settingData);
      // console.log("setting send data: ", settingData);
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
    const response = await axios.post("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/account/delete/", { email: item });
    // console.log("delete send data: ", item);
    // console.log("delete response: ", response);
    if (response.data.success) {
      message.success("계정 삭제에 성공했습니다.");
      // 계정 리스트 패치
      fetchAccountsList();
    } else {
      message.error(response.data.errorMessage);
    }
  };

  // Tab3
  const [password, setPassword] = useState({ currentPassword: "", newPassword: "" });
  const saveInfo = async () => {
    if (password.currentPassword === "" || password.newPassword === "") {
      message.error("비어있는 값을 입력하세요.");
    } else {
      // 저장 요청 보내기
      const response = await axios.post("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/myinfo/changepw/", password);
      // console.log("change password send data: ", password);
      // console.log("change password response: ", response);
      if (response.data.success) {
        message.success("저장되었습니다.");
        // 세팅 데이터 패치
        fetchSettingData();
      } else {
        message.error(response.data.errorMessage);
      }
    }
  };

  const changeInfo = (key, value) => {
    setPassword((current) => {
      let newValue = { ...current };
      newValue[key] = value;
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
                <Switch checked={settingData.spam.status} onChange={(event) => onChangeSwitch("spam", event)} />
                {settingData.spam.status ? (
                  <div>
                    <Input onChange={(event) => changeValue("spam", event.target.value)} value={settingData.spam.value} placeholder="스팸 단어 입력" className={styles.input_box} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}>기간 내 읽지 않은 메일 자동 삭제</div>
              <div>
                <Switch checked={settingData.time.status} onChange={(event) => onChangeSwitch("time", event)} />
                {settingData.time.status ? (
                  <div className={styles.range_box}>
                    <InputNumber addonAfter={selectAfter} onChange={(event) => changeValue("time", event)} value={settingData.time.numValue} placeholder="기간" style={{ width: "18vw" }} />
                    <span> 동안 읽지 않은 메일 삭제</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}> 중요 단어 포함 메일 삭제 안함</div>
              <div>
                <Switch checked={settingData.word.status} onChange={(event) => onChangeSwitch("word", event)} />
                {settingData.word.status ? (
                  <div>
                    <Input onChange={(event) => changeValue("word", event.target.value)} value={settingData.word.value} placeholder="중요 단어 입력" className={styles.input_box} />
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
                dataSource={accountsList}
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
          <TabPane tab="비밀번호 변경" key="3">
            <div className={styles.tab3}>
              <div>
                <div className={styles.tab3_text_container}>현재 PW</div>
                <Input size="large" onChange={(event) => changeInfo("currentPassword", event.target.value)} prefix={<UserOutlined />} className={styles.input_box} />
              </div>
              <div>
                <div className={styles.tab3_text_container}>새 PW</div>
                <Input size="large" onChange={(event) => changeInfo("newPassword", event.target.value)} prefix={<UserOutlined />} className={styles.input_box} />
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
