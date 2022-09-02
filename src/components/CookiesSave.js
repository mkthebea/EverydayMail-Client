import React from "react";
import cookies from "react-cookies";

function CookiesSave() {
  const expires = new Date();

  // 년도 설정, 현재의 년도를 가져와 +10을 해서 2032가 됨
  expires.setFullYear(expires.getFullYear() + 10);
  cookies.save("cookie", "test", {
    path: "/", // 쿠키 값을 저장하는 서버 경로
    expires, // 유효 시간
    //secure: true,   // 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
    //httpOnly: true  // document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
  });
  // cookies 데이터 가져오기
  // console.log(cookies.load('usreid')); // coadingHospital

  return <div>CookiesSave</div>;
}

export default CookiesSave;
