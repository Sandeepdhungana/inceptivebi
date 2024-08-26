import React, { useState } from "react";
import "./TopNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const TopNavBar = ({ children, onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [environment, setEnvironment] = useState("prod"); // Default environment
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleMenuClick = (url, showIframe) => {
    if (showIframe) {
      // If showIframe is true, navigate to the data-modelling route
      navigate("/data-modelling", { state: { iframeUrl: url, environment } });
    } else {
      // Otherwise, navigate to the provided URL
      navigate(url);
    }
  };

  const handleEnvironmentChange = (value) => {
    setEnvironment(value);
  };

  const menuItems = [
    {
      label: "Data Visualization",
      url: "/data-visualization",
      showIframe: false,
    },
    {
      label: "Data Modeling",
      children: [
        {
          label: "iBuilder Engine",
          url: "https://cloud.cube.dev",
          showIframe: true,
        },
        {
          label: "iBuilder Model Management",
          url: "http://44.204.61.35:5000",
          showIframe: true,
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            {"InceptiveBI"}
          </Link>
        </div>
        <div className="left-menu">
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onMouseEnter={item.children ? handleMouseEnter : null}
                onMouseLeave={item.children ? handleMouseLeave : null}
              >
                <button
                  onClick={() =>
                    !item.children && handleMenuClick(item.url, item.showIframe)
                  }
                >
                  {item.label}
                </button>
                {item.children && showDropdown && (
                  <div className="dropdown">
                    {item.children.map((child, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleMenuClick(child.url, child.showIframe)
                        }
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="environment-select">
            <Select
              placeholder="Select Environment"
              style={{ width: 120 }}
              onChange={handleEnvironmentChange}
            >
              <Option value="prod">Prod</Option>
              <Option value="non-prod">Non-Prod</Option>
            </Select>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default TopNavBar;
