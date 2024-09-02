import React from "react";
// import LastLoggedIn from "../LastLoggedIn/LastLoggedIn";
import LastReportsAccessed from "../LastReport/LastReport";
import Announcements from "../Announcements/announcements";

const Dashboard = () => {
  const lastLoggedIn = new Date(); // Replace with actual date/time
  const reports = [
    { name: "Covid Vaccine Dashboard", link: "/reports/report-1" },
    { name: "Sales Dashboard", link: "/reports/report-2" },
    { name: "dashboard1", link: "/reports/report-3" },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", justifyContent:"center" }}>
      <LastReportsAccessed reports={reports} />
      <Announcements />
    </div>
  );
};

export default Dashboard;
