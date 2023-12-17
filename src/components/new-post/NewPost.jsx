import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PostForm from '../form/PostForm';
import Spinner from '../a-components/spinner/spinner';
import { setPost } from '../../redux/store/store';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const history = useHistory();

  const token = useSelector((state) => state.authorization.token);
  const loading = useSelector((state) => state.authorization.loading);
  const isRegister = useSelector((state) => state.authorization.username);

  if (loading) return <Spinner />;
  if (!isRegister) return navigate('/articles/');

  return (
    <PostForm
      postTitle="Create new article"
      errorMessage="Something was wrong. Please, try again."
      onSubmit={(input) => {
        const changed = {};
        for (let field in input) {
          if (input[field] && input[field].length !== 0) changed[field] = input[field];
        }
        dispatch(
          setPost({
            token,
            changed,
          })
        );
        navigate('/');
      }}
    />
  );
};

export default NewPost;
