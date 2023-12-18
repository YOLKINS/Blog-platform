import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PostForm from '../form/PostForm';
import Spinner from '../a-components/spinner/spinner';
import { editPost, getPost } from '../../redux/store/store';
import { ErrorService } from '../errors/errors';

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const history = useHistory();
  const { slug } = useParams();
  const token = useSelector((state) => state.authorization.token);
  const loading = useSelector((state) => state.authorization.loading);
  const isRegister = useSelector((state) => state.authorization.username);
  console.log('.......', slug);

  useLayoutEffect(() => {
    if (slug && token) {
      dispatch(getPost({ slug, token }));
    }
  }, [dispatch, slug, token]);

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);

  if (loading) return <Spinner />;
  if (!isRegister) return navigate('/sign-in');
  if (error) return <ErrorService />;

  return (
    <PostForm
      title={post?.title}
      description={post?.description}
      body={post?.body}
      tags={post?.tagList}
      postTitle="Edit article"
      errorMessage="Something was wrong. Please, try again."
      onSubmit={(input) => {
        const changed = {};
        for (let field in input) {
          if (input[field] && input[field].length !== 0) changed[field] = input[field];
        }
        dispatch(
          editPost({
            changed,
            token,
            slug,
          })
        );
        navigate('/');
      }}
    />
  );
};

export default EditPost;
