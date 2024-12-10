import React, { useState } from "react";
import "./TopNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import istudio from "../../assets/istudio.png";
import ibuilder from "../../assets/ibuilder.png";
import { RiArrowDownWideLine } from "react-icons/ri";

const TopNavBar = ({ children, onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleMenuClick = (url, showIframe, newTab) => {
    if (newTab) {
      window.open(url, "_blank");
    } else if (showIframe) {
      navigate("/data-modelling", { state: { iframeUrl: url } });
    } else {
      navigate(url);
    }
  };

  const menuItems = [
    {
      label: <img src={istudio} alt="iStudio" className="menu-icon istudio" />,
      url: "https://manage.app.preset.io/app/",
      newTab: true,
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={ibuilder} alt="iBuilder" className="menu-icon ibuilder" />
          <RiArrowDownWideLine  style={{ marginLeft: "10px", fontSize: "20px" }} />
        </div>
      ),
      children: [
        {
          label: "Semantic Layer",
          url: "https://cogss.cubecloud.dev/",
          newTab: true,
        },
        {
          label: "Model Builder",
          url: "http://44.204.61.35:5000",
          newTab:true
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="InceptiveBI Logo"
              className="logo-image"
              style={{ width: "150px" }}
            />
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
                  className="nav-button"
                  onClick={() =>
                    !item.children && handleMenuClick(item.url, item.showIframe, item.newTab)
                  }
                >
                  {item.label}
                </button>
                {item.children && showDropdown && (
                  <div className="dropdown">
                    {item.children.map((child, idx) => (
                      <button
                        key={idx}
                        className="dropdown-button"
                        onClick={() =>
                          handleMenuClick(child.url, child.showIframe, child.newTab)
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
        </div>
      </div>
      {children}
    </>
  );
};

export default TopNavBar;
