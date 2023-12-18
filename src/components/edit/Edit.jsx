// import { useEffect, useState, useLayoutEffect } from 'react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Form, Email, Password, Submit, Username, Image } from '../form/Form';
import { clearAuthenticationErrors, edit } from '../../redux/store/store';
import Spinner from '../a-components/spinner/spinner';

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(clearAuthenticationErrors());
  }, [dispatch]);

  const token = useSelector((state) => state.authorization.token);
  const username = useSelector((state) => state.authorization.username);
  const email = useSelector((state) => state.authorization.email);
  // const password = useSelector((state) => state.authorization.password);
  // const image = useSelector((state) => state.authorization.image);
  const loading = useSelector((state) => state.authorization.loading);
  const errors = useSelector((state) => state.authorization.errors);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setNameError(!!errors?.username);
    setEmailError(!!errors?.email);
  }, [errors]);

  const { handleSubmit, control } = useForm({ mode: 'onBlur' });

  if (loading) return <Spinner />;
  if (!username) return navigate('/');

  const onSubmit = (data) => {
    const isEmpty = (obj) => Object.keys(obj).length === 0;
    const changed = {};
    for (let item in data) {
      if (data[item]) {
        changed[item] = data[item];
      }
    }
    if (!isEmpty(changed)) {
      dispatch(
        edit({
          token,
          changed,
          cb: () => {
            navigate('/articles/');
          },
        })
      );
      // здесь нужно вызвать всплывающее окно с тем, что данные успешно изменились
    } else {
      // здесь должно всплывать окно о том, что данные не заданы
      return;
    }
  };

  return (
    <Form title="Edit Profile" onSubmit={handleSubmit(onSubmit)}>
      <Username
        control={control}
        serverError={nameError}
        onChange={() => setNameError(false)}
        required={false}
        placeholderLabel={username}
      />

      <Email
        control={control}
        serverError={emailError}
        onChange={() => setEmailError(false)}
        required={false}
        placeholderLabel={email}
      />

      <Password
        control={control}
        label="New password"
        warrning="
          Your password needs to be at least 6 and not longer then 40
          characters."
        required={false}
      />

      <Image control={control} required={false} />

      <Submit control={control} value="Save" />
    </Form>
  );
};

export default Edit;
