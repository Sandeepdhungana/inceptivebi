import React from "react";
import { Flex, Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const SelectDashboard = ({ onSelected }) => {
  const handleChange = (value) => {
    onSelected(value);
  };

  const dashboardInfo = useSelector((state) => state.dashboardInfo);
  const { status, error, data } = dashboardInfo;
  console.log(status);

  return (
    <div style={{ margin: 5, display:'flex',alignItems:'center', gap:"20px" }}>
      <label
        htmlFor="select-dashboard"
        style={{ display: "block" }}
      >
        Select Dashboard
      </label>
      <Select
        id="select-dashboard"
        style={{ width: 200, marginTop: 5 }}
        placeholder="Select an option"
        onChange={handleChange}
        loading={status === "loading"}
      >
        {data.map((item) => (
          <Option key={item.uuid} value={item.uuid}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectDashboard;
