import React from 'react';
// import { useLayoutEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Form, { Email, Password, Submit } from '../form/Form';
// import Spinner from '../a-components/spinner/spinner';
// import { signIn, clearAuthorizationErrors } from '../../store';

const SignIn = () => {
  //   const dispatch = useDispatch();

  //   useLayoutEffect(() => {
  //     dispatch(clearAuthorizationErrors());
  //   }, []);

  const { handleSubmit, control } = useForm({ mode: 'onBlur' });

  //   const error = useSelector((state) => state.authorization.errors);
  //   const isLoading = useSelector((state) => state.authorization.loading);
  //   const isAuthorize = useSelector((state) => state.authorization.userName);

  //   if (isLoading) return <Spinner />;
  //   if (isAuthorize) return <Redirect to="/" />;

  const onSubmit = ({ email, password }) => {
    console.log('email: ', email, 'password: ', password);
    // dispatch(signIn({ email, password }));
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

      <Submit
        control={control}
        value="Login"
        //   error={error}
      />
    </Form>
  );
};

export default SignIn;
