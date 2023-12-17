import React from 'react';
import { useController } from 'react-hook-form';

import classes from './Form.module.scss';

// eslint-disable-next-line no-unused-vars
const Input = ({ label, placeholder, fieldProps, error, warrning }) => {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        {...fieldProps}
        //   className={error ? classes.invalid : undefined}
      />
      <section>{warrning}</section>
    </>
  );
};

const Username = ({ control, serverError, onChange, required = true, placeholderLabel = 'Username' }) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'username',
    rules: {
      onChange,
      required,
      minLength: 3,
      maxLength: 20,
    },
  });

  const warrning =
    (fieldState.invalid && 'Your name needs to be at least 3 and not longer then 20 characters.') ||
    (serverError && 'This name is already taken.');

  return (
    <Input
      label="Username"
      placeholder={placeholderLabel}
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  );
};

const Email = ({ control, serverError, onChange, required = true, placeholderLabel = 'Email address' }) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'email',
    rules: { onChange, required, pattern: /\S+@\S+\.\S+/ },
  });

  const warrning =
    (fieldState.invalid && 'Entered value does not match email format.') ||
    (serverError && 'This email is already taken.');

  return (
    <Input
      label="Email address"
      placeholder={placeholderLabel}
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  );
};

const Password = ({
  control,
  warrning,
  required = true,
  label = 'Password',
  rules = {
    required,
    minLength: 6,
    maxLength: 40,
  },
}) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    rules,
    name: 'password',
  });

  return (
    <Input
      label={label}
      placeholder={label}
      fieldProps={{ ...field, type: 'password' }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && warrning}
    />
  );
};

const Image = ({ control, required = true }) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'image',
    rules: {
      required,
      // eslint-disable-next-line no-useless-escape
      pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
  });
  return (
    <Input
      label="Avatar image (url)"
      placeholder="Avatar image"
      fieldProps={{ ...field }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && 'Entered value does not match url format.'}
    />
  );
};

const Checkbox = ({ control, required = true }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name: 'checkbox',
    rules: { required },
  });

  return (
    <label className={classes.checkbox}>
      <input type="checkbox" {...field} />I agree to the processing of my personal information
    </label>
  );
};

const Submit = ({ control, value, error }) => {
  const { formState } = useController({
    control,
    defaultValue: '',
    name: 'submit',
  });
  return (
    <>
      <input type="submit" value={value} disabled={!formState.isValid} />
      {error && <section>Email or password is invalid.</section>}
    </>
  );
};
const Form = ({ title, children, footer, onSubmit }) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h2>{title}</h2>
      {children}
      <footer>{footer}</footer>
    </form>
  );
};

export { Form, Checkbox, Email, Input, Image, Password, Submit, Username };
