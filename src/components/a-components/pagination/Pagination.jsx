import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { togglePage } from '../../../redux/store/store';

const AppPagination = ({ totalPosts, currentPage }) => {
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    dispatch(togglePage(newPage));
  };

  return (
    <Pagination
      total={totalPosts}
      current={currentPage}
      pageSize={5}
      onChange={handlePageChange}
      showQuickJumper={false}
      showSizeChanger={false}
    />
  );
};

export default AppPagination;
