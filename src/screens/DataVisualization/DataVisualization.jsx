import React, { useEffect, useState } from "react";
import Chatbot from "../../components/Chatbot/Chatbot";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetails } from "../../state/superSetSlice/superSetSlice";
import SelectDashboard from "../../components/SelectDashboard/SelectDashboard";

const DataVisualization = () => {
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDetails());
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div>
      <Chatbot />
      <SelectDashboard onSelected={handleSelect} />
      <Dashboard dashboardId={selected} />
    </div>
  );
};

export default DataVisualization;
