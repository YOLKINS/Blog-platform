import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Spinner from '../a-components/spinner/spinner';
import { Form, Checkbox, Email, Input, Password, Submit, Username } from '../form/Form';
import { clearAuthenticationErrors, signUp } from '../../redux/store/store';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(clearAuthenticationErrors());
  }, [dispatch]);

  const serverErrors = useSelector((state) => state.authorization.errors);
  const loading = useSelector((state) => state.authorization.loading);
  const isRegister = useSelector((state) => state.authorization.username);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setNameError(!!serverErrors?.username);
    setEmailError(!!serverErrors?.email);
  }, [serverErrors]);

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({ mode: 'onBlur' });

  if (loading) return <Spinner />;
  if (isRegister) return navigate('/articles/');

  const onSubmit = ({ username, email, password }) => {
    console.log('username:', username, 'email:', email, 'password:', password);
    dispatch(signUp({ username, email, password }));
  };

  return (
    <Form
      title="Create new account"
      footer={[
        'Already have an account? ',
        <Link to="/sign-in" key={1}>
          Sign In.
        </Link>,
      ]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Username control={control} serverError={nameError} onChange={() => setNameError(false)} />

      <Email control={control} serverError={emailError} onChange={() => setEmailError(false)} />

      <Password
        control={control}
        warrning="
          Your password needs to be at least 6 and not longer then 40
          characters."
      />

      <Input
        label="Repeat Password"
        placeholder="Password"
        error={formErrors?.repeatPassword}
        warrning={formErrors?.repeatPassword && 'Passwords must match.'}
        fieldProps={{
          ...register('repeatPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          }),
          type: 'password',
        }}
      />

      <Checkbox control={control} />

      <Submit control={control} value="Create" />
    </Form>
  );
};

export default SignUp;
