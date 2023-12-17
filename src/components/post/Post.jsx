/* eslint-disable indent */
import React, { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

// eslint-disable-next-line import/order
import classes from './Post.module.scss';

import { getPost } from '../../redux/store/store';
import Spinner from '../a-components/spinner/spinner';
import { ErrorService } from '../errors/errors';

const Post = () => {
  const dispatch = useDispatch();

  const isRegister = useSelector((state) => state.authorization.username);
  const token = useSelector((state) => state.authorization.token);
  const { slug } = useParams();

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);

  const isAllowInteract = post?.author.username === isRegister;

  console.log('post:    ', post);

  useLayoutEffect(() => {
    dispatch(getPost({ slug, token: isAllowInteract ? token : null }));
    console.log('getPost');
  }, [dispatch]);

  const dateFormat = post?.createdAt ? format(new Date(post.createdAt), 'MMMM d, yyyy') : '';

  const tagListDisplay = post?.tagList
    ? post.tagList.map((tag, index) => {
        if (tag === '') return null;
        return (
          <li className={classes.tag} key={index}>
            {tag}
          </li>
        );
      })
    : '';

  if (!post) return <Spinner />;

  if (error) return <ErrorService />;

  return (
    <article className={classes.post}>
      <section className={classes.preview}>
        <Link className={classes['preview__title']} to={`/articles/${slug}`}>
          {post.title}
        </Link>
        <span className={classes.likes}>
          <HeartOutlined className={classes.heart} />
          <span className={classes['likes__count']}>{post.favoritesCount}</span>
        </span>
        <div className={classes['preview__about']}>
          <div className={classes['preview__account']}>
            <div className={classes['preview__info']}>
              <div className={classes.name}>{post.author.username}</div>
              <div className={classes.date}>{dateFormat}</div>
            </div>
            <img className={classes['preview__avatar']} src={post.author.image} alt="avatar" />
          </div>
          {isAllowInteract && (
            <div className={classes['preview__interaction']}>
              <button type="button" className={classes.delete}>
                Delete
              </button>
              <Link to={'/'} className={classes.edit}>
                <button type="button">Edit</button>
              </Link>
            </div>
          )}
        </div>
      </section>
      <ul className={classes.tags}>{tagListDisplay}</ul>
      <section className={classes['preview__description']}>{post.description}</section>
      <ReactMarkdown className={classes.body} remarkPlugins={[remarkGfm]}>
        {post?.body}
      </ReactMarkdown>
    </article>
  );
};

export default Post;
