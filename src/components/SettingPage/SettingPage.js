import React from "react";
import { Tabs, Switch, Button } from "antd";
import styles from "./SettingPage.module.css";

function SettingPage() {
  const { TabPane } = Tabs;

  const onChangeTab = (key) => {
    console.log(key);
  };

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
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
                <Switch defaultChecked onChange={onChangeSwitch} />
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}>기간 내 읽지 않은 메일 자동 삭제</div>
              <div>
                <Switch defaultChecked onChange={onChangeSwitch} />
              </div>
            </div>
            <div className={styles.option_container}>
              <div className={styles.option}> 중요 단어 포함 메일 삭제 안함</div>
              <div>
                <Switch defaultChecked onChange={onChangeSwitch} />
              </div>
            </div>
            <Button className={styles.save_button}>Save</Button>
          </TabPane>
          <TabPane tab="메일 계정 관리" key="2">
            Content of Tab Pane 2
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
