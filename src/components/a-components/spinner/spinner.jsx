import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
        />
      }
    />
  );
};

export default Spinner;
