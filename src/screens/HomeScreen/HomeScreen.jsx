import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import Chatbot from "../../components/Chatbot/Chatbot";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetails } from "../../state/superSetSlice/superSetSlice";
import SelectDashboard from "../../components/SelectDashboard/SelectDashboard";
import WelcomeBar from "../../components/WelcomeBar/WelcomeBar";
import HomeInfo from "../../components/HomeInfo/HomeInfo";
import { getUserDetails } from "../../state/user/userSlice";

const HomeScreen = ({ menuClicked }) => {
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDetails());
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <div>
      <Chatbot />
      {!menuClicked && (
        <>
          <div className="home-info-container">
            <div><WelcomeBar /></div>
            <div className="homeinfo"><HomeInfo /></div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
