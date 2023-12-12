import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import './Post.scss';

const Post = ({ data }) => {
  const { title, favoritesCount, author, tagList, createdAt, description } = data;
  // const {slug, favorited } = data;

  const dateFormat = format(new Date(createdAt), 'MMMM d, yyyy');

  const tagListDisplay = tagList.map((tag, i) => {
    if (tag === '') return null;
    return (
      <li className="tag" key={i}>
        {tag}
      </li>
    );
  });

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__title">{title}</div>
        <span className="likes">
          <HeartOutlined className="heart" />
          <span className="likes__count">{favoritesCount}</span>
        </span>
        <div className="post__account">
          <div className="post__info">
            <div className="name">{author.username}</div>
            <div className="date">{dateFormat}</div>
          </div>
          <img className="post__avatar" src={author.image} alt="avatar" />
        </div>
      </div>
      <ul className="tags">{tagListDisplay}</ul>
      <section className="post__description">{description}</section>
    </article>
  );
};

export default Post;
