import { useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import { clearPostErrors } from '../../redux/store/store';

import classes from './PostForm.module.scss';

const PostForm = ({ postTitle, errorMessage, onSubmit, title, description, body, tags = [] }) => {
  const newTagField = useRef(null);

  useLayoutEffect(() => {
    dispatch(clearPostErrors());
  }, []);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.post.error);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { title, description, body, tagList: [...tags] },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'tagList',
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>{postTitle}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        placeholder={errors?.title ? 'This field is required' : 'Article title'}
        {...register('title', {
          required: true,
        })}
        className={errors?.title ? classes.invalid : undefined}
      />

      <label htmlFor="Short description">Short description</label>
      <input
        id="Short description"
        placeholder={errors?.description ? 'This field is required' : 'Short description'}
        {...register('description', {
          required: true,
        })}
        className={errors?.description ? classes.invalid : undefined}
      />

      <label htmlFor="Text">Text</label>
      <textarea
        id="Text"
        rows={6}
        placeholder={errors?.body ? 'This field is required' : 'Text'}
        {...register('body', {
          required: true,
        })}
        className={errors?.body ? classes.invalid : undefined}
      />

      <label htmlFor="tags">Tags</label>
      <ul>
        {fields.map((tag, index) => {
          return (
            <li key={tag.id}>
              <input
                placeholder={errors?.tagList ? 'This field is required' : 'Tag'}
                {...register(`tagList[${index}]`, {
                  required: true,
                })}
                className={errors?.tagList && index === fields.length - 1 ? classes.invalid : undefined}
              />
              <button type="button" className={classes.delete} onClick={() => remove(index)}>
                Delete
              </button>
              {index < fields.length - 1 ? null : (
                <button type="button" className={classes.add} onClick={() => append('')}>
                  Add tag
                </button>
              )}
            </li>
          );
        })}
        {fields.length === 0 && (
          <li>
            <input placeholder="Tag" ref={newTagField} />
            <button
              type="button"
              className={classes.add}
              onClick={() => {
                if (newTagField.current.value) append(newTagField.current.value);
                else newTagField.current.focus();
              }}
            >
              Add tag
            </button>
          </li>
        )}
      </ul>

      <input type="submit" disabled={!isValid} />
      {error && <section className={classes.warrning}>{errorMessage}</section>}
    </form>
  );
};

export default PostForm;
