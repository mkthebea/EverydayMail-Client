import React from "react";
import { Button, Result } from "antd";
import styles from "./NotAuthorized.module.css";

//접근 권한 없음
function NotAuthorized() {
  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page. Please log in to access."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.replace("/login");
            }}
          >
            Go Login
          </Button>
        }
      />
    </div>
  );
}

export default NotAuthorized;
