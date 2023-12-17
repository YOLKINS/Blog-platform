import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Form, Email, Password, Submit } from '../form/Form';
import Spinner from '../a-components/spinner/spinner';
import { signIn, clearAuthenticationErrors } from '../../redux/store/store';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(clearAuthenticationErrors());
  }, [dispatch]);

  const { handleSubmit, control } = useForm({ mode: 'onBlur' });

  const errors = useSelector((state) => state.authorization.errors);
  const loading = useSelector((state) => state.authorization.loading);
  const authorization = useSelector((state) => state.authorization.username);

  if (loading) return <Spinner />;
  if (authorization) return navigate('/articles/');

  const onSubmit = ({ email, password }) => {
    console.log('email: ', email, 'password: ', password);
    dispatch(signIn({ email, password }));
  };

  return (
    <Form
      title="Sign in"
      footer={[
        'Don’t have an account? ',
        <Link to="/sign-up" key={2}>
          Sign Up.
        </Link>,
      ]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Email control={control} />

      <Password control={control} warrning="Password required." rules={{ required: true }} />

      <Submit control={control} value="Login" error={errors} />
    </Form>
  );
};

export default SignIn;
