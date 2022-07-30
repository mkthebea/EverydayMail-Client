import React, { useState } from "react";
import { Input, DatePicker, Tabs, Switch, Button, message, Divider, List, Typography } from "antd";
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
    console.log(key);
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
      message.info("비어있는 값을 입력하세요");
    } else {
      message.info("저장됨");
    }
  };

  // Tab 2
  const accountsList = ["abcd@naver.com", "1234@daum.net", "qwer@google.com"];

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
              Save
            </Button>
          </TabPane>
          <TabPane tab="메일 계정 관리" key="2">
            <List
              header={<div>메일 계정 목록</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={accountsList}
              renderItem={(item) => (
                <List.Item>
                  {/* <Typography.Text mark>[ITEM]</Typography.Text>  */}
                  {item}
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="사용자 정보" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default SettingPage;
