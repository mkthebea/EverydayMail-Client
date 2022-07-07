import React from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <>
      <h1>DetailPage</h1>
      <div>계정 이름: {query.account}</div>
    </>
  );
}

export default DetailPage;
