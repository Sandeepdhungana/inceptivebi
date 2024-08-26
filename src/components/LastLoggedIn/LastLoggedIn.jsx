import React from "react";
import { Card, Typography } from "antd";
import moment from "moment";

const { Text } = Typography;

const LastLoggedIn = ({ lastLoggedIn }) => {
  return (
    <Card
      bordered={false}
      style={{
        width: 600,
        height: 500,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Text style={{ fontSize: "20px" }} type="secondary">
        Last Logged In:
      </Text>
      <br />
      <Text strong style={{ fontSize: "28px" }}>
        {moment(lastLoggedIn).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
    </Card>
  );
};

export default LastLoggedIn;
