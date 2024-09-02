import React from "react";
import { Card, List, Typography } from "antd";
import { Link } from "react-router-dom";
import VirusIcon from "../../assets/LastReports/covidvaccine.svg";
import DashboardIcon from "../../assets/LastReports/dashboard.svg";
import ReportSalesIcon from "../../assets/LastReports/reportsales.svg";
import "./LastReportsAccessed.css";

const { Text } = Typography;

const LastReportsAccessed = ({ reports }) => {
  const getIcon = (name) => {
    if (name.toLowerCase().includes('covid')) return <img src={VirusIcon} alt="covid" className="report-icon" />;
    if (name.toLowerCase().includes('sales')) return <img src={ReportSalesIcon} alt="sales" className="report-icon" />;
    return <img src={DashboardIcon} alt="dashboard" className="report-icon" />;
  };

  return (
    <Card
      bordered={false}
      className="report-card"
    >
      <Text className="report-title" type="secondary">Last Reports Accessed:</Text>
      <List
        size="small"
        dataSource={reports}
        renderItem={(report) => (
          <List.Item className="report-item">
            {getIcon(report.name)}
            <Link to={report.link} className="report-link">
              {report.name}
            </Link>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LastReportsAccessed;
