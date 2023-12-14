import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './Post.scss';

import { getPost } from '../../redux/store/store';
import Spinner from '../a-components/spinner/spinner';
import { ErrorService } from '../errors/errors';
import PostPreview from '../blog/PostPreview';

const Post = () => {
  const dispatch = useDispatch();
  //   const isAuthorized = useSelector((state) => state.authorization.userName);
  //   const token = useSelector((state) => state.authorization.token);

  //   const isAllowInteract = post?.author.username === isAuthorized;

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getPost({ slug, token: null }));
  }, []);

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);

  if (!post) return <Spinner />;

  console.log('post:    ', post);

  if (error) return <ErrorService />;

  return (
    <article className="post">
      <header className="info">
        <PostPreview data={post} session="open" />
        {/* {isAllowInteract && <ArticleButtons />} */}
      </header>
      <ReactMarkdown className="body" remarkPlugins={[remarkGfm]}>
        {post?.body}
      </ReactMarkdown>
    </article>
  );
};

export default Post;
