import React, { useEffect } from "react";
import { embedDashboard } from "@preset-sdk/embedded";
import { api } from "../../service";
import "./Dashboard.css";

async function fetchGuestTokenFromBackend() {
  try {
    let response = await api.get("/guest-token");
    if (response.data.error) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Dashboard = ({ dashboardId }) => {
  const supersetDomain = "https://b46afec7.us1a.app.preset.io";

  useEffect(() => {
    embedDashboard({
      id: dashboardId || "03a182c8-5e85-4dd9-a727-eedaa98a51f7",
      supersetDomain: supersetDomain,
      mountPoint: document.getElementById("dashboard-container"),
      fetchGuestToken: async () => await fetchGuestTokenFromBackend(),
      dashboardUiConfig: {
        hideTitle: false,
        hideChartControls: false,
        filters: {
          expanded: true,
        },
      },
    });
  }, [dashboardId]);

  return <div id="dashboard-container"></div>;
};

export default Dashboard;
