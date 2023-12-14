import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorService } from '../errors/errors';
import { getPosts } from '../../redux/store/store';
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

  //const totalPages = Math.ceil(totalPosts / 5);

  // useLayoutEffect(() => {
  //   dispatch(togglePage(1));
  // }, []);

  useEffect(() => {
    dispatch(getPosts({ pageNumber: currentPage, token: null }));
  }, [dispatch, currentPage]);

  if (!posts) return <Spinner />;
  if (error) return <ErrorService />;

  // useEffect(() => {
  //   dispatch(togglePage(1));
  // }, []);

  console.log('currentPage:  ', currentPage);

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
