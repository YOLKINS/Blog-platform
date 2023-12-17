import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorService } from '../errors/errors';
import { getPosts, togglePage } from '../../redux/store/store';
import Spinner from '../a-components/spinner/spinner';
import AppPagination from '../a-components/pagination/Pagination';
// import { Routes, Route } from 'react-router-dom';

import './Blog.scss';

import PostPreview from './PostPreview';

const Blog = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postsList.posts);
  const error = useSelector((state) => state.postsList.error);
  const currentPage = useSelector((state) => state.postsList.currentPage);
  const totalPosts = useSelector((state) => state.postsList.totalPosts);

  const token = useSelector((state) => state.authorization.token);

  useLayoutEffect(() => {
    dispatch(togglePage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPosts({ pageNumber: currentPage, token: token ? token : null }));
  }, [dispatch, currentPage, token]);

  if (!posts) return <Spinner />;
  if (error) return <ErrorService />;

  console.log('token:  ', token);

  return (
    <section className="blog">
      <ul className="posts">
        {posts.map((post, index) => (
          <li key={index}>
            <PostPreview data={post} />
          </li>
        ))}
      </ul>
      <AppPagination totalPosts={totalPosts} currentPage={currentPage} />
    </section>
  );
};

export default Blog;
