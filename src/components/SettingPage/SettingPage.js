import React, { useState } from "react";
import { Input, DatePicker, Tabs, Switch, Button, message, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./SettingPage.module.css";

function SettingPage() {
  // Tab 1
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;

  const [spam, setSpam] = useState(false);
  const [time, setTime] = useState(false);
  const [word, setWord] = useState(false);

  const [value, setValue] = useState({
    spam: "",
    time: "",
    word: "",
  });

  const changeValue = (key, value) => {
    setValue((current) => {
      let newValue = { ...current };
      newValue[key] = value;
      return newValue;
    });
  };

  const onChangeTab = (key) => {
    // console.log(key);
  };

  const onChangeSwitchSpam = (checked) => {
    console.log(`Spam: switch to ${checked}`);
    setSpam(checked);
    if (!checked) changeValue("spam", "");
  };
  const onChangeSwitchTime = (checked) => {
    console.log(`Time: switch to ${checked}`);
    setTime(checked);
    if (!checked) changeValue("time", "");
  };
  const onChangeSwitchWord = (checked) => {
    console.log(`Word: switch to ${checked}`);
    setWord(checked);
    if (!checked) changeValue("word", "");
  };

  const saveSetting = () => {
    console.log(value);
    if ((spam && value["spam"] === "") || (time && value["time"] === "") || (word && value["word"] === "")) {
      message.error("비어있는 값을 입력하세요");
    } else {
      message.success("저장됨");
    }
  };

  // Tab 2
  // const accountsList = ["abcd@naver.com", "1234@daum.net", "qwer@google.com"];
  const [accountsList, setAccountsList] = useState(["abcd@naver.com", "1234@daum.net", "qwer@google.com", "1@naver.com", "2@naver.com"]);

  const onDelete = (item) => {
    // 삭제 요청 보내기!
    console.log("delete: ", item);
    const isSuccess = true; //삭제 요청 응답
    if (isSuccess) {
      message.success("계정 삭제에 성공했습니다.");
      setAccountsList(accountsList.filter((i) => i !== item));
    } else {
      message.error("에러 발생");
    }
  };

  // Tab3
  const [userInfo, setUserInfo] = useState({
    id: "test123",
    password: "pwpw",
  });

  const saveInfo = () => {
    // 저장 요청 보내기
    console.log(userInfo);
    const isSuccess = true; // 저장 요청 응답
    if (isSuccess) {
      message.success("저장되었습니다.");
    } else {
      message.error("에러 발생");
    }
  };

  const changeInfo = (key, value) => {
    setUserInfo((current) => {
      let newValue = { ...current };
      newValue[key] = value;
      return newValue;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.setting_container}>
        <div className={styles.title}>Setting</div>
        <Tabs defaultActiveKey="1" onChange={onChangeTab} className={styles.tabs}>
          <TabPane tab="실시간 관리 설정" key="1" className={styles.tab}>
            <div className={styles.option_container}>
              <div className={styles.option}>스팸 단어가 포함된 경우 즉시 삭제</div>
              <div>
                <Switch defaultChecked={false} onChange={onChangeSwitchSpam} />
                {spam ? (
                  <div>
                    <Input onChange={(event) => changeValue("spam", event.target.value)} placeholder="스팸 단어 입력" className={styles.input_box} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}>기간 내 읽지 않은 메일 자동 삭제</div>
              <div>
                <Switch defaultChecked={false} onChange={onChangeSwitchTime} />
                {time ? (
                  <div>
                    <RangePicker onChange={(date, dateString) => changeValue("time", dateString)} className={styles.input_box} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}> 중요 단어 포함 메일 삭제 안함</div>
              <div>
                <Switch defaultChecked={false} onChange={onChangeSwitchWord} />
                {word ? (
                  <div>
                    <Input onChange={(event) => changeValue("word", event.target.value)} placeholder="중요 단어 입력" className={styles.input_box} />
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
                // header={<div>메일 계정 목록</div>}
                // footer={<div>Footer</div>}
                // bordered
                dataSource={accountsList}
                renderItem={(item) => (
                  <List.Item className={styles.list_item}>
                    {/* <Typography.Text mark>[ITEM]</Typography.Text>  */}
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
                <Input size="large" onChange={(event) => changeInfo("id", event.target.value)} defaultValue={userInfo.id} prefix={<UserOutlined />} className={styles.input_box} />
              </div>
              <div>
                <div className={styles.tab3_text_container}>PW</div>
                <Input size="large" onChange={(event) => changeInfo("password", event.target.value)} defaultValue={userInfo.password} prefix={<UserOutlined />} className={styles.input_box} />
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
