import React, { useState } from 'react';
//import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import BlogPlatformService from '../../../redux/service/blogPlatformService';

import classes from './Like.module.scss';

const Like = (data) => {
  const token = useSelector((state) => state.authorization.token);

  const [count, setFavoritesCount] = useState(data.favoritesCount);
  const [method, setFavorited] = useState(data.favorited);
  const slug = data.slug;
  //   let method = data.favorited;
  //   let count = data.favoritesCount;

  //   console.log('count:  ', count, 'data:  ', data);

  const onToggleLike = async () => {
    try {
      const response = await BlogPlatformService.favoritePost({ slug, token, method });
      if (response.ok) {
        setFavoritesCount(count + (method ? -1 : 1));
        setFavorited(!method);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //   const onToggleLike = async () => {
  //     try {
  //       const response = await BlogPlatformService.favoritePost({ slug, token, method });
  //       const dataLike = await response.json();
  //       if (response.ok) {
  //         console.log(dataLike.article.favorited);
  //         console.log(dataLike.article.favoritesCount);
  //         method = dataLike.article.favorited;
  //         count = dataLike.article.favoritesCount;
  //       }
  //       return;
  //     } catch (error) {
  //       console.log(error);
  //       return;
  //     }
  //   };

  //   return (
  //     <>
  //       <HeartOutlined onClick={onToggleLike} className={classes[!method ? 'heart' : 'heart__active']} />
  //       <span>{count}</span>
  //     </>
  //   );
  return (
    <>
      <HeartOutlined onClick={onToggleLike} className={classes[!method ? 'heart' : 'heart__active']} />
      <span>{count}</span>
    </>
  );
};

export default Like;
