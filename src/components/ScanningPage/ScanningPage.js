import React, { useState } from "react";
import { Input, Radio, Space, DatePicker, Divider, Button, message, Progress, Steps } from "antd";
import { LoadingOutlined, SmileOutlined, EditOutlined, ScanOutlined } from "@ant-design/icons";
import styles from "./ScanningPage.module.css";

function ScanningPage() {
  const [mode, setMode] = useState(0); // 스캐닝 모드
  const [value, setValue] = useState(""); // 스캐닝 모드에 따른 설정값
  const [currentProgress, setCurrentProgress] = useState(0);
  const percent = 90;

  const onChange = (e) => {
    // console.log("radio checked", e.target.mode);
    setMode(e.target.value);
    setValue("");
  };

  const { RangePicker } = DatePicker;
  const { Step } = Steps;

  const startScanning = () => {
    if (mode == 0) {
      message.info("스캔 모드를 선택하세요");
    } else if (mode !== 1 && value == "") {
      message.info("값을 입력하세요");
    } else {
      setCurrentProgress(1);
      console.log({ scanningMode: mode, value: value });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scan_container}>
        <div className={styles.title}>한 번에 스캔하기</div>
        <Radio.Group onChange={onChange} value={mode} className={styles.option_container}>
          <Space direction="vertical">
            <Radio value={1}>광고 메일 삭제</Radio>
            <Radio value={2}>
              특정 기간 내 메일 삭제
              {mode === 2 ? (
                <div>
                  <RangePicker onChange={(date, dateString) => setValue(dateString)} className={styles.input_box} />
                </div>
              ) : null}
            </Radio>
            <Radio value={3}>
              특정 발신자 삭제
              {mode === 3 ? (
                <div>
                  <Input onChange={(event) => setValue(event.target.value)} placeholder="발신자 이름 입력" className={styles.input_box} />{" "}
                </div>
              ) : null}
            </Radio>
            <Radio value={4}>
              특정 문자열 포함 메일 삭제
              {mode === 4 ? (
                <div>
                  <Input onChange={(event) => setValue(event.target.value)} placeholder="삭제할 문자열 입력" className={styles.input_box} />{" "}
                </div>
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
        <Button onClick={startScanning} type="primary" shape="round" size="large" className={styles.start_button} disabled={currentProgress == 1 ? true : false}>
          Start
        </Button>
        <div className={styles.progress_container}>
          {/* <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={percent}
            width={200}
          /> */}
          <Steps current={currentProgress}>
            {/* <Step status="finish" title="Select Scanning Mode" icon={<EditOutlined />} />
            <Step status="process" title="Scan" icon={<LoadingOutlined />} />
            <Step status="wait" title="Done" icon={<SmileOutlined />} /> */}
            <Step title="Select Scanning Mode" icon={<EditOutlined />} />
            <Step title="Scan" icon={currentProgress == 1 ? <LoadingOutlined /> : <ScanOutlined />} />
            <Step title="Done" icon={<SmileOutlined />} />
          </Steps>
        </div>
      </div>
    </div>
  );
}

export default ScanningPage;
