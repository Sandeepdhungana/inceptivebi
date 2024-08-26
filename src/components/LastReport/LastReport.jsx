import React from "react";
import { Card, List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

const LastReportsAccessed = ({ reports }) => {
  return (
    <Card
      bordered={false}
      style={{ width: 600, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
    >
      <Text style={{fontSize:"20px"}} type="secondary">Last Reports Accessed:</Text>
      <List
        size="small"
        dataSource={reports}
        renderItem={(report) => (
          <List.Item>
            <Link to={report.link} style={{ color: "#1890ff", fontSize:"28px" }}>
              {report.name}
            </Link>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LastReportsAccessed;
