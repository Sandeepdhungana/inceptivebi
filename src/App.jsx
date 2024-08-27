import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import CommonNav from "./components/CommonNav/CommonNav";
import Login from "./screens/LoginScreen/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DataVisualization from "./screens/DataVisualization/DataVisualization";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import { getUserDetails } from "./state/user/userSlice";
import { useDispatch } from "react-redux";
import DataModelling from "./screens/DataModelling/DataModelling";

const App = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const dispatch = useDispatch();
  

  const handleMenuClick = (url) => {
    setCurrentUrl(url);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <TopNavBar>
                <HomeScreen />
              </TopNavBar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <ProtectedRoute>
              <TopNavBar>
                <DataVisualization />
              </TopNavBar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/data-modelling"
          element={
            <ProtectedRoute>
              <TopNavBar onMenuClick={handleMenuClick}>
                <DataModelling />
              </TopNavBar>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
