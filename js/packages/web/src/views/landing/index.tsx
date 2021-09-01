import { Layout, Button } from 'antd';
import React from 'react';
import { PreSaleBanner } from '../../components/PreSaleBanner';
import { Link } from 'react-router-dom';

export const LandingView = () => {
  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <PreSaleBanner/>
      <Link to={`/generate`}>
        <Button className="app-btn">Mint a Customized Chibi</Button>
      </Link>
      <Link to={`/pet/create/`}>
        <Button className="app-btn">Get a Pet for your Chibi</Button>
      </Link>
    </Layout>
  );
};
