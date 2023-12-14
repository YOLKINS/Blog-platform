import React from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import avatarDefault from '../../images/Avatar 1.png';

import classes from './PostPreview.module.scss';

const PostPreview = ({ data }) => {
  const { slug, title, favoritesCount, author, tagList, createdAt, description } = data;
  // const {slug, favorited } = data;

  const dateFormat = format(new Date(createdAt), 'MMMM d, yyyy');

  const avatar = author.image ? author.image : avatarDefault;

  const tagListDisplay = tagList.map((tag, index) => {
    if (tag === '') return null;
    return (
      <li className={[classes.tag]} key={index}>
        {tag}
      </li>
    );
  });

  return (
    <article className={classes['post-preview']}>
      <div className={classes['post-preview__header']}>
        <Link className={classes['post-preview__title']} to={`/articles/${slug}`}>
          {title}
        </Link>
        <span className={classes.likes}>
          <HeartOutlined className={classes.heart} />
          <span className={classes['likes__count']}>{favoritesCount}</span>
        </span>
        <div className={classes['post-preview__account']}>
          <div className={classes['post-preview__info']}>
            <div className={classes.name}>{author.username}</div>
            <div className={classes.date}>{dateFormat}</div>
          </div>
          <img className={classes['post-preview__avatar']} src={avatar} alt="avatar" />
        </div>
      </div>
      <ul className={classes.tags}>{tagListDisplay}</ul>
      <section className={classes['post-preview__description']}>{description}</section>
    </article>
  );
};

export default PostPreview;
