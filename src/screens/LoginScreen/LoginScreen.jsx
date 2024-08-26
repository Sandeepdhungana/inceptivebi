import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';

const { Title } = Typography;

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <Card
        style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        bodyStyle={{ padding: '20px' }}
      >
        {isLogin ? <Login /> : <SignUp />}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button type="link" onClick={toggleForm}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
