import React from 'react';

import { Button } from '@material-ui/core';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        height: '93.4vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#4051B6',
      }}
    >
      <Button
        size="large"
        variant="contained"
        style={{
          padding: '15px',
          marginTop: '350px',
          backgroundColor: '#20295F',
          color: 'white',
        }}
        href="/post/list"
      >
        등록된 거래 구경하기
      </Button>
    </div>
  );
};

export default Home;
