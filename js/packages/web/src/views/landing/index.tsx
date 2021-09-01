import { Layout, Button } from 'antd';
import React from 'react';
import { PreSaleBanner } from '../../components/PreSaleBanner';
import { Link } from 'react-router-dom';

export const LandingView = () => {
  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <h1 style={{ fontSize: '72px', textAlign: 'center' }}>
        Make your personal ChibiChans
      </h1>
      <img style={{ marginBottom: 50 }} src="/ImageFiles/bg.jpg" alt="BG Chibichans" width="500" height="600"></img>
      <Link to={`/generate`}>
        <Button type="primary" className="app-btn">Generate mine!</Button>
      </Link>
    </Layout>
  );
};
