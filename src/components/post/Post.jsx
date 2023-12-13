import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPost } from '../../redux/store/store';
import Spinner from '../a-components/spinner/spinner';
import { ErrorService } from '../errors/errors';
import PostPreview from '../blog/PostPreview';

const Post = () => {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);
  //   const isAuthorized = useSelector((state) => state.authorization.userName);
  //   const token = useSelector((state) => state.authorization.token);

  //   const isAllowInteract = post?.author.username === isAuthorized;

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getPost({ slug, token: null }));
  }, [dispatch]);

  if (!post) return <Spinner />;

  if (error) return <ErrorService />;

  return (
    <article>
      <header>
        <PostPreview data={post} />
        {/* {isAllowInteract && <ArticleButtons />} */}
      </header>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post?.body}</ReactMarkdown>
    </article>
  );
};

export default Post;
