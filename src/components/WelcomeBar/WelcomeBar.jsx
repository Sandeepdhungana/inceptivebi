import React from "react";
import { Layout, Typography } from "antd";
import "./WelcomeBar.css";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Title } = Typography;

const WelcomeBar = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const { status, name, error } = userInfo;
  return (
    <div className="welcome-bar">
      {status === "succeeded" && (
        <Title level={1} style={{ color: "#0056B3", margin: 0, fontSize:'100px' }}>
          Welcome, {name}!
        </Title>
      )}
    </div>
  );
};

export default WelcomeBar;
