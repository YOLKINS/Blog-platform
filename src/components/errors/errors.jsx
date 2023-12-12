import React from 'react';
import { Alert } from 'antd';

export const ErrorService = () => {
  return <Alert message="Error" description="Something was wrong" type="error" showIcon />;
};
